import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth'
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ErrorService } from 'src/app/services/error.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registroForm: FormGroup;
  loader = false;
  constructor(private formBuilder: FormBuilder,
              private afAuth: AngularFireAuth,
              private router: Router,
              private toastr: ToastrService,
              private _errorService: ErrorService) {
    this.registroForm = formBuilder.group({
      emailForm: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      repetirPassword: ['',] 
    }, { validator: this.checkPassword })
   }

  ngOnInit(): void {
  }

  registro(){
const email = this.registroForm.get('emailForm')?.value;
const password = this.registroForm.get('password')?.value;
this.loader = true;
this.afAuth.createUserWithEmailAndPassword(email,password).then(rta => {
  rta.user?.sendEmailVerification();
  this.toastr.success('Se envió un correo electronico para su verificación');
  this.router.navigate(['/usuario']);
}).catch(error => {
  this.toastr.error(this._errorService.error(error.code),'Error'); 
  this.registroForm.reset();
  this.loader = false;
});
  }



  checkPassword(group: FormGroup): any{
    const pass = group.controls.password?.value;
    const confirmPassword = group.controls.repetirPassword?.value;
    if(pass != confirmPassword){
      return {notSame: true};
    }
  }

}
