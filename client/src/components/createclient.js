import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';

const CreateClient = () => {
  const [file, setFile] = useState('');
  const [filename, setFilename] = useState('Choose File');
  const [uploadedFile, setUploadedFile] = useState({});
  const [first_name, setFirstName] = useState({});
  const [last_name, setLastName] = useState({});
  const [instructors, setInstructors] = useState({});
  const [plans, setPlans] = useState({});
  const [selectedinstructor, setSelectedInstructor] = useState({});
  const [selectedfitness, setSelectedFitness] = useState({});
  const [source, setSource] = useState({});

  useEffect(() => {
    axios
      .get(
        'http://localhost:3030/gym/'
      )
      .then(({ data }) => {
       setInstructors(data.updated_instructors);
       setPlans(data.plans);
      });
    }, []);



  const onChange = e => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };

  const onChangeFirstName = e => {
    setFirstName(e.target.value);

  };

  const onChangeLastName = e => {
    setLastName(e.target.value);
  };

  const onChangeInstructorSelect = e => {
    setSelectedInstructor(e.target.value);
  };
  const onChangeFitnessSelect = e => {
    setSelectedFitness(e.target.value);
  };

  const onSubmit = async e => {
    e.preventDefault();
    console.log(instructors);
    console.log(plans);
    console.log(selectedfitness)
    console.log(selectedinstructor)
    console.log(first_name)
    console.log(last_name)

    const formData = new FormData();
    formData.append('file', file);
    formData.set('first_name', first_name);
    formData.set('last_name', last_name);
    formData.set('fitness_plan', selectedfitness);
    formData.set('instructor', selectedinstructor);

    try {
      const res = await axios.post('http://localhost:3030/gym/client-upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
      });
      console.log(res.data)
      const { fileName, filePath } = res.data;
      setUploadedFile({ fileName, filePath });
      axios
      .get(
        'http://localhost:3030/'+filePath,
        { responseType: 'arraybuffer' },
      )
      .then(response => {
          console.log(response)
        const base64 = btoa(
          new Uint8Array(response.data).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            '',
          ),
        );
        const source = "data:;base64," + base64
        setSource(source);
      });
    }catch (err) {
      if (err.response.status === 500) {

      } else {
          console.log(err)
      }
    }




  };

	let instructorList = instructors.length > 0
		&& instructors.map((instructor, i) => {
		return (
			<option key={i} value={instructor._id}>{instructor.first_name}</option>
		)
  }, this);
  
  let fitnessList = plans.length > 0
  && plans.map((plan, i) => {
  return (
    <option key={i} value={plan._id}>{plan.title}</option>
  )
}, this);

  return (
    <Fragment>
      <form onSubmit={onSubmit}>

        <div className="form-group">
            <label htmlFor="first_name">First Name</label>
            <input type="text" className="form-control" id="first_name" name="first_name" onChange={onChangeFirstName}  placeholder="John"/>
        </div>

        <div className="form-group">
            <label htmlFor="last_name">Last Name</label>
            <input type="text" className="form-control" id="last_name" name="last_name" onChange={onChangeLastName} placeholder="Doe"/>
        </div>
        <div className='custom-file mb-4'>
          <input
            type='file'
            className='custom-file-input'
            id='customFile'
            onChange={onChange}
          />
          <label className='custom-file-label' htmlFor='customFile'>
            {filename}
          </label>
        </div>

        <div className="form-group">
          <label htmlFor="exampleFormControlSelect2">Instructor:</label>
          <select  className="form-control" id="exampleFormControlSelect2" onChange={onChangeInstructorSelect}>
            {instructorList}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="exampleFormControlSelect3">Fitness Plan:</label>
          <select  className="form-control" id="exampleFormControlSelect3" onChange={onChangeFitnessSelect}>
            {fitnessList}
          </select>
        </div>

        <input
          type='submit'
          value='Upload'
          className='btn btn-primary btn-block mt-4'
        />
      </form>
      {uploadedFile ? (
        <div className='row mt-5'>
          <div className='col-md-6 m-auto'>
            <h3 className='text-center'>{uploadedFile.fileName}</h3>
            <img style={{ width: '100%' }} src={source} alt='' />
          </div>
        </div>
      ) : null}
    </Fragment>
  );
};

export default CreateClient;