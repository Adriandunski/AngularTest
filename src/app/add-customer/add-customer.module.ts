import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddCustomerRoutingModule } from './add-customer-routing.module';
import { AddCustomerComponent } from './add-customer.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatButtonModule} from '@angular/material/button';
import {MatOptionModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatTabsModule} from '@angular/material/tabs';


@NgModule({
  declarations: [AddCustomerComponent],
    imports: [
        CommonModule,
        AddCustomerRoutingModule,
        MatExpansionModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        MatDatepickerModule,
        MatButtonModule,
        MatOptionModule,
        MatSelectModule,
        FlexLayoutModule,
        MatSlideToggleModule,
        FormsModule,
        MatTabsModule
    ]
})
export class AddCustomerModule { }
