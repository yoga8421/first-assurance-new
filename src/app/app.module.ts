import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { AppComponent } from './app.component';
import { HeaderNavComponent } from './header-nav/header-nav.component';
import { HomeComponent } from './home/home.component';
import { CarInsuranceComponent } from './car-insurance/car-insurance.component';
import { GetQuotePageComponent } from './get-quote-page/get-quote-page.component';
import { QuoteBasicInfoContinueComponent } from './quote-basic-info-continue/quote-basic-info-continue.component';
import { MakeVehicleComponent } from './make-vechicle-model/make-vechicle-model.component';
import { ModelNameComponent } from './model-name/model-name.component';
import { SelectInsuranaceTypeComponent } from './select-insuranace-type/select-insuranace-type.component';
import { TabViewModule } from 'primeng/tabview';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { CheckboxModule } from 'primeng/checkbox';
import { ChipModule } from 'primeng/chip';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { SelectButtonModule } from 'primeng/selectbutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { AuthService } from './auth/Auth/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { PipesModule } from './pipes/pipes.module';
import { OtpVerificationComponent } from './otp-verification/otp-verification.component';
import { CustomerAddInfoComponent } from './customer-add-info/customer-add-info.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderNavComponent,
    HomeComponent,
    CarInsuranceComponent,
    GetQuotePageComponent,
    QuoteBasicInfoContinueComponent,
    MakeVehicleComponent,
    ModelNameComponent,
    SelectInsuranaceTypeComponent,
    OtpVerificationComponent,
    CustomerAddInfoComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DropdownModule,
    TabViewModule,
    TableModule,
    FormsModule,
    InputTextModule,
    DialogModule,
    CheckboxModule,
    ChipModule,
    AutoCompleteModule,
    SelectButtonModule,
    DropdownModule,
    ReactiveFormsModule,
    InputNumberModule,
    CalendarModule,
    HttpClientModule,
    PipesModule
  ],
  providers: [
    AuthService,
    DatePipe
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
