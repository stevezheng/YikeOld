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

module.exports = Schema;
