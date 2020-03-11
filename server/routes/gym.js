const express = require('express')
const router = express.Router()
var async = require('async');
const Instructor = require('../models/instructor')
const Client = require('../models/client')
const FitnessPlan = require('../models/fitnessplan')
const fs = require('fs')







router.get('/', async (req, res, next) => {
    try{
            const instructors = await Instructor.find();
            const updated_instructors= [];
            for (i in instructors) {
                const count = await getCount(instructors[i]._id)
                const ins ={} 
                ins.client_count = count
                ins.first_name= instructors[i].first_name;
                ins.last_name= instructors[i].last_name;
                ins._id= instructors[i]._id;
                const file_name = "instructorpic"+instructors[i]._id
                if (fs.existsSync(`${process.cwd()}/public/uploads/${file_name}`)) {
                    //file exists
                    ins.pic_name= file_name;
                  }
                else{
                    ins.pic_name=null
                }

                updated_instructors.push(ins)
              }

            const clients = await Client.find();
            const plans = await FitnessPlan.find();
            const result = {updated_instructors,clients,plans}
            res.json(result)
    }catch(err){
        res.json({message: err});
    }
  });
  async function getCount(id){
    return await Client.count({'instructor': id})
  }

router.get('/instructor/:id', async function(req,res,next){
    async.parallel({
        instructor: function(callback) {
            Instructor.findById(req.params.id)
              .exec(callback)
        },
        instructors_clients: function(callback) {
          Client.find({ 'instructor': req.params.id })
          .populate('fitness_plan')
          .exec(callback)
        },
    }, function(err, results) {
        if (err) { return next(err); } // Error in API usage.
        if (results.instructor==null) { // No results.
            var err = new Error('Instructor not found');
            err.status = 404;
            return next(err);
        }
//************************** */
        const updated_clients= [];
        for (i in results.instructors_clients) {
            const ins ={} 
            ins.first_name = results.instructors_clients[i].first_name
            ins.last_name= results.instructors_clients[i].last_name
            ins._id= results.instructors_clients[i]._id;
            ins.instructor= results.instructors_clients[i].instructor;

            const fitness ={} 
            fitness._id= results.instructors_clients[i].fitness_plan._id
            fitness.title= results.instructors_clients[i].fitness_plan.title
            fitness.description= results.instructors_clients[i].fitness_plan.description
            ins.fitness_plan = fitness

            const file_name = "clientpic"+results.instructors_clients[i]._id
            if (fs.existsSync(`${process.cwd()}/public/uploads/${file_name}`)) {
                //file exists
                ins.pic_name= file_name;
            }
            else{
                ins.pic_name=null
            }

            updated_clients.push(ins)
        }
        //console.log(updated_clients);
        delete results.instructors_clients;
        results.instructors_clients = updated_clients;


//*********************************** */
        // Successful, so render.
        res.json(results);
    }); 
});

router.get('/client/:id', async function(req,res,next) {
    
    async.parallel({
        client: function(callback) {

            Client.findById(req.params.id)
              .populate('instructor')
              .populate('fitness_plan')
              .exec(callback);
        },
 
    }, function(err, results) {
        if (err) { return next(err); }
        if (results.client==null) { // No results.
            var err = new Error('client not found');
            err.status = 404;
            return next(err);
        }
        // Successful, so render.
        res.json(results);
    });
});

router.get('/fitness_plan/:id', async function(req,res,next) {
    
    async.parallel({
        fitness_plan: function(callback) {

            FitnessPlan.findById(req.params.id) 
              .exec(callback);
        },
        clients_in_plan: function(callback) {
            Client.find({ 'fitness_plan': req.params.id },'first_name last_name')
            .exec(callback)
          },
 
    }, function(err, results) {
        if (err) { return next(err); }
        if (results.fitness_plan==null) { // No results.
            var err = new Error('plan not found');
            err.status = 404;
            return next(err);
        }
        //************************** */
        //const updated_plan= [];
        
            const fitness ={} 
            fitness._id= req.params.id
            fitness.title= results.fitness_plan.title
            fitness.description= results.fitness_plan.description
            const file_name = "fitnesspic"+results.fitness_plan._id
            if (fs.existsSync(`${process.cwd()}/public/uploads/${file_name}`)) {
                //file exists
                fitness.pic_name= file_name;
            }
            else{
                fitness.pic_name=null
            }
            //updated_plan.push(fitness)
        
        //console.log(updated_plan);
        delete results.fitness_plan;
        results.fitness_plan = fitness;


//*********************************** */

        // Successful, so render.
        res.json(results);
    });
});
// router.post('/client/update/:id', async function(req,res,next) {
// 	// let paramss = { 
//     //     instructor: req.body.instructor
// 	// };

