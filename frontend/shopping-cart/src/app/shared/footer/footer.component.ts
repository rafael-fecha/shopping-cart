import { Component, OnInit } from "@angular/core";

@Component({
  selector: "footer",
  template: `
  <div class="footer">
    <div class="content">
      <p>GK Software Developer Test 2018</p>
      <p>Rafael Fecha Coutinho</p>
    </div>
  </div>`,
  styleUrls: ["./footer.component.scss"]
})
export class FooterComponent {
  constructor() {}
}
