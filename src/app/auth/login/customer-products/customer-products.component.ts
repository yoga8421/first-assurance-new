import { Component } from '@angular/core';
import * as Mydatas from '../../../../../app-config.json';
import { FormBuilder } from '@angular/forms';
import { LoginService } from '../login.service';
import { AuthService } from '../../Auth/auth.service';
import { Router } from '@angular/router';
import { AppTopBarComponent } from 'src/app/layout/app.topbar.component';
import { SharedService } from 'src/app/demo/service/shared.service';
class Product {
  name:string = '';
  imageUrl:string = '';
}

@Component({
  selector: 'app-customer-products',
  templateUrl: './customer-products.component.html',
  styleUrls: ['./customer-products.component.scss']
})
export class CustomerProductsComponent {
  products:Product[];
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  branchselection: boolean;
  branchList: any[]=[];
  branchValue: any;
  errorSection: boolean;
  errorList: any;
  insuranceid='100002'
  encryptedValue: any;
  userType: string;
  selectedBranch: any;
  branches: any;
  serDetails: any; userResponse: any;loginId: any;
  userTypes: any; productList: any;
  selectedProduct: any[]=[];
  userDetails: any;
  loginType: any;
  constructor(private _formBuilder: FormBuilder,
    private loginService: LoginService, private authService: AuthService,
    private router: Router,private shared: SharedService) {
      this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
      this.userResponse = this.userDetails?.Result;
      this.loginId = this.userDetails.Result.LoginId;
      this.userType = this.userDetails.Result.UserType;
      //this.userTypes = this.userDetails.Result.BranchCode;
      this.userTypes= this.userDetails.Result.BrokerBranchName;
      this.insuranceid= this.userDetails.Result.InsuranceId;
      this.productList = this.userDetails.Result.BrokerCompanyProducts;  
      if(this.userDetails.Result.LoginType) this.loginType = this.userDetails.Result.LoginType;
      //this.encryptedValue='BIxEDbyzljyRQioO+7ARQqLPPKu+WfA4udDCuES1WxsdFNDHLT6r7YP540AG1KmAQNWgrJuNuFGsOcuW6fb7wSBLK3luky6H576Ecw1t8syqtnp5ItYS0h+3UK7FRNYugQljNKJF2pDsu4O4M7mAIxmgrtg15T7ShalOk7mhoznnIbl5WSM+lnONMWpyqPqNfmF8ZEfSm3gagf0a+eZBDDlCiwzw0Lpqw7jSLMH8YyzgmUzu868ix2X9oRLgN2vUJzsd2+KWPAU5wqbwC/eVpYmvEB0NHJZxWqX2ez4V9MaCkz1oCxqssGYUIw2efm+j';

      // this.getDecryptData();
    }
    async getDecryptData(){
      let urlLink = `${this.CommonApiUrl}authentication/doauth`
      let ReqObj = {
          "e":this.encryptedValue
      };
      (await this.shared.onPostMethodUnAuthAsync(urlLink, ReqObj)).subscribe(
        (data: any) => {
          let res: any = data;
          console.log(data);
          console.log(data,"data");
          
          if (data.Result) {
            this.errorSection = false;
            if(data.AdditionalInfo){
              let details = data.AdditionalInfo;
              console.log(details,"detailsdetails");
              
              if(details.QuoteNo!='null' && details.QuoteNo!=null){
                  sessionStorage.setItem('quoteNo',details?.QuoteNo)
              }
              let custRefNo = details?.CustomerRefNo;
              if(custRefNo!='' && custRefNo!='null' && custRefNo!=null && custRefNo!=undefined){
                sessionStorage.setItem('customerReferenceNo',custRefNo);
              }
              let refNo = details?.RefNo;
              if(refNo!='' && refNo!='null' && refNo!=null && refNo!=undefined){
                sessionStorage.setItem('quoteReferenceNo',refNo);
              }
              let result = data.Result;
              let insuranceId = details?.InsuranceId;
              if(insuranceId!='' && insuranceId!='null' && insuranceId!=null && insuranceId!=undefined){
                result['InsuranceId'] = insuranceId;
              }
              let productId = details?.ProductId;
              if(productId!='' && productId!='null' && productId!=null && productId!=undefined){
                result['ProductId'] = productId;
              }
              let branchCode = details?.BranchCode;
              if(branchCode!='' && branchCode!='null' && branchCode!=null && branchCode!=undefined){
                result['BranchCode'] = branchCode;
              }
             const Token = data?.Result?.Token;
              this.authService.login(data);
              this.authService.UserToken(Token);
              sessionStorage.setItem('UserToken',Token);
              if(data?.Result?.LoginBranchDetails){
                if(data?.Result?.LoginBranchDetails.length!=0){
                  data.Result['BranchCode'] = data?.Result?.LoginBranchDetails[0].BranchCode;
                  data.Result['BrokerBranchCode'] = data?.Result?.LoginBranchDetails[0].BrokerBranchCode;
                  data.Result['CurrencyId'] = data?.Result?.LoginBranchDetails[0].CurrencyId;
                }
              }
              console.log("Final Setted Data",data)
              sessionStorage.setItem('Userdetails',JSON.stringify(data));
              if(details?.PageType){
                if(details.PageType=='B2C'){
                    let branchList: any[] = data?.Result?.LoginBranchDetails;
                    if (branchList.length != 0 && branchList.length > 1) {
                      console.log("Entered Branch", branchList)
                      // this.router.navigate(['/branch']);
                      this.branchselection=true;
                      this.branchList = branchList;
                    }
                    else if (branchList.length != 0){
                      this.branchList = branchList;
                      this.branchValue = branchList[0].BrokerBranchCode;
                      let branchData: any = this.branchList.find(ele => ele.BrokerBranchCode == this.branchValue);
                      let userDetails = JSON.parse(sessionStorage.getItem('Userdetails') as any);
                      userDetails.Result['BrokerBranchCode'] = this.branchValue;
                      userDetails.Result['BranchCode'] = branchData.BranchCode;
                      userDetails.Result['CurrencyId'] = branchData?.CurrencyId;
                      userDetails.Result['InsuranceId'] = branchData?.InsuranceId;
                      userDetails.Result['LoginType'] = 'B2CFlow';
                      sessionStorage.setItem('b2cType','guest')
                      sessionStorage.setItem('Userdetails', JSON.stringify(userDetails));
                      sessionStorage.removeItem('customerReferenceNo');
                      //this.router.navigate(['/Home/customer/Client/client-details']);
                    }
                }
                this.router.navigate([details?.RouterLink]);
              }
            }
          }
          else if(data.ErrorMessage){
              if(data.ErrorMessage.length!=0){
                this.errorSection = true;
                this.errorList = data.ErrorMessage;
              }
          }
        },
        (err: any) => {
          alert("Error")
          // console.log(err);
        },
      );
  }

