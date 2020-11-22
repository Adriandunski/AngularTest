import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddUserRoutingModule } from './add-user-routing.module';
import { AddUserComponent } from './add-user.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {ReactiveFormsModule} from '@angular/forms';
import {MatTabsModule} from '@angular/material/tabs';


@NgModule({
  declarations: [AddUserComponent],
    imports: [
        CommonModule,
        AddUserRoutingModule,
        MatFormFieldModule,
        MatInputModule,
        FlexLayoutModule,
        MatButtonModule,
        MatIconModule,
        MatSelectModule,
        ReactiveFormsModule,
        MatTabsModule
    ]
})
export class AddUserModule { }
