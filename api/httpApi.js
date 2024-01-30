const axios = require('axios');
const logger = require('../logger');

class HttpApi {
  constructor({ baseURL, headers }) {
    this._axios = axios.create({
      baseURL,
      headers,
    });
  }

  get({ endpoint, params }) {
    return this._makeRequest({
      method: 'get',
      endpoint,
      params,
    });
  }

  post({ endpoint, data }) {
    return this._makeRequest({
      method: 'post',
      endpoint,
      data,
    });
  }

  _makeRequest({
    method, endpoint, params = null, data = null,
  }) {
    try {
      if (method === 'get') {
        return this._axios[method](endpoint, { params });
      }
      if (method === 'post') {
        return this._axios[method](endpoint, data);
      }

      throw new Error('Invalid HTTP method');
    } catch (err) {
      logger.log('error', err);
    }
  }
}

module.exports = HttpApi;
