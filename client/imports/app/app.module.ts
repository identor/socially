import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AccountsModule } from 'angular2-meteor-accounts-ui';
import { Ng2PaginationModule } from 'ng2-pagination';

import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { PARTIES_DECLARATIONS } from './parties';
import { ROUTES_PROVIDERS } from './app.routes';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AccountsModule,
    RouterModule.forRoot(routes),
    Ng2PaginationModule
  ],
  declarations: [
    AppComponent,
    ...PARTIES_DECLARATIONS
  ],
  bootstrap: [
    AppComponent
  ],
  providers: [
    ...ROUTES_PROVIDERS
  ]
})
export class AppModule {}
