const mongoose = require('mongoose');
const cryptoCred = require('crypto');

const { Schema } = mongoose;

const UsersSchema = new Schema({
  email: String,
  hash: String,
  salt: String
});

UsersSchema.methods.setPassword = function(password) {
  this.salt = cryptoCred.randomBytes(16).toString('hex');
  this.hash = cryptoCred
    .pbkdf2Sync(password, this.salt, 10000, 512, 'sha512')
    .toString('hex');
};

UsersSchema.methods.validatePassword = function(password) {
  const hash = cryptoCred
    .pbkdf2Sync(password, this.salt, 10000, 512, 'sha512')
    .toString('hex');
  return this.hash === hash;
};

UsersSchema.methods.toAuthJSON = function() {
  return {
    _id: this._id,
    email: this.email
  };
};

export default mongoose.model('Users', UsersSchema);
