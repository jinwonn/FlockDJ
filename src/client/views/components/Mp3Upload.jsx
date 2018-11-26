import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import ReactS3 from 'react-s3';

const config = {
    bucketName: 'connect-to-bucket',
    region: 'us-east-2',
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
}

class Mp3Upload extends Component {
  constructor(props) {
    super(props);
  }

  handleFileUpload = (event) => {
    ReactS3
    .uploadFile(event.target.files[0], config)
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log('Upload Error: ', err);
    })
  }

  render () {
    return (
      <div>
        <input
        label='Upload MP3'
        type='file'
        onChange={this.handleFileUpload}
        />
      </div>
    );
  }
}

export default Mp3Upload;