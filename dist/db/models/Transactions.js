"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose = require('mongoose');
const transactionSchema = new mongoose_1.Schema({
    transactionId: {
        type: String,
        unique: true
    },
    amount: Number,
    items: [
        {
            itemId: Number,
            itemName: String,
            description: String,
            imageUrl: String,
            initialPrice: Number,
            finalPrice: Number,
            discount: Boolean
        }
    ]
});
exports.default = mongoose.model('transaction', transactionSchema);
