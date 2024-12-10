import { Component } from '@angular/core';
import { AuthService } from '../auth/Auth/auth.service';
import * as Mydatas from '../app-config.json';
import { SharedService } from '../service/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-car-insurance',
  standalone: false,

  templateUrl: './car-insurance.component.html',
  styleUrls: ['./car-insurance.component.scss']
})
export class CarInsuranceComponent {
onLogin() {
throw new Error('Method not implemented.');
}
cancelOtp(arg0: any) {
throw new Error('Method not implemented.');
}
onOtpValidate() {
throw new Error('Method not implemented.');
}
  mobileNumber: string = '';
  encryptedValue:any=null;
  public AppConfig: any = (Mydatas as any).default;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public customApiUrl1: any = this.AppConfig.CustomApiUrl1;
  public motorApiUrl: any = this.AppConfig.MotorApiUrl;
otpGenerated: any;
otpValue: any;
OtpBtnEnable: any;
value_cancel: any;
  constructor(private authService:AuthService,private shared:SharedService,private router:Router){}
  getQuote() {
    // this.encryptedValue='BIxEDbyzljyRQioO+7ARQqLPPKu+WfA4udDCuES1WxsdFNDHLT6r7YP540AG1KmAQNWgrJuNuFGsOcuW6fb7wSBLK3luky6H576Ecw1t8syqtnp5ItYS0h+3UK7FRNYugQljNKJF2pDsu4O4M7mAIxmgrtg15T7ShalOk7mhoznnIbl5WSM+lnONMWpyqPqNfmF8ZEfSm3gagf0a+eZBDDlCiwzw0Lpqw7jSLMH8YyzgmUzu868ix2X9oRLgN2vUJzsd2+KWPAU5wqbwC/eVpYmvEB0NHJZxWqX2ez4V9MaCkz1oCxqssGYUIw2efm+j';
    this.encryptedValue = `BIxEDbyzljwo1iea31wcJerd+8CHJtGiK5515u9KfTP3UpNpdbuVJD7kmQUmEaWeRJNDJ3S3qqa0Q1q5ccWwzuXidDTUb7eLQN1mIok/9ruG6R3g13uuQywgCHKF9HcJF+Eil0N7SiyZ6es9cjIdjQZ4SgSolJvUcpTZhAe5NwbDcZkIsjumQouxeqxfgLijx+BFaT/inhmKteSIavCDr8Wd1WH33SLjFEWCGSnIDSESZZpS5Skx7U4la3l7nN+2+iKM0LFGGwz2Hz3W8IkrCpmj+8G7dCNTbYovkmm3/V0=`; //Kenya Local
    this.getDecryptData();
   
  }
  async getDecryptData() {
    let urlLink = `${this.CommonApiUrl}authentication/doauth`
    let ReqObj = {
      "e": this.encryptedValue
    };
    (await this.shared.onPostMethodUnAuthAsync(urlLink, ReqObj)).subscribe(
      (data: any) => {
        let res: any = data;
        console.log(data);
        console.log(data, "data");

        if (data.Result) {
          // this.errorSection = false;
          if (data.AdditionalInfo) {
            let details = data.AdditionalInfo;
            console.log(details, "detailsdetails");

            if (details.QuoteNo != 'null' && details.QuoteNo != null) {
              sessionStorage.setItem('quoteNo', details?.QuoteNo)
            }
            let custRefNo = details?.CustomerRefNo;
            if (custRefNo != '' && custRefNo != 'null' && custRefNo != null && custRefNo != undefined) {
              sessionStorage.setItem('customerReferenceNo', custRefNo);
            }
            let refNo = details?.RefNo;
            if (refNo != '' && refNo != 'null' && refNo != null && refNo != undefined) {
              sessionStorage.setItem('quoteReferenceNo', refNo);
            }
            let result = data.Result;
            let insuranceId = details?.InsuranceId;
            if (insuranceId != '' && insuranceId != 'null' && insuranceId != null && insuranceId != undefined) {
              result['InsuranceId'] = insuranceId;
            }
            let productId = details?.ProductId;
            if (productId != '' && productId != 'null' && productId != null && productId != undefined) {
              result['ProductId'] = productId;
            }
            let branchCode = details?.BranchCode;
            if (branchCode != '' && branchCode != 'null' && branchCode != null && branchCode != undefined) {
              result['BranchCode'] = branchCode;
            }
            const Token = data?.Result?.Token;
            this.authService.login(data);
            this.authService.UserToken(Token);
            sessionStorage.setItem('UserToken', Token);
            if (data?.Result?.LoginBranchDetails) {
              if (data?.Result?.LoginBranchDetails.length != 0) {
                data.Result['BranchCode'] = data?.Result?.LoginBranchDetails[0].BranchCode;
                data.Result['BrokerBranchCode'] = data?.Result?.LoginBranchDetails[0].BrokerBranchCode;
                data.Result['CurrencyId'] = data?.Result?.LoginBranchDetails[0].CurrencyId;

              }
            }
            console.log("Final Setted Data", data)
            sessionStorage.setItem('Userdetails', JSON.stringify(data));
            // this.getMotorUsageList();
            this.router.navigate(['/get-quote-page'])
          }
        }
        else if (data.ErrorMessage) {
          if (data.ErrorMessage.length != 0) {
            // this.errorSection = true;
            // this.errorList = data.ErrorMessage;
          }
        }
      },
      (err: any) => {
        alert("Error")
        // console.log(err);
      },
    );
  }
}
