import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ValidadoresService } from '../../services/validadores.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { IUserRespond } from '../../interfaces/user';


@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss']
})
export class FormularioComponent implements OnInit {
  forma: FormGroup;
  iUserRespond: IUserRespond;


  constructor( private fb: FormBuilder,
    private validadores: ValidadoresService,
    private http: HttpClient) { 



this.crearFormulario();
this.cargarDataAlFormulario();
this.crearListeners();




  }



  ngOnInit(): void {
  }

  
  get sexoNoValido(){
    return this.forma.get('sexo').invalid && this.forma.get('sexo').touched;
  }
  get nombreNoValido(){
    return this.forma.get('nombre').invalid && this.forma.get('nombre').touched;
  }
  get apellidoNoValido(){
    return this.forma.get('apellido').invalid && this.forma.get('apellido').touched;
  }
  get edadNoValido(){
    const edad = this.forma.get('edad').value;
    if(edad<17){
      return this.forma.get('trabaja').disable(), this.forma.get('nombreCompania').disable(), this.forma.get('aniosCompania').disable();
    }
    if(edad>17)
    {
      return this.forma.get('trabaja').enable(), this.forma.get('nombreCompania').enable(), this.forma.get('aniosCompania').enable();
     
    }
    return this.forma.get('edad').invalid && this.forma.get('edad').touched;
  }
  get nCompaniaNoValido(){
    return this.forma.get('nombreCompania').invalid && this.forma.get('nombreCompania').touched;
  }
  get trabajaNoValido(){
    const trabaja = this.forma.get('trabaja').value;
    if(trabaja=='false'){
      return this.forma.get('nombreCompania').disable(), this.forma.get('aniosCompania').disable();

    }
    if(trabaja=='true')
    {
      return this.forma.get('nombreCompania').enable(), this.forma.get('aniosCompania').enable();
    }
    return this.forma.get('trabaja').invalid && this.forma.get('trabaja').touched;
  }
  get emailNoValido(){
    return this.forma.get('email').invalid && this.forma.get('email').touched;
  }
  get userNoValido(){
    return this.forma.get('username').invalid && this.forma.get('username').touched;
  }
  get aniosCompaniaNoValido(){
    return this.forma.get('aniosCompania').invalid && this.forma.get('aniosCompania').touched;
  }
 

 


  crearFormulario(){
  this.forma = this.fb.group({
    
    nombre: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]{3,40}')]],
    apellido: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9 X]{3,40}')]],
    edad: ['', [Validators.required, Validators.pattern('[0-9]{0,3}')]],
    sexo: ['', Validators.required],
    email: ['', [Validators.required, Validators.maxLength(60) , Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
    username: ['', [Validators.maxLength(30) ]],
    trabaja: [''],
    nombreCompania: ['', [Validators.maxLength(18) , Validators.pattern('[a-zA-Z0-9]{1,18}')]],
    aniosCompania: ['', [Validators.max(15)]],

   
   
  })
  

  }

  

  crearListeners(){
    this.forma.valueChanges.subscribe( valor =>{
      
    
    })
    this.forma.statusChanges.subscribe( status =>{

    } );
  }


  cargarDataAlFormulario(){
    this.forma.reset({
      
      nombre: "",
      apellido: "",
      edad: "",
      correo: "",
      user: "",
      trabaja: "",
      nombreCompania: "",
      aniosCompania: "",
      
    });
  }




  guardar(){
    if(this.forma.invalid){
      
  
      
    
      Object.values( this.forma.controls).forEach(control =>{
        control.markAsTouched();
      });
     
         
        }

      
    console.log(this.forma);
    let submittedData = this.forma.value;
    this.iUserRespond = submittedData;
    console.log(this.iUserRespond);
  
    if(this.forma.valid){
      this.http.post(environment.URL_BASE+environment.URL_ENDPOINT, this.iUserRespond)
      .subscribe((response)=>{
        console.log('repsonse ',response);
      })
    }


}
}