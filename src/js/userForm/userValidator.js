const validator = {};

validator.verify = (first, second) => {
  return (
    first === second ?
      response(true) :
      response(false, "Пароли не совпадают")
  )
}

function response(valid, message) {
  return {
    valid,
    message
  }
}

export default validator;
