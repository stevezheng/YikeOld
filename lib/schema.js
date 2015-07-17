'use strict';
var AV = require('leanengine');
var async = require('async');

var APP_ID = process.env.LC_APP_ID;
var APP_KEY = process.env.LC_APP_KEY;
var MASTER_KEY = process.env.LC_APP_MASTER_KEY;

AV.initialize(APP_ID, APP_KEY, MASTER_KEY);

// Copy from mootools

var hasOwnProperty = Object.prototype.hasOwnProperty;

/*<ltIE8>*/
var enumerables = true;
for (var i in {toString: 1}) enumerables = null;
if (enumerables) enumerables = ['hasOwnProperty', 'valueOf', 'isPrototypeOf', 'propertyIsEnumerable', 'toLocaleString', 'toString', 'constructor'];
function forEachObjectEnumberableKey(object, fn, bind) {
	if (enumerables) for (var i = enumerables.length; i--;){
		var k = enumerables[i];
		// signature has key-value, so overloadSetter can directly pass the
		// method function, without swapping arguments.
		if (hasOwnProperty.call(object, k)) fn.call(bind, k, object[k]);
	}
}
/*</ltIE8>*/

// Function overloading

Function.prototype.overloadSetter = function(usePlural){
	var self = this;
	return function(a, b){
		if (a == null) return this;
		if (usePlural || typeof a != 'string'){
			for (var k in a) self.call(this, k, a[k]);
			/*<ltIE8>*/
			forEachObjectEnumberableKey(a, self, this);
			/*</ltIE8>*/
		} else {
			self.call(this, a, b);
		}
		return this;
	};
};

Function.prototype.overloadGetter = function(usePlural){
	var self = this;
	return function(a){
		var args, result;
		if (typeof a != 'string') args = a;
		else if (arguments.length > 1) args = arguments;
		else if (usePlural) args = [a];
		if (args){
			result = {};
			for (var i = 0; i < args.length; i++) result[args[i]] = self.call(this, args[i]);
		} else {
			result = self.call(this, a);
		}
		return result;
	};
};

Function.prototype.extend = function(key, value){
	this[key] = value;
}.overloadSetter();

Function.prototype.implement = function(key, value){
	this.prototype[key] = value;
}.overloadSetter();


// define Field
var Field = function(type, options) {
  this.$type = type;
  options = options || {};
  options.struct = options.struct || function(val) {return val;};
  var field = function(options) {
    this.$name = options.name;
    this.$unique = options.unique || false;
    this.$index = options.index || false;
  }.extend(this).implement(options);

  return field;
};

