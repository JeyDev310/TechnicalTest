/* eslint-disable */

var env       = process.env.APP_RUN_ENV || 'dev';
var config    = require('../config.json')[env];
// import config from "../config.";
const axios = require('axios');

class HttpApi {
	constructor() {
  }
  async init () {
  }
  async baseApi(sub_url, method, json_data, cb) {
    const token = localStorage.token? localStorage.token : null
    try {
      let request = {
        method,
        url: config.apiServerURL + sub_url,
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": token ? "Bearer " + token : null
        },
        data: JSON.stringify(json_data)
      };
      axios(request)
      .then( (response) => {
        cb(null, response.data)},
        (error) => { cb(error); }
      );
    } catch (error) {
      cb(error);
    }
  }
  async fileUploadApi(sub_url, method, file, cb) {
    const token = localStorage.token? localStorage.token : null
    let fd = new FormData()
    fd.append('file', file)
    try {
      axios.post(sub_url, fd, {
        headers: {
            "Authorization": token ? "Bearer " + token : null,
        }
      }).then(res => {
        cb(null, res.data)
      }, (error) => { cb(error); })
    } catch (error) {
      cb(error)
    }
  }
  // Auth
  login(email, password, cb) {
  }
  signup(data, cb) {
  }
  getCompanies(cb) {
    this.baseApi('api/v1/getCompanies', 'GET', {}, cb)
  }
  insertCompany(data, cb) {
    if (data.fileInput) {
      this.uploadFile(data.fileInput, (err, res) => {
        if (err == null) {
            data.file = res
            this.baseApi('api/v1/insertCompany', 'POST', data, cb)
        } else {
          cb("file uploading eror")
        }
      })
    } else {
      data.file = ''
      this.baseApi('api/v1/insertCompany', 'POST', data, cb)
    }

  }
  updateCompany(data, cb) {
    if (data.fileInput) {
      this.uploadFile(data.fileInput, (err, res) => {
        if (err == null) {
            data.file = res
            this.baseApi('api/v1/updateCompany', 'POST', data, cb)
        } else {
          cb("file uploading eror")
        }
      })
    } else {
      this.baseApi('api/v1/updateCompany', 'POST', data, cb)
    }
  }
  deleteCompany(id, cb) {
    this.baseApi('api/v1/deleteCompany', 'POST', {id}, cb)
  }
  uploadFile(file, cb) {    
    this.fileUploadApi('api/v1/uploadFile', 'POST', file, cb)
  }
  getUploadFilePath(fileName) {
    return window.location.origin + '/upload/' + fileName
  }
};
export default (new HttpApi())
