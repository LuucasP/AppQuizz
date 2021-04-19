import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  name =  "Gian";
  textPlaceHolder="Escribe tu nombre aquí";
  disabledPlaceHolder=true;
  srcImg = "https://www.xtrafondos.com/descargar.php?id=3183&resolucion=3840x1633";
  texto = "Esto es un ejemplo de Event Binding";
  texto2 = "";
  widthX = "";
  heightY = "";
  mostrar=true;

  listadoAlumnos: any[] = [
    {nombre:'Lucas2', estado:'En curso'},
    {nombre:'Lucas3', estado:'Aprobado'},
    {nombre:'Lucas4', estado:'Aprobado'}
  ];



  constructor(){
  setInterval( () =>this.name = "Lucas",3000); 
  setInterval( () =>this.disabledPlaceHolder=false,3000);
  
  }

   cambiarTexto(){
    this.texto = "Cambio";
  }

  getSuma(num1: number, num2: number){
    return num1 + num2;
  }

  toggle(){
    this.mostrar = !this.mostrar;
  }


}

