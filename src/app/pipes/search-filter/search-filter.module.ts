import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
//import { ChartsModule } from 'ng2-charts';
import { CommonModule } from '@angular/common';
import { SearchFilterPipe } from './search-filter.pipe';
@NgModule({
  imports: [
    FormsModule,
    //ChartsModule,
    CommonModule
    
  ],
  declarations: [ SearchFilterPipe ],
  exports :[ SearchFilterPipe ]
})
export class SearchFilterModule { }
