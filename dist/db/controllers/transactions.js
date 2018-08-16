"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const Transactions_1 = require("../models/Transactions");
class TransactionsController {
    constructor() {
        mongoose.connect('mongodb://localhost/transactions');
    }
    getAllTransactionsId() {
        return new Promise(resolve => {
            Transactions_1.default.find()
                .lean()
                .exec((err, transactions) => {
                resolve(transactions.map(transaction => transaction.transactionId));
            });
        });
    }
    getTransaction(transactionId) {
        return new Promise(resolve => {
            Transactions_1.default.findOne({ transactionId: transactionId })
                .lean()
                .exec((err, transaction) => {
                resolve(transaction);
            });
        });
    }
}
exports.TransactionsController = TransactionsController;
