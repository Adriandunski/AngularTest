import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CustomerService} from '../services/customer.service';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'aga-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.scss']
})
export class AddCustomerComponent implements OnInit {
  readonly customerForm: FormGroup;
  readonly companyForm: FormGroup;
  readonly corespondAdress: FormGroup;
  errormessage: string;
  countries$: Observable<any>;

  constructor(fb: FormBuilder, private customerService: CustomerService, private http: HttpClient, private snackBar: MatSnackBar) {
    this.customerForm = fb.group({
      corespondActive: [false],
      name: [, Validators.required],
      secondName: [],
      lastname: [, Validators.required],
      pesel: [, Validators.compose([Validators.required, Validators.minLength(11), Validators.maxLength(11), Validators.min(0)])],
      dateOfBirth: [, Validators.required],
      gender: [, Validators.required],
      citizenship: [, Validators.required],
      email: [, Validators.compose([Validators.required, Validators.email])],
      phone: [, Validators.compose([Validators.required, Validators.minLength(9), Validators.maxLength(9), Validators.min(0)])],
      adress: fb.group({
        state: [, Validators.required],
        city: [, Validators.required],
        street: [, Validators.required],
        buildingNumber: [, Validators.required],
        localNumber: [],
        postcode: [, Validators.compose([Validators.required, Validators.pattern('[0-9][0-9]-[0-9][0-9][0-9]')])]
      }),
    });

    this.corespondAdress = fb.group( {
      state: [, Validators.required],
      city: [, Validators.required],
      street: [, Validators.required],
      buildingNumber: [, Validators.required],
      localNumber: [],
      postcode: [, Validators.compose([Validators.required, Validators.pattern('[0-9][0-9]-[0-9][0-9][0-9]')])]
    });

    this.companyForm = fb.group({
      nameOfCompany: [, Validators.required],
      nip: [, Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.min(0)])],
      email: [, Validators.compose([Validators.required, Validators.email])],
      phone: [, Validators.compose([Validators.required, Validators.minLength(9), Validators.maxLength(9), Validators.min(0)])],
      companydAdress: fb.group({
        state: [, Validators.required],
        city: [, Validators.required],
        street: [, Validators.required],
        buildingNumber: [, Validators.required],
        localNumber: [],
        postcode: [, Validators.compose([Validators.required, Validators.pattern('[0-9][0-9]-[0-9][0-9][0-9]')])]
      })
    });
  }

  ngOnInit(): void {
    this.countries$ = this.http.get('/data/countries.json');
  }

  getErrorMessageEmail(): string {
    if (this.customerForm.controls.email.hasError('required')) {
      return 'Musisz wprowadzić email';
    }
    return 'Wprowadź poprawny email';
  }

  addCustomer(): void {
    if (this.customerForm.valid) {
      this.customerForm.addControl('corespondAdress', this.corespondAdress);
      this.customerService.addCustomer(this.customerForm.value).subscribe(
        () => {},
        (error: HttpErrorResponse) => {
          this.handleError(error);
        },
        () => {
          window.location.reload();
          this.openSnackBar('Dodano klienta');
        });
    }
  }

  addCompany(): void {
    if (this.companyForm.valid) {
      this.customerService.addCompany(this.companyForm.value).subscribe(
        () => {},
        (error: HttpErrorResponse) => {
          this.handleError(error);
        },
        () => {
          window.location.reload();
          this.openSnackBar('Dodano Frime');
        });
    }
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.status === 403) {
      this.openWarnSnackBar('Brak autoryzacji');
    } else {
      this.openWarnSnackBar(error.error);
    }
  }

  public openWarnSnackBar(message: string): void {
      this.snackBar.open(message, 'zamknij', {duration: 10000,
        panelClass: ['mat-toolbar', 'mat-warn']});
  }

  public openSnackBar(message: string): void {
    this.snackBar.open(message, 'zamknij', {duration: 4000});
  }
}
