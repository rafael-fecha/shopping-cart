"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const path = require("path");
const errorHandler = require("errorhandler");
const methodOverride = require("method-override");
const cors = require("cors");
const mongoose = require("mongoose");
const passport = require("passport");
const jwt = require('jsonwebtoken');
const Users_1 = require("./db/models/Users");
const passport_1 = require("./configs/passport");
const properties_1 = require("./configs/properties");
const transactions_1 = require("./db/controllers/transactions");
const utils_1 = require("./utils/utils");
class Server {
    static bootstrap() {
        return new Server();
    }
    constructor() {
        this.someToken = properties_1.properties().token;
        this.transactionsController = new transactions_1.TransactionsController();
        this.utils = new utils_1.Utils();
        this.app = express();
        this.config();
        this.api();
    }
    api() {
        this.app.post('/register', (req, res, next) => {
            const { body: { user } } = req;
            if (!user.email) {
                return res.status(422).json({
                    errors: {
                        email: 'is required'
                    }
                });
            }
            if (!user.password) {
                return res.status(422).json({
                    errors: {
                        password: 'is required'
                    }
                });
            }
            const finalUser = new Users_1.default(user);
            finalUser.setPassword(user.password);
            return finalUser
                .save()
                .then(() => res.json({ user: finalUser.toAuthJSON() }));
        });
        this.app.post('/auth', (req, res, next) => {
            const { body: { user } } = req;
            if (!user.email) {
                return res.status(422).json({
                    errors: {
                        email: 'is required'
                    }
                });
            }
            if (!user.password) {
                return res.status(422).json({
                    errors: {
                        password: 'is required'
                    }
                });
            }
            return passport.authenticate('local', { session: false }, (err, passportUser, info) => {
                if (err) {
                    return next(err);
                }
                if (passportUser) {
                    const user = passportUser;
                    const token = jwt.sign(user.toAuthJSON(), this.utils.getJWTSecretToken());
                    return res.json(token);
                }
                return res.send(info).sendStatus(400);
            })(req, res, next);
        });
        this.app.get('/transactions', passport.authenticate('jwt', { session: false }), (req, res) => __awaiter(this, void 0, void 0, function* () {
            const transactionIds = yield this.transactionsController.getAllTransactionsId();
            res.send(transactionIds);
        }));
        this.app.get('/transaction/:transactionId', passport.authenticate('jwt', { session: false }), (req, res) => __awaiter(this, void 0, void 0, function* () {
            const transaction = yield this.transactionsController.getTransaction(req.params.transactionId);
            res.send(transaction).status(200);
        }));
    }
    config() {
        const MONGODB_CONNECTION = 'mongodb://localhost/transactions';
        mongoose.connect(MONGODB_CONNECTION);
        this.passport = new passport_1.Passport();
        this.passport.setupConfigs();
        this.app.use(express.static(path.join(__dirname, 'public')));
        this.app.use(cors());
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(methodOverride());
        this.app.use(cookieParser('SECRET'));
        this.app.use(function (err, req, res, next) {
            err.status = 404;
            next(err);
        });
        this.app.use(errorHandler());
    }
}
exports.Server = Server;
