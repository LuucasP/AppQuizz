import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth'
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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
              private toastr: ToastrService) {
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
  this.toastr.success('Usuario registrado exitosamente');
  this.router.navigate(['/usuario']);
}).catch(error => {
  this.loader = false;
  this.toastr.error(this.error(error.code),'Error');
});
  }

  error(code: string):string{  
   switch(code){
     case 'auth/weak-password': return 'Contraseña muy débil, debe de ser mayor a 6 dígitos';
     case 'auth/email-already-in-use': return 'El email ya esta en uso';
     case 'auth/invalid-email': return 'El email es invalido'; 

   }
    
  return 'Error desconocido';
  }

  checkPassword(group: FormGroup): any{
    const pass = group.controls.password?.value;
    const confirmPassword = group.controls.repetirPassword?.value;
    if(pass != confirmPassword){
      return {notSame: true};
    }
  }

}
