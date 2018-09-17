import {
  Component,
  OnInit,
  Input,
  ChangeDetectorRef,
  OnDestroy,
  EventEmitter,
  Output
} from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { FormControl } from "@angular/forms";
import {
  trigger,
  state,
  style,
  transition,
  animate,
  query
} from "@angular/animations";

// rxjs
import { Subject } from "rxjs/Subject";

// configs
import { Animations } from "../../configs/animations";
import { Constants } from "../../configs/constants";

const slideInOutAnimationStates = {
  hidden: "in",
  show: "out"
};

@Component({
  selector: "item-details",
  templateUrl: "./item-details.component.html",
  styleUrls: ["./item-details.component.scss"],
  animations: [
    Animations.discountPrice(),
    Animations.fadeOtherPrices(),
    Animations.slideInOutEditableSection()
  ]
})
export class ItemDetailsComponent implements OnInit, OnDestroy {
  @Input() discount: string;
  @Input() itemDescription: string;
  @Input() itemInitialPrice: string;
  @Input() itemMeasureOfCode: string;
  @Input() itemPriceUnit: string;
  @Input() itemQuantity: string;
  @Input() itemTitle: string;
  @Input() itemTotalDiscount: string;
  @Input() itemTotalPrice: string;
  @Output() itemRemoved: EventEmitter<void>;
  destroy$: Subject<boolean>
  editedDescription: string;
  showEditSection: string;
  startDiscountAnimation: boolean;
  startFadeAnimation: boolean;
  titleField: FormControl;
  

  constructor(
    private activatedRoute: ActivatedRoute,
    private cd: ChangeDetectorRef
  ) {
    this.destroy$ = new Subject<boolean>();
    this.itemRemoved = new EventEmitter<void>();
    this.startDiscountAnimation = false;
    this.startFadeAnimation = false;
  }

  animationDiscountInitialPriceFinished($event): void {
    if ($event && $event.toState === "active") {
      this.startFadeAnimation = true;
    }
  }

  removeProduct(): void {
    this.itemRemoved.emit();
  }

  showEditProduct(): void {
    this.showEditSection =
      this.showEditSection === slideInOutAnimationStates.show
        ? slideInOutAnimationStates.hidden
        : slideInOutAnimationStates.show;
  }

  updateProduct(): void {
    this.itemDescription = this.editedDescription;
  }

  ngOnInit(): void {
    this.showEditSection = slideInOutAnimationStates.show;

    setTimeout(() => {
      this.startDiscountAnimation = true;
      this.cd.detectChanges();
    });

    this.titleField = new FormControl();
    this.titleField.valueChanges
      .takeUntil(this.destroy$)
      .debounceTime(400)
      .distinctUntilChanged()
      .subscribe(description => {
        this.editedDescription = description;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