//   try{
//   		// or use req.body instead of params
//   		const client = await client.findById(req.params.id);
//   		res.json(client)
//   }catch(err){
//   	res.json({message: err});
//   }
// });

/* POST - create new instructor */
router.post('/instructor/new', async function(req,res,next){
	console.log(req.body)
	//do sanitization
	const instructor = new Instructor({
		first_name: req.body.first_name,
		last_name: req.body.last_name
	})
	console.log('new instructor created')
	try{
		const savedInstructor = await instructor.save()
		res.json(savedInstructor)
	}catch(err){
		res.json({message: err});
	}     
});

/* POST - create new client */
router.post('/client/new', async function(req,res,next){
	console.log(req.body)
	//do sanitization
	const client = new Client({
		first_name: req.body.first_name,
        last_name: req.body.last_name,
        fitness_plan: req.body.fitness_plan,
        instructor: req.body.instructor
	})
	console.log('new client created')
	try{
		const savedClient = await client.save()
		res.json(savedClient)
	}catch(err){
		res.json({message: err});
	}     
});
/* POST - create new client */
router.post('/fitness_plan/new', async function(req,res,next){
	console.log(req.body)
	//do sanitization
	const plan = new FitnessPlan({
		title: req.body.title,
        description: req.body.description,
        client: req.body.client
	})
	console.log('new plan created')
	try{
		const savedplan = await plan.save()
		res.json(savedplan)
	}catch(err){
		res.json({message: err});
	}     
});


router.delete('/client/:id', async function(req, res, next) {
 Client.findByIdAndRemove(req.params.id, function deleteClient(err) {
    if (err) { return next(err); }
    res.json('client deleted')
    });

});

router.delete('/instructor/:id', async function(req, res, next) {
    Instructor.findByIdAndRemove(req.params.id, function deleteInstructor(err) {
       if (err) { return next(err); }
       res.json('instructor deleted')
       });
   
   });

router.delete('/plan/:id', async function(req, res, next) {
    FitnessPlan.findByIdAndRemove(req.params.id, function deletePlan(err) {
       if (err) { return next(err); }
       res.json('plan.. deleted')
       });
   
   });


// Upload Endpoint
router.post('/upload', async function(req, res){
    if (req.files === null) {
      return res.status(400).json({ msg: 'No file uploaded' });
    }
    const file = req.files.file;
  
    const instructor = new Instructor({
          first_name: req.body.first_name,
          last_name: req.body.last_name
      })
      try{
          const savedInstructor = await instructor.save()
  
      const file_name = 'instructorpic'+savedInstructor._id
  
      file.mv(`${process.cwd()}/public/uploads/${file_name}`, err => {
        if (err) {
          console.error(err);
          return res.status(500).send(err);
        }
    
        res.json({ fileName: file.name, filePath: `/uploads/${file_name}` });
      });
      }catch(err){
          res.json({message: err});
      } 
  
  });

  // Upload Endpoint
router.post('/client-upload', async function(req, res){

          console.log(`SERVERSIDE: ${req.body.first_name}`),
          console.log(`SERVERSIDE: ${req.body.last_name}`),
          console.log(`SERVERSIDE: ${req.body.fitness_plan}`),
          console.log(`SERVERSIDE: ${req.body.instructor}`)
    if (req.files === null) {
      return res.status(400).json({ msg: 'No file uploaded' });
    }
    const file = req.files.file;
  
    const client = new Client({
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          fitness_plan: req.body.fitness_plan,
          instructor: req.body.instructor,

      })
      try{
          const savedClient = await client.save()
  
      const file_name = 'clientpic'+savedClient._id
  
      file.mv(`${process.cwd()}/public/uploads/${file_name}`, err => {
        if (err) {
          console.error(err);
          return res.status(500).send(err);
        }
    
        res.json({ fileName: file.name, filePath: `/uploads/${file_name}` });
      });
      }catch(err){
          res.json({message: err});
      } 
  
  });

    // Upload Endpoint
router.post('/plan-upload', async function(req, res){

    console.log(`SERVERSIDE: ${req.body.title}`),
    console.log(`SERVERSIDE: ${req.body.description}`)
    if (req.files === null) {
    return res.status(400).json({ msg: 'No file uploaded' });
    }
    const file = req.files.file;

    const plan = new FitnessPlan({
        title: req.body.title,
        description: req.body.description
    })
    try{
        const savedPlan = await plan.save()

    const file_name = 'fitnesspic'+savedPlan._id

    file.mv(`${process.cwd()}/public/uploads/${file_name}`, err => {
    if (err) {
        console.error(err);
        return res.status(500).send(err);
    }

    res.json({ fileName: file.name, filePath: `/uploads/${file_name}` });
    });
    }catch(err){
        res.json({message: err});
    } 

});




module.exports = router;