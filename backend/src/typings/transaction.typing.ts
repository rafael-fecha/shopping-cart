import {TransactionItem} from "./item.typing";

export interface TransactionModel {
    transactionId: string,
    amount: number,
    items: TransactionItem[]
}