var StringField = new Field('str', {
  struct: function(val) {
    if (typeof val === 'string') {
      return val;
    }
    try {
      return JSON.stringify(val);
    } catch (e) {
      return val.toString();
    }
  }
});
var IntField = new Field('int', {
  struct: function(val) {
    return Math.floor(Number(val)) || 0;
  }
});
var NumberField = new Field('number', {
  struct: function(val) {
    return Number(val) || 0;
  }
});
var JSONField = new Field('json', {
  struct: function(val) {
    if (val.toJSON) {
      return val.toJSON();
    }
    if (typeof val === 'string') {
      try {
        return JSON.parse(val);
      } catch (e) {
        return '{}';
      }
    }
    return val;
  }
});
var CommonField = new Field('common');

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
  this.$uniques = [];

  var fields = options.fields || [];
  delete options.fields;

  var newSchema = function(obj) {
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

  this.$newSchema = newSchema;

  var self = this;
  fields.forEach(function(field) {
    self.initField(field);
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

  newSchema.prototype.unset = function(filedName) {
    this.shadowObj.unset(fieldName);
  };

  return newSchema;
}

Schema.prototype.initField = function(field) {
  var fieldObj = FieldMap[field.type] || CommonField;
  this.$fields[field.name] = new fieldObj(field);
  this.$newSchema.prototype.__defineGetter__(field.name, function() {
    return this.shadowObj.get(field.name);
  });

  var self = this;
  this.$newSchema.prototype.__defineSetter__(field.name, function(value) {
    this.shadowObj.set(field.name, self.$fields[field.name].struct(value));
  });

  if (field.unique || field.index) {
    if (field.unique) {
      this.$uniques.push(field.name);
    }
    var fieldName = field.name.replace(/^[a-z]|[_-][a-z]/g, function(m){
      return m.toUpperCase();
    }).replace(/[-_]/g, '');
    this.$newSchema['findBy' + fieldName] = function(value, callback) {
      if (field.unique) {
        self.findByUniqueKey(field.name, value, callback);
      } else {
        self.findByIndexKey(field.name, value, callback);
      }
    };
  }
};

Schema.prototype.findById = function(id, callback) {
  var query = new AV.Query(this.$table);
  var newSchema = this.$newSchema;
  query.get(id, {
    success: function(obj) {
      callback(null, new newSchema(obj));
    },
    error: function(obj, err) {
      callback(err, obj);
    }
  });
};

Schema.prototype.findByIds = function(ids, callback) {
  var objs = [];
  var newSchema = this.$newSchema;
  async.each(ids, function(id, done) {
    newSchema.findById(id, function(err, obj) {
      if (!err && obj) {
        objs.push(obj);
      }
      done();
    });
  }, function() {
    callback(null, objs);
  });
};

Schema.prototype.findByUniqueKey = function(key, value, callback) {
  var f = Q.eq(key, value);
  Q.select(this.$newSchema)
    .where(f)
    .execute(function(err, result) {
      if (err) {
        return callback(err);
      }
      if (!result || result.length === 0) {
        return callback('not exists');
      }
      callback(null, result[0]);
    });
};

Schema.prototype.findByIndexKey = function(key, value, callback) {
  var f = Q.eq(key, value);
  Q.select(this.$newSchema)
    .where(f)
    .execute(callback);
};

Schema.prototype.find = function(conditions, options, callback) {
  if (typeof conditions === 'function') {
    callback = conditions;
    conditions = {};
    options = {};
  }

  if (typeof options === 'function') {
    callback = options;
    options = {};
  }

  var limit = options.limit;
  var skip = options.skip || 0;
  var orderBy = options.orderBy;
  var count = options.count || false;
  var q;

  if (count) {
    q = Q.count(this.$newSchema);
  } else {
    q = Q.select(this.$newSchema);
  }

  q.where(conditions);

  if (limit) {
    q.limit(skip, limit);
  }
  if (orderBy) {
    q.orderBy(orderBy[0], orderBy[1] || 'asc');
  }
  q.execute(callback);
};

Schema.prototype.count = function(conditions, callback) {
  if (typeof conditions === 'function') {
    callback = conditions;
    conditions = {};
  }
  this.find(conditions, {count: true}, callback);
};

var Condition = function(name, options) {
  this.$name = name;
  var newCondition = function(key, value) {
    this.key = key;
    this.value = value;
  }.extend(this).implement(options);

  newCondition.prototype.toCQL = function() {
    var cql = [];

    if (this.key.toCQL) {
      var keyCQL = this.key.toCQL();
      if (/or|and/.exec(keyCQL)) {
        keyCQL = '(' + keyCQL + ')';
      }
      cql.push(keyCQL);
    } else {
      cql.push(this.key);
    }

    cql.push(newCondition.$name);

    if (this.value) {
      if (this.value.toCQL) {
        var valueCQL = this.value.toCQL();
        if (/or|and/.exec(valueCQL)) {
          valueCQL = '(' + valueCQL + ')';
        }
        cql.push(valueCQL);
      } else {
        cql.push('?');
      }
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
var LessThan = new Condition('<');
var GreaterEqualThan = new Condition('>=');
var LessEqualThan = new Condition('<=');
var NotEqual = new Condition('!=');
var And = new Condition('and');
var Or = new Condition('or');

var In = new Condition('in');
In.prototype.toCQL = function() {
  var cql = [this.key, In.$name, '('];
  cql.push(this.value.map(function(v) {
    return '?';
  }).join(','));
  cql.push(')');
  return cql.join(' ');
};

In.prototype.getArgs = function() {
  return this.value;
};

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
  if (condition.toCQL) {
    this.$condition = condition;
  } else {
    var f = null;

    var parseQuery = function($andOr, key, value) {
      var op = 'eq';
      var m = /^\$(eq|lt|gt|lte|gte|not|in)[_ ]/.exec(key);
      if (m) {
        op = m[1];
        key = key.substr(op.length + 2);
      } else {
        m = /[_ ]\$(eq|lt|gt|lte|gte|not|in)$/.exec(key);
        if (m) {
          op = m[1];
          key = key.substr(0, key.length - (op.length + 2));
        }
      }
      f = Q[$andOr.substr(1)](f, Q[op](key, conditions[key]));
    };

    for (var key in conditions) {
      if (key === '$or' || key === '$and') {
        for (var k1 in conditions[key]) {
          parseQuery(key, k1, conditions[key][k1]);
        }
      } else {
        parseQuery('$and', key, conditions[key]);
      }
    }
    this.$condition = f;
  }
  return this;
};

Select.prototype.limit = function(skip, limit) {
  this.$limit = new Limit(skip, limit);
  return this;
};

Select.prototype.orderBy = function(field, asc) {
  asc = asc || 'asc';
  this.$orderBy = new orderBy(field, asc);
  return this;
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
    cql.push('where')
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
        return callback(null, result.count);
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
    if (cond2&&cond2) {
      return new And(cond1, cond2);
    }
    if (cond2) {
      return cond2;
    }
    return cond1;
  },
  or: function(cond1, cond2) {
    if (cond2&&cond2) {
      return new Or(cond1, cond2);
    }
    if (cond2) {
      return cond2;
    }
    return cond1;
  },
  in: function(key, value) {
    if (!Array.isArray(value)) {
      value = [value]
    }
    return new In(key, value);
  },
  eq: function(key, value) {
    return new Equal(key, value);
  },
  not: function(key, value) {
    return new NotEqual(key, value);
  },
  gt: function(key, value) {
    return new GreaterThan(key, value);
  },
  lt: function(key, value) {
    return new LessThan(key, value);
  },
  gte: function(key, value) {
    return new GreaterEqualThan(key, value);
  },
  lte: function(key, value) {
    return new LessEqualThan(key, value);
  }
};

module.exports = Schema;

module.exports.Q = Q;
