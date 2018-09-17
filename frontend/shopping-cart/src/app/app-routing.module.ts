// modules
import { NgModule } from "@angular/core";
import { Routes, RouterModule, PreloadAllModules } from "@angular/router";

// configs
import { Constants } from "./configs/constants";

const routes: Routes = [
  {
    path: "",
    redirectTo: Constants.routes.transactions,
    pathMatch: "full"
  },
  {
    path: Constants.routes.transactions,
    data: { state: Constants.routes.transactions },
    loadChildren:
      "./transactions/transactions-list/transactions-list.module#TransactionsListModule"
  },
  {
    path: Constants.routes.transactionDetails,
    data: { state: "transaction" },
    loadChildren:
      "./transactions/transaction-details/transaction-details.module#TransactionDetailsModule"
  },
  {
    path: '**',
    redirectTo: "/"
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
