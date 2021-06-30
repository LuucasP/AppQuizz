import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ErrorService } from 'src/app/services/error.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loader = false;
  loginForm: FormGroup;
  constructor(private formBuilder: FormBuilder,
              private afAuth: AngularFireAuth,
              private toastr: ToastrService,
              private _errorService: ErrorService,
              private router: Router) {
    this.loginForm = formBuilder.group({
      emailForm: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required] 
    });
   }

  ngOnInit(): void {
  }

  login(){
    const user = this.loginForm.get('emailForm')?.value;
    const password = this.loginForm.get('password')?.value;
    this.loader = true;
    this.afAuth.signInWithEmailAndPassword(user,password).then((respuesta)=> {
      console.log(respuesta);
      this.loader = false;

      if(respuesta.user?.emailVerified == false){
        this.router.navigate(['/usuario/verificarCorreo']);
      }
    }, error => {
      this.toastr.error(this._errorService.error(error.code),'Error')
      console.log(error);
      this.loginForm.reset();
      this.loader = false;
    }
    );
  }
}
