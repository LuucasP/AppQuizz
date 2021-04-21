import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registroForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.registroForm = formBuilder.group({
      emailForm: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      repetirPassword: ['',] 
    }, { validator: this.checkPassword })
   }

  ngOnInit(): void {
  }

  registro(){
console.log(this.registroForm);
  }

  checkPassword(group: FormGroup): any{
    const pass = group.controls.password?.value;
    const confirmPassword = group.controls.repetirPassword?.value;
    if(pass != confirmPassword){
      return {notSame: true};
    }
  }

}
