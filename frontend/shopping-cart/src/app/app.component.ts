// modules
import { Component } from "@angular/core";
import {
  trigger,
  transition,
  query,
  style,
  animate,
  group,
  useAnimation
} from "@angular/animations";

// configs
import { routeTransition } from "./configs/animations";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  animations: [
    trigger("routerTransition", [
      transition("* <=> *", [
        useAnimation(routeTransition)
      ])
    ])
  ]
})
export class AppComponent {

  getState(outlet) {
    return outlet.activatedRouteData.state;
  }
}
