// modules
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

// components
import { ItemDetailsComponent } from "./item-details/item-details.component";

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  declarations: [ItemDetailsComponent],
  exports: [ItemDetailsComponent]
})
export class ItemsModule {}
