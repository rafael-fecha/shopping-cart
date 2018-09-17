// modules
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

// rxjs
import { Observable } from "rxjs/Observable";

// configs
import { Constants } from "../configs/constants";

@Injectable()
export class BackendService {
  private appConfigs;

  constructor(private http: HttpClient) {
    this.appConfigs = Constants;
  }

  getTransactions(): Observable<any> {
    return this.http.get(
      `${this.appConfigs.backendPaths.BASE}${
        this.appConfigs.backendPaths.API.GET_TRANSACTIONS
      }`,
      {
        headers: new HttpHeaders({
          Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YjlhY2NmODA3MDQ3MTA4YzM4ZmQ4ZTEiLCJlbWFpbCI6ImV4YW1wbGVAZ21haWwuY29tIiwiaWF0IjoxNTM2ODcxNzgyfQ._Nn8AsG8mChMZ8JMBY_Cu_AJxW-PacarZNoLx51wIT4"
        })
      }
    );
  }

  getTransactionDetails(transactionId: string): Observable<any> {
    return this.http.get(
      `${this.appConfigs.backendPaths.BASE}${
        this.appConfigs.backendPaths.API.GET_TRANSACTION_DETAIL
      }/${transactionId}`,
      {
        headers: new HttpHeaders({
          Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YjlhY2NmODA3MDQ3MTA4YzM4ZmQ4ZTEiLCJlbWFpbCI6ImV4YW1wbGVAZ21haWwuY29tIiwiaWF0IjoxNTM2ODcxNzgyfQ._Nn8AsG8mChMZ8JMBY_Cu_AJxW-PacarZNoLx51wIT4"
        })
      }
    );
  }
}
