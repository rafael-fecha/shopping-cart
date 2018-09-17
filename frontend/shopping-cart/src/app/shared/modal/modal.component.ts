import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  Renderer2
} from "@angular/core";

// services
import { ModalManager } from "./modal-manager";

// configs
import { Animations } from "../../configs/animations";

const modalClasses = {
  openModal: "modal-open",
  hide: "hidden",
  preRenderHiddenModal: "modal-hidden"
};

const visibilityForFadeInAnimation = {
  show: "show",
  hidden: "void"
};

@Component({
  moduleId: module.id.toString(),
  selector: "modal",
  templateUrl: "./modal.component.html",
  styleUrls: ["./modal.component.scss"],
  animations: [Animations.animateModal()]
})
export class ModalComponent implements OnInit, OnDestroy {
  @Input() id: string;
  @Input() title: string;
  private nativeElement: any;
  visibility: string;

  constructor(
    private el: ElementRef,
    private modalService: ModalManager,
    private renderer: Renderer2
  ) {
    this.nativeElement = this.el.nativeElement;
  }

  close(): void {
    this.renderer.setProperty(this.nativeElement, modalClasses.hide, true);
    this.renderer.removeClass(document.body, modalClasses.openModal);
    this.visibility = visibilityForFadeInAnimation.hidden;
  }

  open(): void {
    this.renderer.setProperty(this.nativeElement, modalClasses.hide, false);
    this.renderer.addClass(document.body, modalClasses.openModal);
    this.visibility = visibilityForFadeInAnimation.show;
  }

  ngOnInit(): void {
    if (!this.id) {
      return;
    }

    // move element to bottom of page (just before </body>) so it can be displayed above everything else
    this.renderer.appendChild(document.body, this.nativeElement);

    // add self (this modal instance) to the modal service so it's accessible from controllers
    this.modalService.add(this);
    this.visibility = visibilityForFadeInAnimation.hidden;
    this.renderer.removeClass(
      this.nativeElement.querySelector(`.${modalClasses.preRenderHiddenModal}`),
      modalClasses.preRenderHiddenModal
    );
  }

  ngOnDestroy(): void {
    this.modalService.remove(this.id);
    this.renderer.removeChild(document.body, this.nativeElement);
  }
}
