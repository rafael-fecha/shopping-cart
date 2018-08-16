"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Transactions_1 = require("../db/models/Transactions");
const mongoose = require('mongoose');
const transactions = [
    {
        transactionId: '54z850d9fef49ae4f108e6777987e6c9',
        amount: 45,
        items: [
            {
                itemId: 2321312,
                itemName: 'Pepe Jeans T-Shirt',
                description: 'T-Shirt 100% cottom',
                imageUrl: 'example',
                initialPrice: 45,
                finalPrice: 45,
                discount: false
            }
        ]
    }
];
mongoose.connect('mongodb://localhost/transactions');
transactions.map(data => {
    Transactions_1.default.collection.drop(function (err, result) {
        const transaction = new Transactions_1.default(data);
        transaction.save();
    });
});
