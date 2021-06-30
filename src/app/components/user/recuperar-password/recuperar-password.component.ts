import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ErrorService } from 'src/app/services/error.service';

@Component({
  selector: 'app-recuperar-password',
  templateUrl: './recuperar-password.component.html',
  styleUrls: ['./recuperar-password.component.css']
})
export class RecuperarPasswordComponent implements OnInit {
  recuperarForm: FormGroup;
  loader = false;
  
  constructor(private formBuilder: FormBuilder,
              private afAuth: AngularFireAuth,
              private toastr: ToastrService,
              private _errorService: ErrorService,
              private router: Router) {
    this.recuperarForm = formBuilder.group({
      emailForm: ['', [ Validators.required, Validators.email ] ]
    });
   }

  ngOnInit(): void {
  }

recuperarPassword(){
  const correo = this.recuperarForm.get('emailForm')?.value;
  this.loader = true;
  this.afAuth.sendPasswordResetEmail(correo).then(()=>{
    this.toastr.info('Se envío un correo electronico para restablecer su contraseña', 'Detalle');
    this.router.navigate(['/usuario']);
  }).catch(error =>{
    this.loader = false;
    this.toastr.error(this._errorService.error(error.code), 'Error');
    this.recuperarForm.reset();
  });
}

}
