import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { InterfaceComponent } from 'src/app/interface/interface.component';

@NgModule({
    imports: [RouterModule.forChild([
        {path: 'interface',component:InterfaceComponent},
        { path: 'error', loadChildren: () => import('./error/error.module').then(m => m.ErrorModule) },
        { path: 'access', loadChildren: () => import('./access/access.module').then(m => m.AccessModule) },
        { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
    ])],
    exports: [RouterModule]
})
export class AuthRoutingModule { }
