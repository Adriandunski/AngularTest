import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../services/user.service';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {MatSnackBar} from '@angular/material/snack-bar';
import {BranchService} from '../services/branch.service';
import {TokenStorageService} from '../services/security/token-storage.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'aga-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  hidePassword = true;
  branchesArray: Array<any>;
  readonly userForm: FormGroup;
  branch: any;
  countries$: Observable<any>;
  adminAccess = false;
  managerAccess = false;
  selectedBranch: any;

  constructor(fb: FormBuilder, private userService: UserService, private tokenStorageService: TokenStorageService,
              private snackBar: MatSnackBar, private branchService: BranchService, private http: HttpClient) {
    this.userForm = fb.group({
      name: [, Validators.required],
      lastname: [, Validators.required],
      phoneNumber: [, Validators.compose([Validators.required, Validators.minLength(9), Validators.maxLength(9), Validators.min(0)])],
      email: [, Validators.compose([Validators.required, Validators.email])],
      role: [, Validators.required],
      login: [, Validators.required],
      password: [, Validators.required],
      branch: []
    });

    const user = this.tokenStorageService.getUser();
    this.adminAccess = user.roles.includes('ROLE_ADMIN');
    this.managerAccess = user.roles.includes('ROLE_MANAGER');

    if (this.managerAccess) {
      this.branch = user.branch;
      this.selectedBranch = user.branch;
    } else {
      branchService.getAllBranches().subscribe(branches => {
        this.branchesArray = branches;
      });
    }
  }

  ngOnInit(): void {
    this.countries$ = this.http.get('/data/countries.json');
  }

  addUser(): void {
    if (this.userForm.valid) {
      console.log(this.userForm.value);
      this.userService.addCustomer(this.userForm.value).subscribe(
        () => {},
        (error: HttpErrorResponse) => {
          this.handleError(error);
        },
        () => {
          window.location.reload();
          this.openSnackBar('Dodano użytkownika');
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
