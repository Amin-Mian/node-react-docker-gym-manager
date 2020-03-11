var createError = require('http-errors');
const express = require('express');
const app = express();
var mongoose = require('mongoose');
//const connectDb = require("./connection");
const cors = require('cors');
const path = require('path')
const usersRouter = require('./routes/users');
const gymRouter = require('./routes/gym');
const fileUpload = require('express-fileupload');



//Set up mongoose connection
var mongoose = require('mongoose');
var mongoDB = "mongodb://mongo:27017/mongo-test";
mongoose.connect(mongoDB, { useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));





const PORT = 3030;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload());
app.use('/users', usersRouter)
app.use('/gym', gymRouter)
// Upload Endpoint
// app.post('/upload', async function(req, res){
//   if (req.files === null) {
//     return res.status(400).json({ msg: 'No file uploaded' });
//   }
//   const file = req.files.file;

//   const instructor = new Instructor({
// 		first_name: req.body.first_name,
// 		last_name: req.body.last_name
// 	})
// 	try{
// 		const savedInstructor = await instructor.save()

//     const file_name = 'instructorpic'+savedInstructor._id

//     file.mv(`${__dirname}/public/uploads/${file_name}`, err => {
//       if (err) {
//         console.error(err);
//         return res.status(500).send(err);
//       }
  
//       res.json({ fileName: file.name, filePath: `/uploads/${file_name}` });
//     });
// 	}catch(err){
// 		res.json({message: err});
// 	} 

// });

app.get("/", (req, res) => {
  res.send("Hello from Node.js app \n");
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//app.listen(port, () =>console.log(`listening to port ${port}`));
app.listen(PORT, function() {
  console.log(`Listening on ${PORT}`);

});

