require('mootools');
var AV = require('leanengine');

var APP_ID = process.env.LC_APP_ID;
var APP_KEY = process.env.LC_APP_KEY;
var MASTER_KEY = process.env.LC_APP_MASTER_KEY;

AV.initialize(APP_ID, APP_KEY, MASTER_KEY);

// define Field
var Field = function(type, options) {
  this.$type = type;
  options = options || {};
  options.struct = options.struct || function(val) {return val;};
  var field = function(options) {
    this.$name = options.name;
  }.extend(this).implement(options);

  return field;
};

var StringField = new Field('str');
var IntField = new Field('int');
var NumberField = new Field('number');
var JSONField = new Field('json');

var FieldMap = {
  str: StringField,
  'int': IntField,
  number: NumberField,
  json: JSONField
};

/*
 * define schema
 * @name: the schema name
 * @options: the schema options
 *    @fields: type list
 *
 * eg:
 *    var Post = new Schema('Post', {
 *        fields: [
 *          {name: 'title', type: 'str'},
 *        ]
 *    });
 */

var Schema = function(name, options) {

  this.$table = name;
  this.$fields = {};

  var fields = options.fields || [];
  delete options.fields;

  newSchema = function(obj) {
    this.shadowObj = null;
    if (obj instanceof AV.Object) {
      obj.fetchWhenSave(true);
      this.shadowObj = obj;
    } else {
      this.shadowObj = AV.Object.new(newSchema.$table);
      if (obj) {
        for (var attr in obj) {
          var field = newSchema.$fields[attr];
          if (field) {
            this.shadowObj.set(attr, field.struct(obj[attr]));
          }
        }
      }
    }
  }.extend(this).implement(options);

  var self = this;
  fields.each(function(field) {
    self.initField(newSchema, field);
  })

  newSchema.prototype.save = function(callback) {
    var self = this;
    this.shadowObj.save(null, {
      success: function() {
        callback(null, self);
      },
      error: function(obj, err) {
        callback(err, obj);
      }
    });
  };

  newSchema.prototype.__defineGetter__('id', function() {
    return this.shadowObj.id;
  });

  newSchema.prototype.__defineGetter__('createdAt', function() {
    return this.shadowObj.createdAt;
  });

  newSchema.prototype.__defineGetter__('updatedAt', function() {
    return this.shadowObj.updatedAt;
  });

  newSchema.findById = function(id, callback) {
    var query = new AV.Query(AV.Object.extend(newSchema.$table));
    query.get(id, {
      success: function(obj) {
        callback(null, new newSchema(obj));
      },
      error: function(obj, err) {
        callback(err, obj);
      }
    });
  };

  newSchema.prototype.destory = function(callback) {
    this.shadowObj.destory({
      success: function() {
        callback(null);
      },
      error: function(obj, err) {
        callback(err, obj);
      }
    });
  };

  newSchema.prototype.unset = function(filed) {
    this.shadowObj.unset(field);
  };

  return newSchema;
}

Schema.prototype.initField = function(schema, field) {
  var fieldObj = FieldMap[field.type] || CommonField;
  this.$fields[field.name] = new fieldObj(field);
  schema.prototype.__defineGetter__(field.name, function() {
    return this.shadowObj.get(field.name);
  });

  schema.prototype.__defineSetter__(field.name, function(value) {
    this.shadowObj.set(field.name, schema.$fields[field.name].struct(value));
  });
};

var Condition = function(name, options) {
  this.$name = name;
  var newCondition = function(key, val) {
    this.key = key;
    this.value = value;
  }.extend(this).implement(options);

  newCondition.prototype.toCQL = function() {
    var cql = [];

    if (this.key.toCQL) {
      cql.push(this.key.toCQL());
    } else {
      cql.push(this.key);
    }

    cql.push(newCondition.$name);

    if (this.value) {
      cql.push('?')
    }
    return cql.join(' ');
  };

  newCondition.prototype.getArgs = function() {
    var args = [];
    if (this.key.getArgs) {
      args = args.concat(this.key.getArgs());
    }
    if (this.value) {
      if (this.value.getArgs) {
        args = args.concat(this.value.getArgs());
      } else {
        args.push(this.value);
      }
    }

    return args;
  }
  return newCondition;
};

var Equal = new Condition('=');
var GreaterThan = new Condition('>');
var LesserThan = new Condition('<');
var GreaterEqualThan = new Condition('>=');
var LesserEqualThan = new Condition('<=');
var NotEqual = new Condition('!=');
var And = new Condition('and');
var Or = new Condition('or');

var Limit = new Condition('limit');
Limit.prototype.toCQL = function() {
  var cql = Limit.$name + ' ?';

  if (this.value) {
    cql = cql + ',?'
  }
  return cql;
};

Limit.prototype.getArgs = function() {
  var args = [this.key]
  if (this.value) {
    args.push(this.value);
  }
  return args;
};

var OrderBy = new Condition('order by');
OrderBy.prototype.toCQL = function() {
  return [OrderBy.$name, this.key, this.value].join(' ');
};

OrderBy.prototype.getArgs = function() {
  return [];
};

var Select = function(schema, isCount) {
  this.$schema = schema;
  this.$condition = null;
  this.$limit = null;
  this.$orderBy = null;
  this.isCount = isCount || false;
};

Select.prototype.where = function(condition) {
  this.$condition = condition;
};

Select.prototype.limit = function(skip, limit) {
  this.$limit = new Limit(skip, limit);
};

Select.prototype.orderBy = function(field, asc) {
  asc = asc || 'asc';
  this.$limit = new orderBy(field, asc);
};

Select.prototype.execute = function(callback) {
  var cql = [];
  if (this.isCount) {
    cql = ['select', 'count(*)', 'from', this.$schema.$table];
  } else {
    cql = ['select', '*', 'from', this.$schema.$table];
  }
  var args = [];
  if (this.$condition) {
    cql.push(this.$condition.toCQL());
    args = args.concat(this.$condition.getArgs());
  }
  if (this.$orderBy) {
    cql.push(this.$orderBy.toCQL());
    args = args.concat(this.$orderBy.getArgs());
  }
  if (this.$limit) {
    cql.push(this.$limit.toCQL());
    args = args.concat(this.$limit.getArgs());
  }
  var self = this;
  AV.Query.doCloudQuery(cql.join(' '), args, {
    success: function(result) {
      if (self.isCount) {
        return callback(null, result);
      }
      var results = result.results.map(function(obj) {
        return new self.$schema(obj);
      });
      callback(null, results);
    },
    error: function(obj, err) {
      callback(err, obj);
    }
  });
};

var Q = {
  select: function(schema) {
    return new Select(schema);
  },
  count: function(schema) {
    return new Select(schema, true);
  },
  and: function(cond1, cond2) {
    return new And(cond1, cond2);
  },
  eq: function(key, value) {
    return new Equal(key, value);
  },
  gt: function(key, value) {
    return new GreaterThan(key, value);
  },
  lt: function(key, value) {
    return new LesserThan(key, value);
  },
  gte: function(key, value) {
    return new GreaterEqualThan(key, value);
  },
  lte: function(key, value) {
    return new LesserEqualThan(key, value);
  }
};

module.exports = {
  Schema: Schema,
  Q: Q
};
