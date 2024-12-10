import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';
import { ProductComponent } from './product/product.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: LoginComponent },
        { path: 'product', component: ProductComponent }
    ])],
    exports: [RouterModule]
})
export class LoginRoutingModule { }
