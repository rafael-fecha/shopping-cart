import * as mongoose from 'mongoose';
import Transactions from '../models/Transactions';

export class TransactionsController {
  constructor() {
    mongoose.connect('mongodb://localhost/transactions');
  }

  getAllTransactionsId() {
    return new Promise(resolve => {
      Transactions.find()
        .lean()
        .exec((err, transactions) => {
          resolve(transactions.map(transaction => transaction.transactionId));
        });
    });
  }

  getTransaction(transactionId: string) {
    return new Promise(resolve => {
      Transactions.findOne({ transactionId: transactionId })
        .lean()
        .exec((err, transaction) => {
          resolve(transaction);
        });
    });
  }
}
