var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var FitnessSchema = new Schema(
    {
            title: {type: String, required: true},
            description: {type: String, required: true},
    }
);

FitnessSchema
.virtual('url')
.get(function () {
  return '/gym/fitness_plan/' + this._id;
});

module.exports = mongoose.model('FitnessPlan', FitnessSchema);