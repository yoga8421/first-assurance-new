import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { TableViewComponent } from './table-view/table-view.component';
import { CustomerTableComponent } from '../../components/customer/customer-table/customer-table.component';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { TabViewModule } from 'primeng/tabview';
import { InputTextModule } from 'primeng/inputtext';
import { DataViewModule } from 'primeng/dataview';
import { QuotationTableComponent } from '../../components/quotation/quotation-table/quotation-table.component';
import { DialogModule } from 'primeng/dialog';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ChipModule } from 'primeng/chip';
import { CheckboxModule } from 'primeng/checkbox';
import { PolicyTableComponent } from '../../components/policy/policy-table/policy-table.component';
import { DragDropFileUploadDirective } from '../../service/drag-drop.directive';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from 'src/app/app.module';
import { HttpClient } from '@angular/common/http';


@NgModule({
  declarations: [ 
    TableViewComponent, 
    CustomerTableComponent,
    QuotationTableComponent,
    PolicyTableComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    BreadcrumbModule,
    ButtonModule,
    DividerModule,
    TabViewModule,
    InputTextModule,
    DataViewModule,
    DialogModule,
    AutoCompleteModule,
    ChipModule,
    CheckboxModule,
    DropdownModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
  })
    
  ],
  exports: [TableViewComponent]
})
export class SharedModule { }
