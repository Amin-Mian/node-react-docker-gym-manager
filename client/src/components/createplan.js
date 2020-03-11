import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';

const CreatePlan = () => {
  const [file, setFile] = useState('');
  const [filename, setFilename] = useState('Choose File');
  const [uploadedFile, setUploadedFile] = useState({});
  const [title, setTitle] = useState({});
  const [description, setDescription] = useState({});
  const [source, setSource] = useState({});



  const onChange = e => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };

  const onChangeTitle = e => {
    setTitle(e.target.value);

  };

  const onChangeDescription = e => {
    setDescription(e.target.value);
  };



  const onSubmit = async e => {
    e.preventDefault();

    console.log(title)
    console.log(description)

    const formData = new FormData();
    formData.append('file', file);
    formData.set('title', title);
    formData.set('description', description);


    try {
      const res = await axios.post('http://localhost:3030/gym/plan-upload', formData, {
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



  return (
    <Fragment>
      <form onSubmit={onSubmit}>

        <div className="form-group">
            <label htmlFor="first_name">Title</label>
            <input type="text" className="form-control" id="title" name="title" onChange={onChangeTitle}  placeholder="3 day workout"/>
        </div>

        <div className="form-group">
            <label htmlFor="last_name">Description</label>
            <input type="text" className="form-control" id="description" name="description" onChange={onChangeDescription} placeholder="Tough exercises!"/>
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

export default CreatePlan;