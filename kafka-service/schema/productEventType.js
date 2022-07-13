const avro = require('avsc');

const eventType = avro.Type.forSchema({
  type: 'record',
  fields: [
    {
      name: 'name',
      type: 'string',
    },
    {
      name: 'description',
      type: 'string',
    },
    {
      name: 'price',
      type: 'string',
    },
  ],
});

module.exports = eventType;
