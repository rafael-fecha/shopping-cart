// modules
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

// components
import { TransactionsListComponent } from "./transactions-list.component";

const routes: Routes = [
  {
    path: "",
    component: TransactionsListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransactionsRoutingModule {}
