// modules
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

// components
import { TransactionDetailsComponent } from "./transaction-details.component";

const routes: Routes = [
  {
    path: ":transactionId",
    component: TransactionDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransactionDetailsRoutingModule {}
