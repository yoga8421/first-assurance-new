import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { SharedService } from '../service/shared.service';
import * as Mydatas from '../app-config.json';


@Component({
  selector: 'app-customer-add-info',
  templateUrl: './customer-add-info.component.html',
  styleUrls: ['./customer-add-info.component.scss']
})
export class CustomerAddInfoComponent implements OnInit {
quoteNo: any = null; quoteRefNo: any = null; userDetails: any = null;
minDate: any = null; loginId: any = null; userType: any = null; agencyCode: any = null;
branchCode: any = null; countryId: any = null; brokerbranchCode: any = null; adminSection: boolean = false;
productId: any = null; PackageYn: any = null; insuranceId: any = null; modelSearchVisible: boolean = false;
branchList: any = null; loginType: any = null; lang: any = null; mobileCodeList: any[] = []; statusValue: any = null;
selectedRowData: any = null; modelColumns: any[] = []; modelList: any[] = []; modelDesc: any = null;
endorseAddOnCovers: boolean = false; enableAddVehicle: boolean = false; endorseSIModification: boolean = false;
tabIndex: any = 0; endorsementSection: boolean = false; endorseCovers: boolean = false; finalizeYN: any = 'N';
premumSection: boolean = false; mobileCode: any = "+254"; vehicleDetailsList: any[] = []; selectedCoverList: any[] = [];
localPremiumCost: any = 0; totalPremium: any = 0; vehicleData: any[] = []; emiYN: any = null; emiPeriod: any = null;
coverModificationYN: any = null; vehicleSI: any = "0"; makeList: any[] = []; fuelType: any = null; grossWeight: any = null;
customerReferenceNo: any = null; modelValue: any = null; makeValue: any = null; tareWeight: any = null; engineCapacity: any = null;
individualCalcIndex:  any; bodyTypeValue: any = null; customerDetails: any;
adminRemarks: any;
currencyCode: any;
endorsementId:  any;
endorseEffectiveDate: any;
enableFieldsList: any;
isMannualReferal: any = 'N'; subuserType: any = null;
coverSection:  any; genderList: any[] = []; typeList: any[] = [];
selectedVehicleList: any[]=[]  ; make: any = null; insuranceTypeList: any[] = [];
rejectedReason: any; vehicleClass: any = null; yearList: any[] = []; bodyTypeId: any = null;
public AppConfig: any = (Mydatas as any).default;
public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
public ApiUrl1: any = this.AppConfig.ApiUrl1;
public customApiUrl1: any = this.AppConfig.CustomApiUrl1;
public motorApiUrl: any = this.AppConfig.MotorApiUrl;
endorseCoverModification: any; customerName: any = null; insuranceType: any = null;
policyEndDate: any; mobileNo: any = null; manufactureYear: any = null;
policyStartDate: any; gender: any = null; claimExperience: any = null; vehicleClassList: any[] = [];
emipolicytype: any; insuredDob: any = null; licenseExperience: any = null; modelHeader: any[] = [];
noOfAxels:  any; factorViewList: any[] = []; factorPremiumDetails: any; factorDetailModal: boolean = false;
axelDistance:  any; windScreenSI: any = null; AccessoriesSI: any = null;
editSectionAlt:  any;
sourceType: any;
Code: any;
customerCode: any;
brokerCode: any;
vehicleDetails: any;
emistatus: any;
newcoverlist: any[] = []; coverlist: any[] = [];
claimExperienceList: any[] = [];
dobDate: Date;
customerNameError: boolean = false;
mobileCodeError: boolean = false;
genderError: boolean = false;
insuredDobError: boolean = false;
licenseExperienceError: boolean = false;
claimExperienceError: boolean = false;
manufactureYearError: boolean = false;
insuranceTypeError: boolean = false;
vehicleClassError: boolean = false;
makeValueError: boolean = false;
modelDescError: boolean = false;
vehicleSIError: boolean = false;
MinimumPremium: any;
premiumExcluedTax: any;
premiumIncluedTax: any;
dependantTaxList: any[] = [];
taxList: any[] = [];
premiumBeforeTax: any;
proRataPercent: any;
premiumAfterDiscount: any; emiSection: boolean = false;
discountDetailModal: boolean = false;
excessDetailModal: boolean = false;
registerNumberError: boolean = false;
registerNumber: any = null;
yearlySection: boolean = false; nineMonthSection: boolean = false; sixMonthSection: boolean = false; threeMonthSection: boolean = false; fiveMonthSection: boolean = false; eightMonthSection: boolean = false;
EmiDetails: any[] = [];
Emilist1: any[] = [];
motorUsageList: any[] = [];
motorUsageValue: any;
quoteStatus: string;
remarks: any;
customerSearchvisible: boolean = false;
searchLengthSection: boolean = false;
searchList: any[] = [];
subUserType: any;
searchValue: any;
position: string = 'top';
sampleCustomerCode: any;
sampleCustomerName: any;
encryptedValue: string;
shared: any;
authService: any;
userdetails: any;


constructor(private appComp: AppComponent, private sharedService: SharedService,
  private datePipe: DatePipe, private router: Router) {
  this.minDate = new Date();
  let d = new Date(this.minDate)
  var year = d.getFullYear();
  var month = d.getMonth();
  var day = d.getDate();
  this.dobDate = new Date(year - 18, month, day);
  this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
  console.log("UserDetails", this.userDetails);
  this.loginId = this.userDetails.Result.LoginId;
  this.userType = this.userDetails?.Result?.UserType;
  this.agencyCode = this.userDetails.Result.OaCode;
  this.branchCode = this.userDetails.Result.BranchCode;
  this.countryId = this.userDetails.Result.CountryId;
  this.brokerbranchCode = this.userDetails.Result.BrokerBranchCode;
  this.productId = '5';
  this.PackageYn = this.userDetails.Result.PackageYn
  this.insuranceId = this.userDetails.Result.InsuranceId;
  this.branchList = this.userDetails.Result.LoginBranchDetails;
  this.loginType = this.userDetails.Result.LoginType;
  this.currencyCode = this.userDetails.Result.CurrencyId;
  this.quoteRefNo = sessionStorage.getItem('quoteReferenceNo');
  this.quoteNo = sessionStorage.getItem('quoteNo');
  this.quoteStatus = sessionStorage.getItem('QuoteStatus');
  if (sessionStorage.getItem('newQuote')) {
    // this.router.navigate(['/quotation'])
  }
  let loginType = this.userDetails.Result.LoginType;
  this.modelColumns = ['Select', 'Model', 'Body Type', 'Fuel Type', 'Transmission', 'WeightKg'];
  this.claimExperienceList = [
    { 'Code': '0', 'CodeDesc': '0' },
    { 'Code': '1', 'CodeDesc': '1' },
    { 'Code': '2', 'CodeDesc': '2' },
    { 'Code': '3', 'CodeDesc': '3' },
    { 'Code': '4+', 'CodeDesc': '4+' },
  ];
  this.getGenderList();
  this.yearList = this.getYearList();
  this.getInsuranceTypeList();
  if (this.insuranceId == '100020') this.getVehicleClassList();
  this.getMakeList();
}
ngOnInit() {
  let referenceNo = sessionStorage.getItem('quoteReferenceNo');
  if (referenceNo) {
    this.quoteRefNo = referenceNo;
    sessionStorage.setItem('quoteType', 'ShortQuote');
    this.getMotorDetails(null);
    let customerNo = sessionStorage.getItem('customerReferenceNo');
    if (customerNo) {
      this.customerReferenceNo = customerNo;
      this.getCustomerDetails(customerNo);
    }
  }
  else {
    this.quoteRefNo = null; sessionStorage.setItem('quoteType', 'ShortQuote');
    this.getMotorUsageList(null, 'direct')
  }
 
}

getFuelTypeList() {
  throw new Error('Method not implemented.');
}
getClaimTypeList() {
  throw new Error('Method not implemented.');
}
getOccupationList() {
  throw new Error('Method not implemented.');
}
getMobileCodeList() {
  throw new Error('Method not implemented.');
}


getCustomerDetails(refNo:any) {
  let ReqObj = {
    "CustomerReferenceNo": refNo
  }
  let urlLink = `${this.CommonApiUrl}api/getcustomerdetails`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      console.log(data);
      if (data.Result) {
        let customerDetails: any = data.Result;
        this.customerDetails = customerDetails;
        sessionStorage.setItem('customerDetails', JSON.stringify(this.customerDetails));
        this.customerName = this.customerDetails?.ClientName;
        this.mobileCode = this.customerDetails?.MobileCode1;
        this.mobileNo = this.customerDetails?.MobileNo1;

      }
    });
}
getMotorDetails(index:any) {
  let ReqObj = {
    "RequestReferenceNo": this.quoteRefNo,
    "Idnumber": null,
    "Vehicleid": "1"
  }
  let urlLink = `${this.motorApiUrl}api/getmotordetails`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      if (data.Result) {
        this.vehicleDetails = data.Result;
        this.gender = this.vehicleDetails?.DriverDetails?.Gender;
        if (this.vehicleDetails?.DriverDetails?.DriverDob) {
          let dateList = this.vehicleDetails?.DriverDetails?.DriverDob.split('/');
          this.insuredDob = this.vehicleDetails?.DriverDetails?.DriverDob;
        }
        if (this.vehicleDetails?.DriverDetails?.DriverExperience != null && this.vehicleDetails?.DriverDetails?.DriverExperience != 0) {
          let val = Number(this.vehicleDetails?.DriverDetails?.DriverExperience);
          let d = new Date();
          var year = d.getFullYear();
          this.licenseExperience = year - val;
        }

        if (this.vehicleDetails?.DriverDetails?.ClaimExperience) this.claimExperience = String(this.vehicleDetails?.DriverDetails?.ClaimExperience);
        else this.claimExperience = null;
        this.manufactureYear = this.vehicleDetails?.ManufactureYear;
        this.insuranceType = this.vehicleDetails.InsuranceClass;
        this.vehicleClass = this.vehicleDetails?.VehicleClass;
        this.makeValue = this.vehicleDetails?.Vehiclemake;
        this.modelDesc = this.vehicleDetails?.VehicleModelDesc;
        this.modelValue = this.vehicleDetails?.Vehcilemodel;
        this.registerNumber = this.vehicleDetails?.Registrationnumber;
        this.onMakeAltChange('direct', this.modelValue);
        if (this.vehicleDetails.SumInsured) { this.vehicleSI = String(this.vehicleDetails.SumInsured); this.CommaFormatted() }
        if (this.vehicleDetails.AcccessoriesSumInsured) { this.AccessoriesSI = String(this.vehicleDetails.AcccessoriesSumInsured); this.CommaAccFormatted() }
        if (this.vehicleDetails.WindScreenSumInsured) { this.windScreenSI = String(this.vehicleDetails.WindScreenSumInsured); this.CommaWindFormatted() }
        this.onInsuranceClassChange('direct', null)
        this.getMotorUsageList(this.vehicleDetails?.Motorusage, 'direct')
      }
    });
}
checkFieldNames() {

}
getMotorUsageList(vehicleValue:any, type:any) {
  let sectionId = null;
  //this.productItem.MotorUsage = this.motorUsageValue;

  let ReqObj = {
    "InsuranceId": this.insuranceId,
    "SectionId": "10",
    "BranchCode": this.branchCode,

  }

  let urlLink = `${this.CommonApiUrl}api/dropdown/vehicleusage`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      console.log(data);
      if (data.Result) {
        this.motorUsageList = data.Result;
        if (this.motorUsageList.length != 0) {
          let defaultObj = [{ 'label': '---Select---', 'value': '', 'Code': null, 'CodeDesc': '---Select---', 'CodeDescLocal': '--Sélectionner--' }];
          for (let i = 0; i < this.motorUsageList.length; i++) {
            this.motorUsageList[i].label = this.motorUsageList[i]['CodeDesc'];
            this.motorUsageList[i].value = this.motorUsageList[i]['Code'];
            if (i == this.motorUsageList.length - 1) {
              if (vehicleValue == null && type != 'direct') {
                this.motorUsageValue = '';
              }
              else {
                let entry = this.motorUsageList.find(ele => ele.Code == vehicleValue || ele.CodeDesc == this.vehicleDetails.MotorUsageDesc);
                if (entry) { this.motorUsageValue = entry.Code }
              }
            }
          }
        }
        this.motorUsageValue = vehicleValue;
        // if(vehicleValue==null && type!='direct'){
        //   this.productItem.MotorUsage = null;
        //   console.log(this.fields)
        // }
        // else{
        //   this.productItem.MotorUsage = this.vehicleDetails.Motorusage;
        // }
        if (this.vehicleDetails && this.motorUsageList.length != 0 && this.motorUsageValue == null) {
          let value = this.motorUsageList.find(ele => ele.CodeDesc == this.vehicleDetails?.Motorusage || ele.Code == this.vehicleDetails?.Motorusage);
          if (value) {
            this.motorUsageValue = value.Code;
          }
          else this.motorUsageValue = this.vehicleDetails.Motorusage;
        }
        // if(this.motorDetails){
        //   let value = this.motorTypeList.find(ele=>ele.CodeDesc == this.motorDetails?.Motorusage);
        //   if(value){ this.motorUsageValue = value.Code}
        // }

        //this.getMotorUsageList();
      }

    },
    (err:any) => { },
  );
}
getVehicleClassList() {
  let ReqObj = {
    "InsuranceId": this.insuranceId,
    "BranchCode": this.branchCode
  }
  let urlLink = `${this.CommonApiUrl}dropdown/vehicleclasses`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      console.log(data);
      if (data.Result) {
        let defaultObj = [{ 'label': '---Select---', 'value': '', 'Code': '', 'CodeDesc': '---Select---', 'CodeDescLocal': '--Sélectionner--' }];
        this.vehicleClassList = defaultObj.concat(data.Result);

      }
    },
    (err:any) => { },
  );
}
getMakeList() {
  let ReqObj = {
    "InsuranceId": this.insuranceId,
    "ProductId": this.productId
  }
  let urlLink = `${this.motorApiUrl}api/vehiclemakedetails`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      console.log(data);
      if (data.Result) {
        this.makeList = data.Result;
      }
    });
}
getGenderList() {
  let ReqObj = {
    "InsuranceId": this.insuranceId,
    "BranchCode": this.branchCode,
  }
  let urlLink = `${this.CommonApiUrl}dropdown/policyholdergender`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      console.log(data);
      if (data.Result) {
        let defaultRow = [{ 'label': '---Select---', 'value': '', 'Code': '', 'CodeDesc': '---Select---', 'CodeDescLocal': '--Sélectionner--' }];
        this.genderList = defaultRow.concat(data.Result);
        //this.fields[0].fieldGroup[0].fieldGroup[0].fieldGroup[2].props.options = defaultRow.concat(this.genderList);

      }
    },
    (err:any) => { },
  );
}
getYearList() {
  var d = new Date();

  var year = d.getFullYear();
  var month = d.getMonth();
  var day = d.getDate();
  const currentYear = new Date().getFullYear() - 35, years = [];
  while (year >= currentYear) {
    let yearEntry = year--
    years.push({ "Code": String(yearEntry), "CodeDesc": String(yearEntry) });
  }
  return years;
}
getInsuranceTypeList() {
  let ReqObj = null, urlLink = null;
  ReqObj = {
    "InsuranceId": this.insuranceId,
    "ProductId": this.productId,
    "BranchCode": this.branchCode,
    "LoginId": this.loginId
  }
  urlLink = `${this.ApiUrl1}master/dropdown/policytype`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      if (data.Result) {
        this.typeList = data.Result;
        if (this.typeList.length != 0) {
          let defaultObj = [{ 'label': '---Select---', 'value': '', 'Code': '', 'CodeDesc': '---Select---', 'CodeDescLocal': '--Sélectionner--' }];
        }
      }
    });
}
onInsuranceClassChange(type:any, value:any) {
  if (this.insuranceType != '1' && this.insuranceType != 1 && this.insuranceType != '2' && this.insuranceType != 2) this.vehicleSI = "1";
}
onMakeAltChange(type:any, modelValue:any) {
  let ReqObj = {
    "InsuranceId": this.insuranceId,
    "ProductId": this.productId,
    "MakeId": this.makeValue
  }
  let urlLink = `${this.motorApiUrl}api/vehiclemodeldetails`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      if (data.Result) {
        this.modelList = data.Result;
        this.modelHeader = [
          {
            key: 'action',
            display: 'Select',
            config: { select: true },
          },
          { key: 'Model', display: 'Model' },
          { key: 'BodyType', display: 'Body Type' },
          { key: 'FuelType', display: 'Fuel Type' },
          { key: 'TransmissionType', display: 'Transmission' },
          { key: 'WeightKg', display: 'WeightKg' },
        ];
        if (type == 'direct') {
          let entry = this.modelList.find(ele => ele.ModelId == modelValue);
          if (entry) {
            let otherList = this.modelList.filter(ele => ele.ModelId != modelValue);
            this.modelList = [entry].concat(otherList);
            this.modelDesc = entry?.Model;
            this.selectedRowData = entry;
            this.modelValue = this.selectedRowData?.ModelId;
            this.bodyTypeId = this.selectedRowData?.BodyTypeId;
            this.fuelType = this.selectedRowData.FuelType;
            this.grossWeight = this.selectedRowData.WeightKg;
            this.tareWeight = this.selectedRowData.WeightKg;
            this.modelDesc = this.selectedRowData?.Model;
            this.engineCapacity = this.selectedRowData?.EnginesizeCc;
            this.noOfAxels = '1';
            this.axelDistance = '1';
            this.editSectionAlt = true;
            this.modelSearchVisible = false;
            this.onCheckPremium();
          }
        }
        else {
          this.modelDesc = null;
          this.modelValue = null;
          this.bodyTypeId = null;
          this.fuelType = null;
          this.grossWeight = null;
          this.tareWeight = null;
          this.engineCapacity = null;
          this.bodyTypeValue = null;
        }
      }
    },
    (err:any) => { },
  );
}
onViewModelList(type:any, value:any, modal:any) {
  this.modelSearchVisible = true;
}
onSelectModel(rowData:any) {
  if (rowData) {
    this.selectedRowData = rowData;
  }
}
onCheckModelChecked(rowData){
  if(this.modelDesc!='' && this.modelDesc!=null && this.modelDesc!=undefined) return (this.modelDesc==rowData.Model) ;
  else return false;
}
onSaveModelDetails() {
  if (this.selectedRowData) {
    this.modelValue = this.selectedRowData?.ModelId;
    this.bodyTypeId = this.selectedRowData?.BodyTypeId;
    this.fuelType = this.selectedRowData.FuelType;
    this.grossWeight = this.selectedRowData.WeightKg;
    this.tareWeight = this.selectedRowData.WeightKg;
    this.modelDesc = this.selectedRowData?.Model;
    this.engineCapacity = this.selectedRowData?.EnginesizeCc;
    this.noOfAxels = '1';
    this.axelDistance = '1';
    this.editSectionAlt = true;
    this.modelSearchVisible = false;
  }
}
onVehicleValueChange(args) {
  if (args.key === 'e' || args.key === '+' || args.key === '-') {
    return false;
  } else {
    return true;
  }
}
CommaFormatted() {
  // format number
  if (this.vehicleSI) {
    this.vehicleSI = this.vehicleSI.replace(/[^0-9.]|(?<=\..*)\./g, "")
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
}
CommaAccFormatted() {
  if (this.AccessoriesSI) {
    this.AccessoriesSI = this.AccessoriesSI.replace(/[^0-9.]|(?<=\..*)\./g, "")
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
}
CommaWindFormatted() {
  if (this.windScreenSI) {
    this.windScreenSI = this.windScreenSI.replace(/[^0-9.]|(?<=\..*)\./g, "")
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
}
onCheckPremium() {
  let startDate = null, endDate = null, appId = null, loginId = null, brokerbranchCode = null, makeDesc = null, usageDesc = null;
  if (this.vehicleClass != null && this.vehicleClass != '') {
    let id = this.vehicleClassList.find(ele => ele.Code == this.vehicleClass)?.IsCommercial;
    if (id == 'P') this.motorUsageValue = this.motorUsageList.find(ele => ele.CodeDesc == 'Private')?.Code
    else if (id == 'C') this.motorUsageValue = this.motorUsageList.find(ele => ele.CodeDesc == 'Commercial')?.Code
  }
  if (this.motorUsageValue != null && this.motorUsageValue != undefined) {
    usageDesc = this.motorUsageList.find(ele => ele.Code == this.motorUsageValue)?.CodeDesc;
  }
  if (this.policyStartDate == null) {
    this.policyStartDate = new Date();
    let d = new Date(this.policyStartDate)
    var year = d.getFullYear();
    var month = d.getMonth();
    var day = d.getDate();
    this.policyEndDate = new Date(year + 1, month, day);

  }
  if (this.policyStartDate != null && this.policyStartDate != '' && this.policyStartDate != undefined) {
    let dateList = String(this.policyStartDate).split('/');
    if (dateList.length > 1) startDate = this.policyStartDate;
    else startDate = this.datePipe.transform(this.policyStartDate, "dd/MM/yyyy");
  }
  if (this.policyEndDate != null && this.policyEndDate != '' && this.policyEndDate != undefined) {
    let dateList = String(this.policyEndDate).split('/');
    if (dateList.length > 1) endDate = this.policyEndDate;
    else endDate = this.datePipe.transform(this.policyEndDate, "dd/MM/yyyy");
  }
  let quoteStatus = sessionStorage.getItem('QuoteStatus');
  this.subuserType = sessionStorage.getItem('typeValue');
  let vehicleSI = null, accessoriesSI: any = null, windScreenSI: any = null, customerCode = null, customerName = null;
  if (this.userType != 'Issuer') {
    this.brokerCode = this.agencyCode;
    appId = "1"; loginId = this.loginId;
    brokerbranchCode = this.brokerbranchCode;
  }
  else {
    appId = this.loginId;
    loginId = null;
    brokerbranchCode = null;
    //  if(this.updateComponent.brokerLoginId) loginId = this.updateComponent.brokerLoginId
    //   brokerbranchCode = this.vehicleDetailsList[0].BrokerBranchCode;
    // }
  }
  if (this.userType != 'Broker' && this.userType != 'User') {
    // if(this.updateComponent.sourceType==null || this.updateComponent.sourceType==undefined){
    //   this.sourceType = this.vehicleDetails.SourceTypeId;
    //   this.bdmCode = this.vehicleDetails.BrokerCode;
    //   this.brokerCode = this.vehicleDetails.BrokerCode;
    //   brokerbranchCode =  this.vehicleDetails.BrokerBranchCode;
    //   this.customerCode = this.vehicleDetails.CustomerCode;
    //   this.customerName = this.vehicleDetails.CustomerName;
    // }
    // else{
    //   this.sourceType = this.updateComponent.sourceType;
    //   this.bdmCode = this.updateComponent.brokerCode;
    //   this.brokerCode = this.updateComponent.brokerCode;
    //   brokerbranchCode =  this.updateComponent.brokerBranchCode;
    //   this.customerCode = this.updateComponent.CustomerCode;
    //   this.customerName = this.updateComponent.CustomerName;
    // }
  }
  else {
    this.sourceType = this.subuserType;
    this.Code = this.subuserType;
    this.customerCode = this.userDetails?.Result.CustomerCode;
    customerCode = this.userDetails?.Result.CustomerCode;
    customerName = this.userDetails?.Result.CustomerName;
  }
  if (this.vehicleSI) vehicleSI = this.vehicleSI.replaceAll(',', '');
  if (this.AccessoriesSI) accessoriesSI = this.AccessoriesSI.replaceAll(',', '');
  if (this.windScreenSI) windScreenSI = this.windScreenSI.replaceAll(',', '');
  if (this.makeValue) makeDesc = this.makeList.find(ele => ele.Code == this.makeValue)?.CodeDesc;
  let sectionId = [], insuranceTypeDesc = null, insuredDob = null;
  if (this.insuranceType != null && this.insuranceType != '') { insuranceTypeDesc = this.typeList.find(ele => ele.Code == this.insuranceType)?.CodeDesc }
  if (this.insuredDob != null && this.insuredDob != '' && this.insuredDob != undefined) {
    if (String(this.insuredDob).split('/').length > 1) insuredDob = this.insuredDob
    else insuredDob = this.datePipe.transform(this.insuredDob, "dd/MM/yyyy");
  }
  let entry = this.checMandatories()
  if (entry) {
    let val = Number(this.licenseExperience);
    let d = new Date();
    var year = d.getFullYear();
    let experience = year - val;
    let ReqObj = {
      "ExcessLimit": null,
      "Deductibles": null,
      "BrokerBranchCode": this.brokerbranchCode,
      "AcExecutiveId": null,
      "CommissionType": null,
      "CustomerCode": customerCode,
      "CustomerName": this.customerName,
      "BdmCode": customerCode,
      "BrokerCode": this.agencyCode,
      "LoginId": loginId,
      "SubUserType": this.subuserType,
      "ApplicationId": appId,
      "CustomerReferenceNo": this.customerReferenceNo,
      "RequestReferenceNo": this.quoteRefNo,
      "Idnumber": null,
      "VehicleId": 1,
      "AcccessoriesSumInsured": accessoriesSI,
      "AccessoriesInformation": "",
      "AdditionalCircumstances": "",
      "AxelDistance": this.axelDistance,
      "Chassisnumber": null,
      "Color": null,
      "CityLimit": null,
      "CoverNoteNo": null,
      "MobileCode": "+254",
      "MobileNumber": this.mobileNo,
      "OwnerCategory": "1",
      "CubicCapacity": null,
      "CreatedBy": this.loginId,
      "DrivenByDesc": "D",
      "EngineNumber": null,
      "FuelType": this.fuelType,
      "Gpstrackinginstalled": "N",
      "Grossweight": this.grossWeight,
      "HoldInsurancePolicy": "N",
      "Insurancetype": "10",
      "InsurancetypeDesc": "Motor",
      "InsuranceId": this.insuranceId,
      "InsuranceClass": this.insuranceType,
      "InsuranceClassDesc": insuranceTypeDesc,
      "InsurerSettlement": "",
      "InterestedCompanyDetails": "",
      "ManufactureYear": this.manufactureYear,
      "ModelNumber": null,
      "MotorCategory": null,
      "Motorusage": usageDesc,
      "MotorusageId": this.motorUsageValue,
      "NcdYn": "N",
      "PolicyRenewalYn": "N",
      "NoOfClaims": null,
      "NumberOfAxels": "1",
      "BranchCode": this.branchCode,
      "AgencyCode": this.agencyCode,
      "ProductId": this.productId,
      "SectionId": ['10'],
      "PolicyType": "1",
      "RadioOrCasseteplayer": null,
      "RegistrationYear": "18/05/2006",
      "Registrationnumber": this.registerNumber,
      "RoofRack": null,
      "SeatingCapacity": null,
      "SourceTypeId": this.Code,
      "SpotFogLamp": null,
      "Stickerno": null,
      "SumInsured": vehicleSI,
      "InflationSumInsured": "350000",
      "Tareweight": this.tareWeight,
      "TppdFreeLimit": null,
      "TppdIncreaeLimit": null,
      "TrailerDetails": null,
      "VehicleModel": this.modelDesc,
      "VehcilemodelId": this.modelValue,
      "VehicleType": this.bodyTypeValue,
      "VehicleTypeId": this.bodyTypeId,
      "Vehiclemake": makeDesc,
      "VehiclemakeId": this.makeValue,
      "WindScreenSumInsured": windScreenSI,
      "Windscreencoverrequired": null,
      "accident": null,
      "periodOfInsurance": null,
      "PolicyStartDate": startDate,
      "PolicyEndDate": endDate,
      "Currency": this.currencyCode,
      "ExchangeRate": "1.0",
      "HavePromoCode": "N",
      "PromoCode": null,
      "CollateralYn": "N",
      "BorrowerType": null,
      "CollateralName": null,
      "FirstLossPayee": null,
      "FleetOwnerYn": "N",
      "NoOfVehicles": "1",
      "SavedFrom": 'SQ',
      "SearchFromApi": false,
      "UserType": this.userType,
      "TiraCoverNoteNo": null,
      "EndorsementYn": "N",
      "EndorsementDate": null,
      "EndorsementEffectiveDate": null,
      "EndorsementRemarks": null,
      "EndorsementType": null,
      "EndorsementTypeDesc": null,
      "EndtCategoryDesc": null,
      "EndtCount": null,
      "EndtPrevPolicyNo": null,
      "EndtPrevQuoteNo": null,
      "EndtStatus": null,
      "IsFinanceEndt": null,
      "OrginalPolicyNo": null,
      "ClaimType": "0",
      "VehicleValueType": "",
      "Inflation": "",
      "Ncb": "0",
      "DefenceValue": "",
      "PurchaseDate": null,
      "RegistrationDate": null,
      "Mileage": null,
      "NoOfClaimYears": null,
      "NoOfPassengers": null,
      "PreviousInsuranceYN": "N",
      "PreviousLossRatio": "",
      "HorsePower": "0",
      "Zone": "1",
      "DateOfCirculation": null,
      "NewValue": null,
      "MarketValue": null,
      "AggregatedValue": "null",
      "NumberOfCards": null,
      "MunicipalityTraffic": null,
      "TransportHydro": null,
      "BankingDelegation": "",
      "LoanStartDate": null,
      "LoanEndDate": null,
      "CollateralCompanyAddress": "",
      "CollateralCompanyName": "",
      "LoanAmount": 0,
      "PaCoverId": "0",
      "UsageId": "",
      "VehicleTypeIvr": "",
      "ZoneCirculation": "",
      "Scenarios": {
        "ExchangeRateScenario": {
          "OldAcccessoriesSumInsured": null,
          "OldCurrency": null,
          "OldExchangeRate": null,
          "OldSumInsured": null,
          "OldTppdIncreaeLimit": null,
          "OldWindScreenSumInsured": null
        }
      },
      "Status": this.quoteStatus,
      "DriverDetails": {
        "DriverName": this.customerName,
        "DriverType": "1",
        "Gender": this.gender,
        "LicenseNo": "99999",
        "MaritalStatus": "1",
        "CountryId": "KEN",
        "StateId": "1",
        "CityId": "1",
        "SuburbId": "2",
        "DriverExperience": experience,
        "CreatedBy": this.loginId,
        "DriverDob": insuredDob,
        "QuoteNo": null,
        "RequestReferenceNo": this.quoteRefNo,
        "RiskId": 1,
        "InsuranceId": this.insuranceId,
        "EndorsementYn": "N",
        "EndorsementDate": null,
        "EndorsementEffectiveDate": null,
        "EndorsementRemarks": null,
        "EndorsementType": null,
        "EndorsementTypeDesc": null,
        "EndtCategoryDesc": null,
        "EndtCount": null,
        "EndtPrevPolicyNo": null,
        "EndtPrevQuoteNo": null,
        "EndtStatus": null,
        "IsFinanceEndt": null,
        "OrginalPolicyNo": null,
        "VehicleValueType": "",
        "Inflation": "",
        "Ncb": "0",
        "DefenceValue": "",
        "RegistrationDate": null,
        "ExcessLimit": null,
        "Deductibles": null,
        "Mileage": null,
        "ClaimExperience": this.claimExperience,
        "NoOfClaimYears": this.claimExperience,
        "NoOfPassengers": null
      },
      "VehicleClass": this.vehicleClass
    }
    let urlLink = `${this.motorApiUrl}api/savemotordetails`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        let res: any = data;
        if (data.ErrorMessage.length != 0) {
          if (res.ErrorMessage) {
          }
        }
        else {
          if (data.Result?.length != 0) {
            this.localPremiumCost = 0;
            this.totalPremium = 0; this.individualCalcIndex = 0;
            this.vehicleDetailsList = []; this.selectedCoverList = []; this.vehicleData = [];
            this.vehicleDetailsList.push(ReqObj);
            let entry = this.vehicleDetailsList[0];
            entry['PolicyEndDate'] = ReqObj.PolicyEndDate;
            this.policyEndDate = ReqObj.PolicyEndDate;
            entry['PolicyStartDate'] = ReqObj.PolicyStartDate;
            this.policyStartDate = ReqObj.PolicyStartDate;
            this.quoteRefNo = data?.Result[0]?.RequestReferenceNo;
            this.customerReferenceNo = data?.Result[0]?.CustomerReferenceNo;
            sessionStorage.setItem('customerReferenceNo', data?.Result[0]?.CustomerReferenceNo)
            sessionStorage.setItem('quoteReferenceNo', data?.Result[0]?.RequestReferenceNo);
            let i = 0; this.individualCalcIndex = 0;
            for (let veh of data.Result) {
              entry['MSRefNo'] = data?.Result[0].MSRefNo;
              entry['VdRefNo'] = data?.Result[0].VdRefNo;
              entry['CdRefNo'] = data?.Result[0].CdRefNo;
              entry['Active'] = true;
              entry['VehicleId'] = data.Result[0].VehicleId;
              this.onCalculateVehDetails(veh, 'proceedSave', i, data.Result.length, ReqObj.SectionId.length);
              i += 1;
            }
          }

        }
      });

  }
}
onCalculateVehDetails(vehicleDetails, type, entry, totalCount, sectionCount) {
  console.log(this.individualCalcIndex, totalCount)
  let createdBy = "";
  let coverModificationYN = 'N';
  if (this.endorsementSection) {
    // let entry = this.enableFieldsList.some(ele=>ele=='Covers');
    // if(entry && !this.endorseSIModification) coverModificationYN = 'Y';
    // else coverModificationYN = 'N';
    if (this.endorseCoverModification) coverModificationYN = this.endorseCoverModification
  }
  let quoteStatus = sessionStorage.getItem('QuoteStatus');
  if (quoteStatus == 'AdminRP') {
    createdBy = this.vehicleDetailsList[0].CreatedBy;
  }
  else {
    createdBy = this.loginId;
  }

  let endDate: any = null;
  if (this.endorsementSection && vehicleDetails?.Status == 'D') {
    coverModificationYN = 'Y';
    endDate = this.endorseEffectiveDate;
  }
  // else if(this.endorsementSection && this.enableRemoveVehicle && vehicleDetails.Status!='D'){
  //   coverModificationYN = 'N';
  // }
  else {
    if (this.policyEndDate) {
      if (String(this.policyEndDate).includes('/')) endDate = this.policyEndDate;
      else endDate = this.datePipe.transform(this.policyEndDate, "dd/MM/yyyy");
    }
  }
  let effectiveDate = null;
  if (this.endorsementSection) {
    effectiveDate = this.endorseEffectiveDate;
  }
  else {
    if (this.policyStartDate) {
      if (String(this.policyStartDate).includes('/')) effectiveDate = this.policyStartDate;
      else effectiveDate = this.datePipe.transform(this.policyStartDate, "dd/MM/yyyy");
    }
  }
  let ReqObj = {
    "InsuranceId": this.insuranceId,
    "BranchCode": this.branchCode,
    "AgencyCode": this.agencyCode,
    "SectionId": vehicleDetails?.SectionId,
    "ProductId": this.productId,
    "LocationId": "1",
    "MSRefNo": vehicleDetails?.MSRefNo,
    "VehicleId": vehicleDetails?.VehicleId,
    "CdRefNo": vehicleDetails?.CdRefNo,
    "DdRefNo": vehicleDetails?.DdRefNo,
    "VdRefNo": vehicleDetails?.VdRefNo,
    "CreatedBy": createdBy,
    "productId": this.productId,
    "sectionId": vehicleDetails?.SectionId,
    "RequestReferenceNo": this.quoteRefNo,
    "EffectiveDate": effectiveDate,
    "PolicyEndDate": endDate,
    "CoverModification": coverModificationYN
  }
  let urlLink = `${this.CommonApiUrl}calculator/calc`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      this.individualCalcIndex += 1;

      if (this.individualCalcIndex == totalCount) {
        this.onViewCalc();
      }
    });
}
onViewCalc() {
  let ReqObj = {
    "ProductId": this.productId,
    "RequestReferenceNo": this.quoteRefNo
  }
  let urlLink = `${this.CommonApiUrl}api/view/calc`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      if (data.Result) {
          sessionStorage.setItem('coverListObj',JSON.stringify(data.Result));
          this.router.navigate(['/quote-basic-info-continue'])
         
      }
    },
    (err) => { },
  );
}
checMandatories() {
  this.customerNameError = false; this.mobileCodeError = false; this.genderError = false;
  this.insuredDobError = false; this.licenseExperienceError = false;
  this.claimExperienceError = false;
  this.manufactureYearError = false;
  this.insuranceTypeError = false;
  this.vehicleClassError = false;
  this.makeValueError = false;
  this.modelDescError = false;
  this.vehicleSIError = false;
  this.registerNumberError = false;
  let i = 0;
  if (this.customerName == null || this.customerName == '' || this.customerName == undefined) {
    i += 1;
    this.customerNameError = true;
  }
  if (this.mobileNo == null || this.mobileNo == '' || this.mobileNo == undefined) {
    i += 1;
    this.mobileCodeError = true;
  }
  if (this.gender == null || this.gender == '' || this.gender == undefined) {
    i += 1;
    this.genderError = true;
  }
  if (this.insuredDob == null || this.insuredDob == '' || this.insuredDob == undefined) {
    i += 1;
    this.insuredDobError = true;
  }
  if (this.licenseExperience == null || this.licenseExperience == '' || this.licenseExperience == undefined) {
    i += 1;
    this.licenseExperienceError = true;
  }
  else {
    let list = String(this.licenseExperience).split('');
    if (list.length != 4) { i += 1; this.licenseExperienceError = true; }
    else this.licenseExperienceError = false;
  }
  if (this.insuranceType == null || this.insuranceType == '' || this.insuranceType == undefined) {
    i += 1;
    this.insuranceTypeError = true;
  }
  if (this.vehicleClass == null || this.vehicleClass == '' || this.vehicleClass == undefined) {
    i += 1;
    this.vehicleClassError = true;
  }
  if (this.makeValue == null || this.makeValue == '' || this.makeValue == undefined) {
    i += 1;
    this.makeValueError = true;
  }
  if (this.modelDesc == null || this.modelDesc == '' || this.modelDesc == undefined) {
    i += 1;
    this.modelDescError = true;
  }
  if (this.manufactureYear == null || this.manufactureYear == '' || this.manufactureYear == undefined) {
    i += 1;
    this.manufactureYearError = true;
  }
  if (this.claimExperience == null || this.claimExperience == '' || this.claimExperience == undefined) {
    i += 1;
    this.claimExperienceError = true;
  }
  if (this.registerNumber == null || this.registerNumber == '' || this.registerNumber == undefined) {
    i += 1;
    this.registerNumberError = true;
  }
  if (this.vehicleSI == null || this.vehicleSI == '' || this.vehicleSI == undefined) {
    i += 1;
    this.vehicleSIError = true;
  }
  return i == 0;

}
}
