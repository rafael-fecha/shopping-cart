// modules
import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from "@angular/core";

// rxjs
import { Subject } from "rxjs/Subject";

// services
import { BackendService } from "../../services/backend.service";
import { RouteService } from "../../services/route.service";

@Component({
  selector: "app-transactions-list",
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./transactions-list.component.html",
  styleUrls: ["./transactions-list.component.scss"]
})
export class TransactionsListComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean>;
  transactions: string[];

  constructor(
    private backendService: BackendService,
    private cd: ChangeDetectorRef,
    private routeService: RouteService
  ) {
    this.destroy$ = new Subject<boolean>();
    this.transactions = [];
  }

  convertDataFormat(dateTime: string): string {
    return dateTime.replace("T", " ").substring(0, dateTime.indexOf("."));
  }

  goToTransactionDetails(transactionId): void {
    this.routeService.setLocation(`transaction/${transactionId}`);
  }

  trackByIndex(index, item): number {
    return index;
  }

  ngOnInit() {
    this.backendService
      .getTransactions()
      .takeUntil(this.destroy$)
      .subscribe(data => {
        if (data && Array.isArray(data)) {
          data.forEach(transaction => {
            this.backendService
              .getTransactionDetails(transaction)
              .subscribe(data => {
                if (data) {
                  this.cd.markForCheck();
                  this.transactions.push(data);
                }
              });
          });
        }
      });
  }

  ngOnDestroy() {
    localStorage.setItem(
      "Transactions",
      JSON.stringify(this.transactions)
    );

    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
