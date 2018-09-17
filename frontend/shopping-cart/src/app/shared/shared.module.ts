// modules
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

// components
import { FooterComponent } from "./footer/footer.component";
import { MainMenuComponent } from "./main-menu/main-menu.component";
import { ModalComponent } from "./modal/modal.component";

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [FooterComponent, MainMenuComponent, ModalComponent],
  exports: [FooterComponent, MainMenuComponent, ModalComponent]
})
export class SharedModule {}
