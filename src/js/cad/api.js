import ajax from '../utils/ajax';

const API = {
  sendModel(model) {
    return ajax('/cad/models/', {
      method: 'POST',
      data: model,
      headers: {
        'Content-type': 'application/json',
      },
    });
  },
};

export default API;