  selectProduct(product) {
    this.selectedProduct = product.ProductId;
    let userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    
    userDetails.Result['ProductId'] = product.ProductId;
    userDetails.Result['ProductName'] = product.ProductName;
    userDetails.Result['ProductId'] = product.ProductId;
    this.shared.ProductName = product.ProductName;
    sessionStorage.setItem('reloadType','YES');

    userDetails.Result['PackageYn'] = product.PackageYn;
      sessionStorage.setItem('Userdetails', JSON.stringify(userDetails));
    console.log("Products",product,userDetails.Result)
    this.router.navigate(['/customer-info']);
  }
  getProductUrl(product){
      if(product.ProductId=='5') return './assets/layout/images/motor.png';
      else if(product.ProductId=='59') return './assets/layout/images/domestic.png';
      else if(product.ProductId=='4') return './assets/layout/images/travel1.png';
      else if(product.ProductId=='5') return './assets/layout/images/motor.png';
      else if(product.ProductId=='46') return './assets/layout/images/shortTerm.png';
  }
  selectBranch(branch) {
    if(this.userType=='Issuer')  this.selectedBranch = branch.BranchCode;
    if(this.userType!='Issuer')  this.selectedBranch = branch.BrokerBranchCode;
    if (this.selectedBranch != '' && this.selectedBranch != undefined) {
      let userDetails = JSON.parse(sessionStorage.getItem('Userdetails') as any);
      if (this.userType == 'Issuer') {
        let branchData: any = this.branches.find(ele => ele.BranchCode == this.selectedBranch);
        userDetails.Result['BrokerBranchCode'] = null;
        userDetails.Result['BranchCode'] = branchData.BranchCode;
        userDetails.Result['CurrencyId'] = branchData?.CurrencyId;
        userDetails.Result['InsuranceId'] = branchData?.InsuranceId;
        sessionStorage.setItem('Userdetails', JSON.stringify(userDetails));
      }
      else {
        let branchData: any = this.branches.find(ele => ele.BrokerBranchCode == this.selectedBranch);
        console.log("Branch Value", this.selectedBranch, branchData)
        userDetails.Result['BrokerBranchCode'] = branchData.BrokerBranchCode;
        userDetails.Result['BranchCode'] = branchData.BranchCode;
        userDetails.Result['CurrencyId'] = branchData?.CurrencyId;
        userDetails.Result['InsuranceId'] = branchData?.InsuranceId;
        sessionStorage.setItem('Userdetails', JSON.stringify(userDetails));
      }
    }
  }
  checkBranchBg(branch){
    if(this.userType=='Issuer'){
      if(branch.BranchCode == this.selectedBranch) return '#042181';
      else return '';
    }
    else{
      console.log('Entered Branch',branch,this.selectedBranch)
      if(branch.BrokerBranchCode == this.selectedBranch){
        
        return '#042181';
      }
      else return '';
    }
  }
}
