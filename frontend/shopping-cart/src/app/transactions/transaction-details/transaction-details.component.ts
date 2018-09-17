// modules
import {
  Component,
  OnInit,
  ChangeDetectorRef,
  ChangeDetectionStrategy
} from "@angular/core";
import { ActivatedRoute } from "@angular/router";

//services
import { ModalManager } from "../../shared/modal/modal-manager";
import { RouteService } from "../../services/route.service";

// configs
import { Constants } from "../../configs/constants";

// interfaces
interface ItemList {
  retailTransactionLineItemList: {
    "com.gk_software.gkr.api.txpool.dto.RetailTransactionLineItem": {
      retailTransactionLineItemI18NTextList: Object[];
      saleReturnLineItemList: Object[];
    }[];
  }[];
}

@Component({
  selector: "app-transaction-details",
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./transaction-details.component.html",
  styleUrls: ["./transaction-details.component.scss"]
})
export class TransactionDetailsComponent implements OnInit {
  itemsList: ItemList[] = [];
  modalTemplates;
  itemIndexToRemove: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private cd: ChangeDetectorRef,
    private modalManager: ModalManager,
    private routeService: RouteService
  ) {
    this.modalTemplates = this.modalManager.getModalTemplates();
  }

  closeModal(): void {
    this.modalManager.close(this.modalTemplates.removeDeviceConfirmation);
  }

  processRemoveItem(): void {
    this.itemsList.splice(this.itemIndexToRemove, 1);

    if (!this.itemsList.length) {
      this.routeService.setLocation("transactions");
    }

    this.closeModal();
  }

  removeItem(i: number): void {
    this.itemIndexToRemove = i;
    this.modalManager.open(this.modalTemplates.removeDeviceConfirmation);
  }

  trackByIndex(index, item): number {
    return index;
  }

  ngOnInit(): void {
    const currentTransactionId = this.activatedRoute.snapshot.paramMap.get(
      "transactionId"
    );

    [this.itemsList] = JSON.parse(localStorage.getItem("Transactions")).filter(
      (item: { transactionId: string } ) => {
        return item.transactionId === currentTransactionId;
      }
    ).map((transaction) => transaction.items);

    this.cd.detectChanges();
  }
}
