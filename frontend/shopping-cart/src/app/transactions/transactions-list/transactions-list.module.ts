// modules
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TransactionsRoutingModule } from "./transactions-list-routing.module";

// components
import { TransactionsListComponent } from "./transactions-list.component";
import { TransactionItemComponent } from "./transaction-item/transaction-item.component";

@NgModule({
  imports: [CommonModule, TransactionsRoutingModule],
  declarations: [TransactionsListComponent, TransactionItemComponent]
})
export class TransactionsListModule {}
