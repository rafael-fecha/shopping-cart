"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const cryptoCred = require('crypto');
const { Schema } = mongoose;
const UsersSchema = new Schema({
    email: String,
    hash: String,
    salt: String
});
UsersSchema.methods.setPassword = function (password) {
    this.salt = cryptoCred.randomBytes(16).toString('hex');
    this.hash = cryptoCred
        .pbkdf2Sync(password, this.salt, 10000, 512, 'sha512')
        .toString('hex');
};
UsersSchema.methods.validatePassword = function (password) {
    const hash = cryptoCred
        .pbkdf2Sync(password, this.salt, 10000, 512, 'sha512')
        .toString('hex');
    return this.hash === hash;
};
UsersSchema.methods.generateJWT = function () {
    const today = new Date();
    const expirationDate = new Date(today);
    expirationDate.setDate(today.getDate() + 60);
    return jwt.sign({
        email: this.email,
        id: this._id,
        exp: expirationDate.getTime() / 1000
    }, 'secret');
};
UsersSchema.methods.toAuthJSON = function () {
    return {
        _id: this._id,
        email: this.email
    };
};
exports.default = mongoose.model('Users', UsersSchema);
