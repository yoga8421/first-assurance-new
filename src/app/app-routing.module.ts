import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarInsuranceComponent } from './car-insurance/car-insurance.component';
import { HomeComponent } from './home/home.component';
import { GetQuotePageComponent } from './get-quote-page/get-quote-page.component';
import { QuoteBasicInfoContinueComponent } from './quote-basic-info-continue/quote-basic-info-continue.component';
import { MakeVehicleComponent } from './make-vechicle-model/make-vechicle-model.component';
import { ModelNameComponent } from './model-name/model-name.component';
import { SelectInsuranaceTypeComponent } from './select-insuranace-type/select-insuranace-type.component';
import { OtpVerificationComponent } from './otp-verification/otp-verification.component';
import { CustomerAddInfoComponent } from './customer-add-info/customer-add-info.component';




const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'car-insurance', component: CarInsuranceComponent },
  { path: 'get-quote-page', component: GetQuotePageComponent },
  { path: 'quote-basic-info-continue', component: QuoteBasicInfoContinueComponent },
  { path: 'make-vechicle-model', component: MakeVehicleComponent},
  { path: 'model-name', component: ModelNameComponent},
  { path: 'select-insuranace-type', component: SelectInsuranaceTypeComponent},
  {path: 'otp-verification', component: OtpVerificationComponent},
   {path: 'customer-add-info', component:CustomerAddInfoComponent}

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
