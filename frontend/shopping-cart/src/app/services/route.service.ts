// modules
import { Injectable } from "@angular/core";
import {
  Router,
  ActivatedRoute,
  ActivatedRouteSnapshot,
  ParamMap,
  NavigationEnd
} from "@angular/router";

// rxjs
import { Observable } from "rxjs/Observable";

// configs
import { Constants } from "../configs/constants";

@Injectable()
export class RouteService {
  private appConfigs;

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {
    this.appConfigs = Constants;
  }

  setLocation(route: string): void {
    this.router.navigateByUrl(route);
  }
}
