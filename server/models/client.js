var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ClientSchema = new Schema(
  {
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    instructor: {type: Schema.Types.ObjectId, ref: 'Instructor', required: true},
    fitness_plan: {type: Schema.Types.ObjectId, ref: 'FitnessPlan', required: true},
  }
);

// Virtual for book's URL
ClientSchema
.virtual('url')
.get(function () {
  return '/gym/client/' + this._id;
});

//Export model
module.exports = mongoose.model('Client', ClientSchema);