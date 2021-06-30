import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor() { }


  error(code: string):string{  
    switch(code){
      case 'auth/weak-password': return 'Contraseña muy débil, debe de ser mayor a 6 dígitos';
      case 'auth/email-already-in-use': return 'El email ya esta en uso';
      case 'auth/invalid-email': return 'El email es invalido';
      case 'auth/wrong-password': return 'La contraseña es incorrecta';
      case 'auth/invalid-email': return 'Usuario invalido'; 
      case 'auth/user-not-found': return 'Email no encontrado, verifique su email' 
      
 
    }
     
   return 'Error desconocido';
   }


}
