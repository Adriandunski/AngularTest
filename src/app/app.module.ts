import { BrowserModule } from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DateAdapter, MAT_DATE_LOCALE, MatNativeDateModule} from '@angular/material/core';
import {MyDateAdapter} from './other/my-date-adapter';
import {HttpClientModule} from '@angular/common/http';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { LoginComponent } from './login/login.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {authInterceptorProviders} from './_helpers/AuthInterceptor';
import { HomeComponent } from './home/home.component';
import { DeleteMatDialogComponent } from './other/delete-mat-dialog/delete-mat-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatStepperModule} from '@angular/material/stepper';
import {MatSelectModule} from '@angular/material/select';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {OWL_DATE_TIME_LOCALE, OwlDateTimeIntl, OwlDateTimeModule, OwlNativeDateTimeModule} from 'ng-pick-datetime';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    DeleteMatDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    FlexLayoutModule,
    MatButtonModule,
    MatMenuModule,
    BrowserAnimationsModule,
    MatNativeDateModule,
    HttpClientModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatStepperModule,
    MatSelectModule,
    MatSortModule,
    MatTableModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule
  ],
  providers: [{provide: MAT_DATE_LOCALE, useValue: 'pl-PL'},
    {provide: OWL_DATE_TIME_LOCALE, useValue: 'pl'},
    {provide: DateAdapter, useClass: MyDateAdapter},
    authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
