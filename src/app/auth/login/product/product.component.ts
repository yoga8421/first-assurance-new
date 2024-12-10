import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AppComponent } from 'src/app/app.component';
import * as Mydatas from '../../../../../app-config.json';
import { LoginService } from '../login.service';
class Product {
  name:string = '';
  imageUrl:string = '';
}

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styles: [`
    .product-container { max-width: 800px;cursor:pointer !important; };
    .product-container .card{ width: 120px; };
    .product-container .card:hover { border: 4px solid orange; };
    .product-container .card img { width: 100%;height: 60px; object-fit: cover; };
    .product-container-alt { max-width: 900px;cursor:pointer !important; };
    .product-container-alt .card{ width: 275px; };
    .product-container-alt .card:hover { border: 4px solid orange; };
    .product-container-alt .card img { width: 100%;height: 200px; object-fit: cover; };
  `],
})
export class ProductComponent implements OnInit {
  products:Product[];
  branches:any[] | undefined;
  selectedBranch:any=null;lang:any=null;
  cities:any[] = [];userType:any=null;
  selectedProduct:string = '';userDetails:any;
  subUserType: string;typeList:any[]=[];quoteSection:boolean=false;
  approverSection:boolean=false;UserTypeList:any[]=[];
    public AppConfig: any = (Mydatas as any).default;
    public ApiUrl1: any = this.AppConfig.ApiUrl1;
    public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
    constructor(private router:Router,private translate: TranslateService,private appComp:AppComponent,
      private loginService:LoginService
    ){
      this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails')); 
      this.branches = this.userDetails?.Result?.LoginBranchDetails;
      this.userType = this.userDetails.Result.UserType;
      this.products =  this.userDetails.Result.BrokerCompanyProducts;
      this.subUserType = sessionStorage.getItem('typeValue');
      this.UserTypeList = [
        {"Code":"1","CodeDesc":"Transaction"},
        {"Code":"2","CodeDesc":"LoginCreation"},
        {"Code":"3","CodeDesc":"ApproverReferralManagement"},
      ]
      if(this.branches.length==1){
       this.selectBranch(this.branches[0]); 
      }
      else if(this.userType=='Issuer'){
        if(this.userDetails.Result.BranchCode){
          this.selectedBranch = this.userDetails.Result.BranchCode;
          let branch = this.branches.find(ele=>ele.BranchCode==this.selectedBranch);
          if(branch) this.selectBranch(branch)
        }
      }
      else{
        if(this.userDetails.Result.BrokerBranchCode){
          this.selectedBranch = this.userDetails.Result.BrokerBranchCode;
          let branch = this.branches.find(ele=>ele.BrokerBranchCode==this.selectedBranch);
          if(branch) this.selectBranch(branch)}
      }
        this.appComp.getLanguage().subscribe((res:any)=>{  
          if(res) this.lang=res;
          else this.lang='en';
          this.translate.setDefaultLang(this.lang);
          });
        if(!this.lang){if(sessionStorage.getItem('language'))this.lang=sessionStorage.getItem('language');
        else this.lang='en';
        sessionStorage.setItem('language',this.lang)
        this.translate.setDefaultLang(sessionStorage.getItem('language'));}
      
    }
  ngOnInit(): void {
    if(this.userType=='Issuer'){
        this.getTypeList();
    }
    else{this.quoteSection=true;this.approverSection=false;}
    // this.products = [
    //   {name:'Burglary', imageUrl:''},
    //   {name:'Corporte Plus', imageUrl:''},
    //   {name:'Domestic', imageUrl:''},
    //   {name:'Employer\'s liability', imageUrl:''},
    //   {name:'Cyber Insurance', imageUrl:''},
    //   {name:'Fire and Allied Perillis', imageUrl:''},
    //   {name:'Motor', imageUrl:''},
    //   {name:'Short term policy', imageUrl:''},
    //   {name:'Machinery Breakdown', imageUrl:''},
    //   {name:'Medical Malpractice', imageUrl:''},
    //   {name:'Money', imageUrl:''},
    //   {name:'Fiedility', imageUrl:''},
    // ];

   // this.branches = [{label: 'Arusha', value: 'arusha'}, {label: 'Yens', value: 'yens'}, {label: 'Yens', value: 'yens1'}];
  }
  getTypeList() {
        let urlLink = `${this.ApiUrl1}dropdown/subusertype`;
        let userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
        if (userDetails) {
          let ReqObj = {
            "InsuranceId": userDetails?.Result?.InsuranceId,
            "LoginId": userDetails?.Result?.LoginId,
            "BranchCode": userDetails?.Result?.BranchCode,
            "UserType": userDetails?.Result?.UserType
          }
          this.loginService.onPostMethodBearerSync(urlLink, ReqObj).subscribe(
            (data: any) => {
              console.log(data);
              if (data.Result) {
                this.typeList = data?.Result;
                if(this.typeList.length!=0){
                  let entry = this.typeList.some(ele=>ele.Code=='high');
                  if(entry){this.quoteSection=false;this.approverSection=true;}
                  else{this.quoteSection=true;this.approverSection=false;}
                }
              }
            });
        }
  }
  onSelectUserType(rowData){
      let userDetails = JSON.parse(sessionStorage.getItem('Userdetails') as any);
      if(rowData.Code=='1'){sessionStorage.setItem('typeValue','low');this.quoteSection=true;this.approverSection=false;}
      else if(rowData.Code=='2'){
        if(this.branches.length!=0){
          this.selectedBranch = this.branches[0].BrokerBranchCode;
          let branchData: any = this.branches.find(ele => ele.BrokerBranchCode == this.selectedBranch);
          console.log("Branch Value", this.selectedBranch, branchData)
          userDetails.Result['BrokerBranchCode'] = branchData.BrokerBranchCode;
          userDetails.Result['BranchCode'] = branchData.BranchCode;
          userDetails.Result['CurrencyId'] = branchData?.CurrencyId;
          userDetails.Result['InsuranceId'] = branchData?.InsuranceId;
          sessionStorage.setItem('Userdetails', JSON.stringify(userDetails));
        }
        sessionStorage.setItem('typeValue','high');this.router.navigate(['/logincreation'])}
      else if(rowData.Code=='3'){sessionStorage.setItem('typeValue','high');this.quoteSection=true;this.approverSection=false;}
  }
  selectProduct(product) {
    this.selectedProduct = product.ProductId;
    let userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    userDetails.Result['ProductId'] = product.ProductId;
    userDetails.Result['ProductName'] = product.ProductName;
    userDetails.Result['PackageYn'] = product.PackageYn;
      sessionStorage.setItem('Userdetails', JSON.stringify(userDetails));
    console.log("Products",product,userDetails.Result)
    this.router.navigate(['/']);
  }
  getProductUrl(product){
      if(product.ProductId=='5') return './assets/layout/images/motor.png';
      else if(product.ProductId=='59') return './assets/layout/images/domestic.png';
      else if(product.ProductId=='57') return './assets/layout/images/group_pa.svg';
      else if(product.ProductId=='56') return './assets/layout/images/health.png';
      else if(product.ProductId=='6') return './assets/layout/images/fireAllied.png';
      else if(product.ProductId=='4') return './assets/layout/images/travel1.png';
      else if(product.ProductId=='1') return './assets/layout/images/Burglary1.png';
      else if(product.ProductId=='14') return './assets/layout/images/employers.png';
      else if(product.ProductId=='13') return './assets/layout/images/personalacc.png';
      else if(product.ProductId=='13') return './assets/layout/images/personalacc.png';
      else if(product.ProductId=='15') return './assets/layout/images/workmens.png';
      else if(product.ProductId=='2') return './assets/layout/images/All-risk.png';
      else if(product.ProductId=='19') return './assets/layout/images/corporate.webp';
      else if(product.ProductId=='32') return './assets/layout/images/fireAllied.png';
      else if(product.ProductId=='39') return './assets/layout/images/machinery.jpg';
      else if(product.ProductId=='42') return './assets/layout/images/Cyber.png';
      else if(product.ProductId=='43') return './assets/layout/images/Medical_Mal.png';
      else if(product.ProductId=='16') return './assets/layout/images/money.webp';
      else if(product.ProductId=='26') return './assets/layout/images/plantrisk.avif';
      else if(product.ProductId=='21') return './assets/layout/images/risk2.png';
      else if(product.ProductId=='25') return './assets/layout/images/electronicequipment.jpg';
      else if(product.ProductId=='27') return './assets/layout/images/publicliablity.png';
      else if(product.ProductId=='45') return './assets/layout/images/LifeIns.webp';
      else if(product.ProductId=='46') return './assets/layout/images/shortTerm.png';
      else if(product.productId=='59') return './assets/layout/images/marineOneOff.webp';
      else if(product.ProductId=='11') return './assets/layout/images/marineOpenCover.png';
      else if(product.ProductId=='60') return './assets/layout/images/ProIndeminity.png';
      else return './assets/layout/images/motor.png';
  }
  getUserTypeImage(rowData){
    if(rowData.Code=='1') return './assets/images/allQuotations.webp';
    else if(rowData.Code=='2') return './assets/images/UserCreation.jpg';
    else if(rowData.Code=='3') return './assets/images/Approval.jpg';
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
