import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from '../../services/service.service';
import { IUserRespond, ICompany, IName } from '../../interfaces/user';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  form: FormGroup;

  constructor(private fb: FormBuilder, private service: ServiceService, private toastr: ToastrService) {
    this.crearFormulario();
  }

  ngOnInit(): void {
    
  }

  get idNoValido() {
    return this.form.get('id').invalid
  }

  get nombreNoValido() {
    return this.form.get('nombre').invalid
  }

  get apellidoNoValido() {
    return this.form.get('apellido').invalid 
  }

  get edadNoValido() {
    return this.form.get('edad').invalid 
  }

  get sexoNoValido() {
    return this.form.get('sexo').invalid 
  }

  get correoNoValido() {
    return this.form.get('correo').invalid 
  }

  get userNameNoValido() {
    return this.form.get('username').invalid 
  }

  get nombreCompaniaNoValido() {
    return this.form.get('nombreCompania').invalid 
  }

  get aniosCompaniaNoValido() {
    return this.form.get('aniosCompania').invalid 
  }

  crearFormulario() {

    this.form = this.fb.group({
      id: [null],
      nombre: ['', [Validators.required, Validators.maxLength(40)]],
      apellido: ['', [Validators.required, Validators.maxLength(40)]],
      edad: ['', [Validators.pattern('^[1-9]{1,3}$'), Validators.required, Validators.maxLength(3)]],
      sexo: ['M', [Validators.required]],
      correo: ['', [Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$'), Validators.required]],
      username: ['', [Validators.maxLength(30)]],
      trabaja: ['no'],
      nombreCompania: [''],
      aniosCompania: ['']
    });
    this.validAge(this.form.controls.edad.value);
    this.validaTrabaja();
  }

  validAge(value: number) {
    if (value > 17 && this.form.controls.edad.value !== null) {
      this.form.controls.trabaja.enable()
    }
    else {
      this.form.controls.trabaja.disable()
    }
  }

  enviar() {
    if (this.form.valid) {
      const company: ICompany = {
        name: this.form.controls.nombreCompania.value,
        years: this.form.controls.aniosCompania.value
      }

      const username: IName = {
        firstName: this.form.controls.nombre.value,
        lastName: this.form.controls.apellido.value
      }

      const user: IUserRespond = {
        name: username,
        age: this.form.controls.edad.value,
        isWorkNow: this.form.controls.trabaja.value === 'si' ? true : false,
        email: this.form.controls.correo.value,
        username: this.form.controls.username.value,
        gender: this.form.controls.sexo.value,
        company: company
      }

      this.service.postUser(user).subscribe(x => {
        if (x !== null || x !== undefined) {
          this.toastr.success(x['message'], 'OK')
        }
      }, (error) => {
        this.toastr.error(error.message, 'Error');
      })
    } else {
      Object.values(this.form.controls).forEach(control => {
        control.markAsTouched();
      });
      return;
    }
  }

  validaTrabaja() {
    this.form.get('trabaja').valueChanges.subscribe(x => {
      if (x === 'si') {
        this.form.controls.nombreCompania.setValidators([Validators.maxLength(18), Validators.required]);
        this.form.controls.aniosCompania.setValidators([Validators.pattern('^[1-9]{1,2}$'), Validators.max(15), Validators.required]);
        this.form.controls.nombreCompania.setValue('');
        this.form.controls.aniosCompania.setValue('');
      }else{
        this.form.controls.nombreCompania.setValidators([Validators.maxLength(18)]);
        this.form.controls.aniosCompania.setValidators([Validators.pattern('^[1-9]{1,2}$'), Validators.max(15)]);
        this.form.controls.nombreCompania.setValue('');
        this.form.controls.aniosCompania.setValue('');
      }
    })
  }

  update() {
    if (this.form.controls.id.value != null && this.form.controls.id.value != '') {

      const company: ICompany = {
        name: this.form.controls.nombreCompania.value,
        years: this.form.controls.aniosCompania.value
      }

      const username: IName = {
        firstName: this.form.controls.nombre.value,
        lastName: this.form.controls.apellido.value
      }

      const user: IUserRespond = {
        id: this.form.controls.id.value,
        name: username,
        age: this.form.controls.edad.value,
        isWorkNow: this.form.controls.trabaja.value === 'si' ? true : false,
        email: this.form.controls.correo.value,
        username: this.form.controls.username.value,
        gender: this.form.controls.sexo.value,
        company: company
      }

      this.service.putUser(user).subscribe(x => {
        if (x !== undefined && x !== null) {
          this.toastr.success(x['message'], 'OK')
        }
      }, (error) => {
        this.toastr.error(error['message'], 'Error')
        console.log(error['message']);

      })

    } else {
      this.toastr.error('Falta Id para actualizar', 'Error');
    }
  }

}
