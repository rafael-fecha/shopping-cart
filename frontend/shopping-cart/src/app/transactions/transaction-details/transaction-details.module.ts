// modules
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ItemsModule } from "../../items/items.module";
import { TransactionDetailsRoutingModule } from "./transaction-details-routing.module";

// components
import { TransactionDetailsComponent } from "./transaction-details.component";
import { SharedModule } from "../../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ItemsModule,
    SharedModule,
    TransactionDetailsRoutingModule
  ],
  declarations: [TransactionDetailsComponent]
})
export class TransactionDetailsModule {}
