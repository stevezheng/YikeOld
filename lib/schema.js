require('mootools');

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
  newSchema = function(attrs) {
    this.attrs = {};
    for (var attr in attrs) {
      var field = schema.$fields[attr];
      if (field) {
        this.attrs[attr] = field.struct(attrs[attr]);
      }
    }
    this.prevAttrs = {};
  }.extend(this).implement(options);

  var self = this;
  options.fields.each(function(field) {
    self.initField(newSchema, field);
  })

  return newSchema;
}

Schema.prototype.initField = function(schema, field) {
  var fieldObj = FieldMap[field.type] || CommonField;
  this.$fields[field.name] = new fieldObj(field);
  schema.prototype.__defineGetter__(field.name, function() {
    return this.attrs[field.name];
  });

  schema.prototype.__defineSetter__(field.name, function(value) {
    this.attrs[field.name] = schema.$fields[field.name].struct(value);
  });
};

module.exports = Schema;
