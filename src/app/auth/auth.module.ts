import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginRoutingModule } from './login/login-routing.module';
import { InterfaceComponent } from 'src/app/interface/interface.component';
import { AppComponent } from 'src/app/app.component';

@NgModule({
    declarations: [
        InterfaceComponent,
    ],
    imports: [
        CommonModule,
        AuthRoutingModule
    ],
    bootstrap: [AppComponent],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AuthModule { }
