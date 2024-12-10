import { Component } from '@angular/core';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent {
productId: any;
  columns: any[]=[];
  uploadedColumns: any[]=[];
ngOnInit(){
  if(this.productId=='5' || this.productId=='46'){
    this.columns = ['S.No','FileName','Section','Registration Number','Document Type','Actions'];
    this.uploadedColumns = ['S.No','FileName','Section','Registration Number','Document Type','Actions'];
  }
  else if(this.productId=='43'){
    this.columns = ['S.No','FileName','Section','Employee Name','Document Type','Actions'];
    this.uploadedColumns = ['S.No','FileName','Section','Employee Name','Document Type','Actions'];
  }
  else if(this.productId=='42'){
    this.columns = ['S.No','FileName','Section','Serial No','Document Type','Actions'];
    this.uploadedColumns = ['S.No','FileName','Section','Serial No','Document Type','Actions'];
  }
  else if(this.productId=='59'){
    this.columns = ['S.No','FileName','Location','Section','ID','Document Type','Actions'];
    this.uploadedColumns = ['S.No','FileName','Location','Section','ID','Document Type','Actions'];
  }
  else{
    this.columns = ['S.No','FileName','Section','ID','Document Type','Actions'];
    this.uploadedColumns = ['S.No','FileName','Section','ID','Document Type','Actions'];
  }
}
}
