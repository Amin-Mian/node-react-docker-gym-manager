var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var InstructorSchema = new Schema(
  {
    first_name: {type: String, required: true, max: 100},
    last_name: {type: String, required: true, max: 100}
  }
);
// Virtual for author's URL
InstructorSchema
.virtual('url')
.get(function () {
  return '/gym/instructor/' + this._id;
});




//Export model
module.exports = mongoose.model('Instructor', InstructorSchema);