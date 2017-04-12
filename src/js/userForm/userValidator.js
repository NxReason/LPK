import ajax from '../utils/ajax';

const validator = {};

validator.verify = (first, second) => {
  return (
    first === second ?
      response(true) :
      response(false, "Пароли не совпадают")
  )
}

validator.unique = (fieldName, value) => {
  return ajax(`/admin/users/exists?${fieldName}=${value}`)
  .then(res => {
    res = JSON.parse(res);
    return (
      res.exists ?
      response(false, "Пользователь с данным логином уже существует") :
      response(true)
    );
  });
}

function response(valid, message) {
  return {
    valid,
    message
  }
}

export default validator;
