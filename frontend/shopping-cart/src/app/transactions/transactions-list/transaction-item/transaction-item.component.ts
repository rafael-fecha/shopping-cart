import { Component, Input } from "@angular/core";

@Component({
  selector: "transaction-item",
  templateUrl: "./transaction-item.component.html",
  styleUrls: ["./transaction-item.component.scss"]
})
export class TransactionItemComponent {
  @Input() transactionId: string;
  @Input() transactionAmount: string;
  @Input() transactionReceiptDatetime: string;

  constructor() {}
}
