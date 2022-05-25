import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  form: FormGroup;
  isLoading: boolean = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.form = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')
      ]],
      password: ['', [Validators.required]]
    });
  }

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  ngOnInit(): void {
  }

  isValidEmail() {
    return this.email?.hasError('pattern') && (this.email.dirty || this.email.touched);
  }

  isRequiredControl(control: any): boolean {
    return control?.hasError('required') && (control.dirty || control.touched);
  }

  onSubmit(): void {
    this.isLoading = true;
    this.authService.signin(this.form.value)
      .subscribe({
        next: (res: any) => {
          this.isLoading = false;
          Swal.fire({
            title: 'Success Login',
            text: 'Welcome to our application',
            icon: 'success'
          }).then(() => {
            localStorage.setItem('token', res.token);
            this.router.navigate(['/home']);
          });
        },
        error: ({ error: err }) => {
          this.isLoading = false;
          Swal.fire({
            title: 'Error',
            text: err.error,
            icon: 'error'
          });
        }
      });
  }

}
