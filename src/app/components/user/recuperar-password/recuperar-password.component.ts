import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-recuperar-password',
  templateUrl: './recuperar-password.component.html',
  styleUrls: ['./recuperar-password.component.css']
})
export class RecuperarPasswordComponent implements OnInit {
  recuperarForm: FormGroup;

  
  constructor(private formBuilder: FormBuilder) {
    this.recuperarForm = formBuilder.group({
      emailForm: ['', [ Validators.required, Validators.email ] ]
    });
   }

  ngOnInit(): void {
  }

}
