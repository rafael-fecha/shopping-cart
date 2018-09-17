import { Component, OnInit } from "@angular/core";

// configs
import { Constants } from "../../configs/constants";

@Component({
  selector: "main-menu",
  template: `<nav>
  <ul>
    <li>
      <a [routerLink]="transactionsRoute" [routerLinkActive]="['active']">Home</a>
    </li>
  </ul>
</nav>`,
  styleUrls: ["./main-menu.component.scss"]
})
export class MainMenuComponent {
  transactionsRoute: string;

  constructor() {
    this.transactionsRoute = Constants.routes.transactions;
  }
}
