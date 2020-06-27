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
          "Authorization": token
            ? "Bearer " + token
            : null
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
  // Auth
  login(email, password, cb) {
  }
  signup(data, cb) {
  }
  getCompanies(cb) {
    this.baseApi('api/v1/getCompanies', 'GET', {}, cb)
  }
  insertCompany(data, cb) {
    this.baseApi('api/v1/insertCompany', 'POST', data, cb)
  }
  updateCompany(data, cb) {
    this.baseApi('api/v1/updateCompany', 'POST', data, cb)
  }
  deleteCompany(id, cb) {
    this.baseApi('api/v1/deleteCompany', 'POST', {id}, cb)
  }
};
export default (new HttpApi())
