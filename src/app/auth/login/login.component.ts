import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Message } from 'primeng/api';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { AuthService } from '../Auth/auth.service';
import * as Mydatas from '../../../../app-config.json';
import { LoginService } from './login.service';
import Swal from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';
import { AppComponent } from 'src/app/app.component';
import { SharedService } from 'src/app/shared/shared.service';
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [`
        
    `]
})
export class LoginComponent {
    messages: Message[] = [];
    password:string | undefined;
    password1:string | undefined;
    username:string | undefined;
    username1:string | undefined;
    password2:string | undefined;Email:any;username2:any;
    public AppConfig: any = (Mydatas as any).default;
    public ApiUrl1: any = this.AppConfig.ApiUrl1;
    public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
    userType: any;retrieveSection:boolean=false;mobileCodeList:any[]=[];
    branchList: any[];  forget: boolean=false; loginfirst:any=false;
    branchValue: any;errorSection:boolean=false;insuranceId:any=null
  messageText: any;pa:any;changePasswordSection: boolean;pass:any;
  temps: boolean;lang:any=null;branchselection: boolean=false;
  passExpiredError: boolean;mobileNo: any=null;mobileCode: any=null;
  customerDetails: any;
  otpValue: string;
  otpId: string;
  loginId: any;
  userDetails: any;
  CustomerReferenceNo: any;
  oaCode: any;
  OtpBtnEnable: boolean;
  OtpBtnTime: any;
  otpSection: boolean;
  otpGenerated: any;
  submitted: boolean;langList:any[]=[]
  messageTextLocal: any=null;
    constructor(public layoutService: LayoutService, private router: Router,private loginService:LoginService,
        private authService: AuthService,private translate: TranslateService,private appComp:AppComponent,private shared:SharedService) { 
          this.langList = [
            {"Code":"en","CodeDesc":"English","CodeDescPor":"Inglês","CodeDescFr":"Anglais"},
            {"Code":"po","CodeDesc":"Portuguese","CodeDescPor":"Português","CodeDescFr":"Portugais"},
            {"Code":"fr","CodeDesc":"French","CodeDescPor":"Francês","CodeDescFr":"Français"},
          ]
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
    setLanguage(value){
          this.lang=value;
          sessionStorage.setItem('language',value);
          this.appComp.setLanguage(value);
    }
    getTranslateName(value){
      return 'LOGIN.Signintocontinue'
    }
    getMobileCodeList() {
      let ReqObj = { "InsuranceId": this.insuranceId }
      let urlLink = `${this.CommonApiUrl}dropdown/mobilecodes`;
      this.loginService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
          if (data.Result) {
            let obj = [{ "Code": '', "CodeDesc": "-Select-" }]
            this.mobileCodeList = obj.concat(data.Result); 
            if(this.mobileCodeList.length!=0 && this.mobileCode==null){ 
              
              this.mobileCode = this.mobileCodeList.find(ele=>ele.CodeDesc=='255')?.Code;};  
          }
        },
        (err) => { },
      );
    }
    submit(val) {
        if(this.password && this.username) {
            let urlLink =  `${this.CommonApiUrl}authentication/login`;
            let ReqObj = {
                "LoginId":  this.username,
                "Password": this.password,
                "ReLoginKey": val
            }
            this.loginService.onPostMethodSync(urlLink, ReqObj).subscribe(
                (data: any) => {
                    this.messages = [];
                  let res: any = data;
                  console.log(data);
                  if (data.Result) {
                    const Token = data?.Result?.Token;
                    this.authService.login(data);
                    this.authService.UserToken(Token);
                    sessionStorage.setItem('Userdetails', JSON.stringify(data));
                    sessionStorage.setItem('UserToken', Token);
                    sessionStorage.setItem('menuSection', 'navMenu');
                    this.userType = data.Result.UserType;
                    if ((data.Result.UserType == 'Issuer' || data.Result.UserType == 'Broker' || data.Result.UserType == 'User') && data.Result.SubUserType!='SuperAdmin') {
                      let currencyId=data?.Result?.CurrencyId;
                      console.log('IIIIIIIIIIIIIIII',currencyId);
                      sessionStorage.setItem('CurrencyidLogin',currencyId);
                      this.router.navigate(['/auth/login/product']);
                      let branchList: any[] = data?.Result?.LoginBranchDetails;
                      if (branchList.length != 0 && branchList.length > 1) {
                        console.log("Entered Branch", branchList)
                        // this.router.navigate(['/branch']);
                        
                      }
                      else {
                        this.branchList = branchList;
                        // if (this.userType == 'Issuer') {
                        //   this.branchValue = branchList[0].BranchCode;
                        //   this.onBranchProceed();
                        // }
                        // else {
                        //   this.branchValue = branchList[0].BrokerBranchCode;
                        //   this.onBranchProceed();
                        // }
                      }
                    }
                    else{
                      this.router.navigate(['/auth/login/product']);
                    }
                  }
                  else  if (res?.ErrorMessage && res?.ErrorMessage.length > 0 || res?.Result?.ErrorMessage && res?.Result?.ErrorMessage.length > 0) {
                    const errorList: any[] = res.ErrorMessage || res?.Result?.ErrorMessage;
                    let ulList:any='';
                    let entry:any[] =  errorList.filter(ele=>ele.Field=='SessionError')
                        if(res.ChangePasswordYn=='Y'){
                          this.passExpiredError = true;
                          this.username1 = this.username;
                          this.Forget('change','ChangePassword');
                          this.changepass('ChangePassword')
                        }
                        else{
                          if(entry.length==0){
                            this.errorSection = false;
                            for (let index = 0; index < errorList.length; index++) {
                              const element = errorList[index];
                              this.messages.push({ severity: 'error', summary: 'Error', detail: element?.Message });
                             
                            }
                          }
                          else{
                            this.errorSection = true;
                             this.messageText = errorList[0].Message;
                             this.messageTextLocal = errorList[0].MessageLocal;
                          }
                        }
                  }
                },
                (err: any) => {
                  alert("Error")
                  // console.log(err);
                },
              );
            // this.messages = [{ severity: 'success', summary: 'Success', detail: 'Signin Successfull' }];
            // setTimeout(() => {
            //     this.router.navigate(['/auth/login/product']);
            // }, 2000);
        } else {
            this.messages = [{ severity: 'error', summary: 'Error', detail: 'Incorrect Credentials' }];
        }
    }
    getMessageText(){
      let lang =sessionStorage.getItem('language');
      if(lang=='en') return this.messageText;
      else return this.messageTextLocal;
    }
    getLangCodeDesc(entry){
      if(this.lang=='en') return entry.CodeDesc
      else if(this.lang=='po') return entry.CodeDescPor
      else if(this.lang=='fr') return entry.CodeDescFr
    }
    async onB2CNavigate(type){
      let urlLink = `${this.CommonApiUrl}authentication/doauth`
      let ReqObj = {
          "e":'kjIeGIM/2PWZlQUsLQBGq0uOWULX0QWRTSfk2dEbvBik/KTyszKentir1ZMEPiDD4ccgJA4xIW5Km9gKJ+DaeNJt0wornRee8Y+ohOoE2DiMJhNEV2QiwB8W7LxFFzGnt5+3eZt7jIeQM9ZbpCm6/U5emAvchppFSl+fHhFsY2ApKhnOdQyrL+jhC1QFOIhbJguJM8WzWFk80avvZEGedQZZM+ZzlwqZTm+/+1SnaGM4VBkPH7pBHbx+EoI7Rh7fejj+W/dEb0euc7wvAswDFjhUGQ8fukEdvH4SgjtGHt+ZE8Zk+f2/2Q=='
      };
      (await this.shared.onPostMethodUnAuthAsync(urlLink, ReqObj)).subscribe(
        (data: any) => {
          let res: any = data;
          console.log(data);
          if (data.Result) {
            if(data.AdditionalInfo){
              let details = data.AdditionalInfo;
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
                if(details.PageType=='RP'){
                  sessionStorage.setItem('QuoteStatus','AdminRP');
  
                }
                else if(details.PageType=='B2C'){
                    let branchList: any[] = data?.Result?.LoginBranchDetails;
                    if(branchList.length != 0){
                      this.branchList = branchList;
                      this.branchValue = branchList[0].BrokerBranchCode;
                      let branchData: any = this.branchList.find(ele => ele.BrokerBranchCode == this.branchValue);
                      let userDetails = JSON.parse(sessionStorage.getItem('Userdetails') as any);
                      userDetails.Result['ProductId'] = data.Result.BrokerCompanyProducts[0].ProductId;
                      userDetails.Result['ProductName'] = data.Result.BrokerCompanyProducts[0].ProductName;
                      userDetails.Result['BrokerBranchCode'] = this.branchValue;
                      userDetails.Result['BranchCode'] = branchData.BranchCode;
                      userDetails.Result['CurrencyId'] = branchData?.CurrencyId;
                      userDetails.Result['InsuranceId'] = branchData?.InsuranceId;
                      userDetails.Result['LoginType'] = 'B2CFlow';
                      sessionStorage.setItem('b2cType','guest')
                      sessionStorage.setItem('Userdetails', JSON.stringify(userDetails));
                      sessionStorage.removeItem('customerReferenceNo');
                     if(type=='direct') this.router.navigate(['/customerProducts']);
                     else{this.getMobileCodeList();}
                    }
                }
                this.router.navigate([details?.RouterLink]);
              }
            }
          }
          else if(data.ErrorMessage){
              // if(data.ErrorMessage.length!=0){
              //   this.errorSection = true;
              //   this.errorList = data.ErrorMessage;
              // }
          }
        },
        (err: any) => {
          alert("Error")
          // console.log(err);
        },
      );
    }
    onRetrieveQuote(){
        this.username=null;this.password=null;this.mobileCode='255';this.mobileNo='';
        this.retrieveSection=true;this.errorSection=false;this.changePasswordSection=false;this.forget=false;
    }
    cancel(v){
      this.mobileCode='255';this.mobileNo = null;this.username=null;this.password=null;
      this.errorSection=false;this.retrieveSection=false;
      this.changePasswordSection=false;this.forget=false;
    }
    forgetSubmit(){
      const urlLink = `${this.CommonApiUrl}api/forgotpassword`;
      // const formData = this.ForgetForm.value;
  
      const reqData = {
          EmailId: this.Email,
          LoginId: this.username2
      };
  
      this.loginService.onPostMethodBasicSync(urlLink, reqData).subscribe(
        (data: any) => {
          let res: any = data;
          console.log(data);
          if (data.Result) {
            Swal.fire({
              title: '<strong>Forget Password </strong>',
              icon: 'info',
              html:
                `Temporary Password Notification Sent to <span class='text-success'>${this.Email}</span>`,
              showCancelButton: false,
              cancelButtonColor: '#d33',
              cancelButtonText: 'Okay',
            })
            // this.ForgetForm.reset();
            //this.loginForm.reset();
            //this.loginSection = false;
            this.username2=null;this.Email=null;
           this.changePasswordSection = true;
           this.forget = false;
           this.loginfirst = true;
            this.temps=true;
          }
          if (res?.ErrorMessage && res?.ErrorMessage.length > 0 || res?.Result?.ErrorMessage && res?.Result?.ErrorMessage.length > 0) {
            const errorList: any[] = res.ErrorMessage || res?.Result?.ErrorMessage;
            let ulList:any='',fieldLocalName:any=null;
            let entry:any[] =  errorList.filter(ele=>ele.Field=='SessionError')
            for (let index = 0; index < errorList.length; index++) {
              
              const element = errorList[index];
              if(element.Field=='SessionError' && element.FieldLocal!=null && element.FieldLocal!='') fieldLocalName = element.FieldLocal;
               ulList +=`<li class="list-group-login-field">
                 <div style="color: darkgreen;">Field<span class="mx-2">:</span>${this.getFieldLang(element?.Field,element?.FieldLocal)}</div>
                 <div style="color: red;">Message<span class="mx-2">:</span>${this.getFieldLang(element?.Message,element?.MessageLocal)}</div>
               </li>`
            }
            if(entry.length==0){
                Swal.fire({
                title: '<strong>Form Validation</strong>',
                icon: 'info',
                html:
                  `<ul class="list-group errorlist">
                    ${ulList}
                </ul>`,
                showCloseButton: true,
                focusConfirm: false,
                confirmButtonText:
                  '<i class="fa fa-thumbs-down"></i> Errors!',
                confirmButtonAriaLabel: 'Thumbs down, Errors!',
              })
            }
            else {
              console.log("entered multiiiiiiiiiiiiiiiiiiii");
              Swal.fire({
                  title: `<strong>${this.getSessionErrorName(fieldLocalName)}</strong>`,
                  icon: 'info',
                  html:
                    `<ul class="list-group errorlist">
                    ${ulList}
                </ul>`,
                  showCloseButton: true,
                  focusConfirm: false,
                  showCancelButton:true,
  
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: `Proceed Login!`,
                cancelButtonText: 'Cancel',
              })
              .then((result) => {
                if (result.isConfirmed) {
                // this.loginSection=false;
                this.submit('Y');
                this.username2=null;this.Email=null;
              }
  
              });
  
            }
          }
  
        },
        (err: any) => {
          alert("Error")
          // console.log(err);
        },
      );
  
    }
    getSessionErrorName(value){
      if(this.lang=='en') return `Session Error`;
      else return value;
    }
    getFieldLang(val1,val2){
      if(this.lang=='en') return val1;
      else return val2;
    }
    onsubmit() {
      let p=this.pa
      if(this.password2!=this.password1){
        const urlLink = `${this.CommonApiUrl}api/changepassword`;
        const reqData = {
          "LoginId": this.username1,
          "NewPassword": this.password1,
          "OldPassword": this.password2,
          "Type":this.pa
        };
        this.loginService.onPostMethodBasicSync(urlLink, reqData).subscribe(
          (data: any) => {
            let res: any = data;
            console.log(data);
            if (data.Result) {
              Swal.fire({
                title: '<strong>Change Password </strong>',
                icon: 'info',
                html:
                  `Password Updated Successfully`,
                //showCloseButton: true,
                //focusConfirm: false,
                showCancelButton: false,
  
                //confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                cancelButtonText: 'Cancel',
              })
              // this.changeForm.reset();
              // this.loginForm.reset();
              // this.loginSection = false;
              this.loginfirst = false;
              this.forget = false;
              this.changePasswordSection = false;
            }
            else  if (res?.ErrorMessage && res?.ErrorMessage.length > 0 || res?.Result?.ErrorMessage && res?.Result?.ErrorMessage.length > 0) {
              const errorList: any[] = res.ErrorMessage || res?.Result?.ErrorMessage;
              let ulList:any='',fieldLocalName:any=null;
               let entry:any[] =  errorList.filter(ele=>ele.Field=='SessionError')
               console.log("checked entry",entry);
                  for (let index = 0; index < errorList.length; index++) {
                  
                    const element = errorList[index];
                    if(element.Field=='SessionError' && element.FieldLocal!=null && element.FieldLocal!='') fieldLocalName = element.FieldLocal;
                    ulList +=`<li class="list-group-login-field">
                      <div style="color: darkgreen;">Field<span class="mx-2">:</span>${this.getFieldLang(element?.Field,element?.FieldLocal)}</div>
                      <div style="color: red;">Message<span class="mx-2">:</span>${this.getFieldLang(element?.Message,element?.MessageLocal)}</div>
                    </li>`
                  }
                 if(entry.length==0){
                    Swal.fire({
                     title: '<strong>Form Validation</strong>',
                     icon: 'info',
                     html:
                       `<ul class="list-group errorlist">
                        ${ulList}
                     </ul>`,
                     showCloseButton: true,
                     focusConfirm: false,
                     confirmButtonText:
                       '<i class="fa fa-thumbs-down"></i> Errors!',
                     confirmButtonAriaLabel: 'Thumbs down, Errors!',
                   })
                 }
            }
          });
      }
      else{
        console.log('pppppp',p)
        if(p){
          if( p =='ChangePassword' && this.password2=='' || this.password2==null || this.password2 == undefined){
            Swal.fire({
              title: '<strong>Form Validation</strong>',
              icon: 'info',
              html:
                `<ul class="list-group errorlist">
                    <li class="list-group-login-field">
                      <div style="color: darkgreen;">Field<span class="mx-2">:</span>Old Password</div>
                      <div style="color: red;">Message<span class="mx-2">:</span>Please Enter Old Password</div>
                    </li>
                </ul>`,
              showCloseButton: true,
              focusConfirm: false,
              confirmButtonText:
                '<i class="fa fa-thumbs-down"></i> Errors!',
              confirmButtonAriaLabel: 'Thumbs down, Errors!',
            })
          }
          else if(p =='ForgotPassword' && this.password2=='' || this.password2==null || this.password2 == undefined){
            Swal.fire({
              title: '<strong>Form Validation</strong>',
              icon: 'info',
              html:
                `<ul class="list-group errorlist">
                <li class="list-group-login-field">
                  <div style="color: darkgreen;">Field<span class="mx-2">:</span>Temporary Password</div>
                  <div style="color: red;">Message<span class="mx-2">:</span>Please Enter Temporary Password</div>
               </li>
              </ul>`,
              showCloseButton: true,
              focusConfirm: false,
              confirmButtonText:
                '<i class="fa fa-thumbs-down"></i> Errors!',
              confirmButtonAriaLabel: 'Thumbs down, Errors!',
            })
          }
          if( p =='ChangePassword' && this.password2 == this.password1){
            Swal.fire({
              title: '<strong>Form Validation</strong>',
              icon: 'info',
              html:
                `<ul class="list-group errorlist">
                <li class="list-group-login-field">
                  <div style="color: darkgreen;">Field<span class="mx-2">:</span>Password Details</div>
                  <div style="color: red;">Message<span class="mx-2">:</span>New Password cannot Be same as Old Password</div>
               </li>
              </ul>`,
              showCloseButton: true,
              focusConfirm: false,
              confirmButtonText:
                '<i class="fa fa-thumbs-down"></i> Errors!',
              confirmButtonAriaLabel: 'Thumbs down, Errors!',
            })
          }
        }
  
        else if(this.password1=='' || this.password1==null || this.password1 == undefined){
          Swal.fire({
            title: '<strong>Form Validation</strong>',
            icon: 'info',
            html:
              `<ul class="list-group errorlist">
              <li class="list-group-login-field">
                <div style="color: darkgreen;">Field<span class="mx-2">:</span>New Password</div>
                <div style="color: red;">Message<span class="mx-2">:</span>Please Enter New Password</div>
             </li>
            </ul>`,
            showCloseButton: true,
            focusConfirm: false,
            confirmButtonText:
              '<i class="fa fa-thumbs-down"></i> Errors!',
            confirmButtonAriaLabel: 'Thumbs down, Errors!',
          })
        }
        else{
          Swal.fire({
            title: '<strong>Form Validation</strong>',
            icon: 'info',
            html:
              `<ul class="list-group errorlist">
              <li class="list-group-login-field">
                <div style="color: darkgreen;">Field<span class="mx-2">:</span>Mismatch Password</div>
                <div style="color: red;">Message<span class="mx-2">:</span>Old Password Cannot Be New Password</div>
             </li>
            </ul>`,
            showCloseButton: true,
            focusConfirm: false,
            confirmButtonText:
              '<i class="fa fa-thumbs-down"></i> Errors!',
            confirmButtonAriaLabel: 'Thumbs down, Errors!',
          })
        }
  
      }
    }
    onsubmitMobileLogin(){
      sessionStorage.setItem('mobLogin',this.mobileNo);
      this.onLogin();
      
    }
    resetForm(){
      this.username=null;this.password=null;this.password1=null;
      this.username1=null;
      this.password2=null;
    }
    onCancelLogin(){
      this.username=null;this.password=null;
      this.errorSection=false;this.messages=[];
    }
    onBranchProceed() {
       
    }
    Forget(type,change){

      console.log(change)
      this.pa=change
        if(type=='change') {this.changePasswordSection = true;this.forget=false;this.loginfirst=true;this.errorSection=false}
        else  {this.changePasswordSection = false;this.forget=true;this.loginfirst=false;this.errorSection=false}
  
        if(change=='ChangePassword'){
          this.pass=true;
        }
        else if(change=='ForgotPassword'){
          this.pass=false;
        }
    }
    changepass(type){

      console.log(type)
      this.pa=type;
      if(type=='ChangePassword'){
        this.pass=true;
      }
      else{
      this.pass=false;
      }
  
    }


    onLogin() {
      this.submitted = true;
      let searchValue = "";
      let mobileCode = ""; let mobileNumber = "";
      let token = sessionStorage.getItem('UserToken');
     // const formData = this.customerDetails;
      // if(formData.mobileCode !=null){
      //   this.mobileCodeDesc = this.mobileCodeList.find(ele=>ele.Code==formData?.mobileCode).CodeDesc;
      // }
      let reqObj = {
        "CompanyId":'100002',
        "ProductId": '5',
        "LoginId": 'guest',
        "TemplateName":null,
        "OtpUser": {
          "UserMailId": null,
          "UserMobileNo":this.mobileNo,
          "UserMobileCode": this.mobileCode,
          "UserWhatsappNo": this.mobileNo,
          "UserWhatsappCode": this.mobileCode,
          "CustomerName": this.mobileNo
        }
      }
      let url = `${this.CommonApiUrl}otp/generate`;
      try {
        this.shared.onPostMethodSync(url, reqObj).subscribe((data: any) => {
        console.log("Otp Generate Res", data);
        if (data.Errors) {
          this.otpSection = false;
          this.otpGenerated = null;
          let element = '';
          for (let i = 0; i < data.Errors.length; i++) {
            element += '<div class="my-1"><i class="far fa-dot-circle text-danger p-1"></i>' + data.Errors[i].Message + "</div>";
          }
        Swal.fire(
          'Please Fill Valid Value',
          `${element}`,
          'error',
          )
        }
        else {
          
           this.otpId = data.OtpToken;
           this.otpGenerated = data.OTP;
           this.loginfirst = true;
          this.otpSection = true;
          this.OtpBtnEnable = true;
          this.setTimeInterval();
        }
        }, (err) => {
        console.log(err);
        })
       } catch (error) {
      }
    }
    setTimeInterval() {
  
      var count = 15,
        timer = setInterval(() => {
          var seconds = (count--) - 1;
          var percent_complete = (seconds / 60) * 100;
          percent_complete = Math.floor(percent_complete);
  
          this.OtpBtnTime = count;
          if (seconds == 0) {
            clearInterval(timer);
            this.OtpBtnEnable = false;
            this.OtpBtnTime = '';
          }
        }, 1000);
      }
      onOtpValidate() {
  
        if (this.otpValue == "" || this.otpValue == undefined || this.otpValue == null) {
          let element = '<div class="my-1"><i class="far fa-dot-circle text-danger p-1"></i>Please Enter OTP</div>';
          Swal.fire(
          'Please Fill Valid Value',
          `${element}`,
          'error',
          )
        }
        else {
          this.otpValue = this.otpValue.replace(/\D/g, '');
          let reqObj = {
          "CompanyId": '100002',
          "ProductId":"5",
          "AgencyCode": this.oaCode,
          "OtpToken": this.otpId,
          "UserOTP": this.otpValue,
          "CreateUser": true,
          "CustomerId": this.CustomerReferenceNo,
          "ReferenceNo": sessionStorage.getItem('quoteReferenceNo') 
          }
          let url = `${this.CommonApiUrl}otp/validate`;
          try {
          this.shared.onPostMethodSync(url, reqObj).subscribe((data: any) => {
            console.log("Otp Generate", data);
            if (data) {
            if (data.Errors) {
              let element = '';
              for (let i = 0; i < data.Errors.length; i++) {
              element += '<div class="my-1"><i class="far fa-dot-circle text-danger p-1"></i>' + data.Errors[i].Message + "</div>";
              }
              Swal.fire(
              'Please Fill Valid Value',
              `${element}`,
              'error',
              )
            }
            else {
              this.otpId = "";
              this.otpValue = "";
              this.onGuestLogin(data)
             
            }
            }
          }, (err) => {
          })
          } catch (error) {
          }
        }
      }
  
      onGuestLogin(data){
        this.otpId = "";
        this.otpValue = "";
        let loginId=this.customerDetails.MobileCode1+this.customerDetails.MobileNo1
        this.loginId = loginId;
        const Token = data?.LoginResponse?.Result?.Token;
        this.authService.login(data.LoginResponse);
        this.authService.UserToken(Token);
        data.LoginResponse.Result['LoginType'] = 'B2CFlow';
        sessionStorage.setItem('Userdetails', JSON.stringify(data.LoginResponse));
        sessionStorage.setItem('UserToken', Token);
        sessionStorage.setItem('menuSection', 'navMenu');
        sessionStorage.removeItem('b2cType')
        let userDetails = JSON.parse(sessionStorage.getItem('Userdetails') as any);
        userDetails.Result['ProductId'] = '5'
        userDetails.Result['ProductName'] = 'Motor';
        userDetails.Result['BrokerBranchCode'] = data.LoginResponse?.Result?.LoginBranchDetails[0].BrokerBranchCode;
        userDetails.Result['BranchCode'] = this.branchValue;
        userDetails.Result['CurrencyId'] = this.userDetails.Result.CurrencyId;
        userDetails.Result['InsuranceId'] = this.insuranceId;
        sessionStorage.setItem('Userdetails', JSON.stringify(userDetails));
        sessionStorage.setItem('resetLoginDetails','true');
       // this.onProceedBuyPolicy();
      }
}
