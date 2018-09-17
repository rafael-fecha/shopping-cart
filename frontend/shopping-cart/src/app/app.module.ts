// modules
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
import { SharedModule } from "./shared/shared.module";

// services
import { BackendService } from "./services/backend.service";
import { ModalManager } from "./shared/modal/modal-manager";
import { RouteService } from "./services/route.service";

// components
import { AppComponent } from "./app.component";

// rxjs
import "./rxjs.imports";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    SharedModule,
    AppRoutingModule
  ],
  providers: [BackendService, RouteService, ModalManager],
  bootstrap: [AppComponent]
})
export class AppModule {}
