const bcrypt = require('bcrypt-nodejs');

function hashPassword(user, options) {
  if ( !user.changed('password') ) return;
  return new Promise((resolve, reject) => {
    bcrypt.hash(user.password, null, null, (err, hash) => {
      if (err) reject(err);
      else resolve(hash);
    })
  })
  .then(hashedPassword => user.password = hashedPassword);
}

module.exports = hashPassword;
