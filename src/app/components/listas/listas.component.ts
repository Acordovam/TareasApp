import {Component, Input, OnInit} from '@angular/core';
import {Lista} from '../../models/lista.model';
import {Router} from '@angular/router';
import {DeseosService} from '../../services/deseos.service';
import {AlertController} from '@ionic/angular';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent implements OnInit {
  listas: Lista[] = [];
  @Input() terminada = true;
  constructor(private router: Router, public deseosService: DeseosService, private alertCtrl: AlertController) {
    this.listas = deseosService.listas;
  }

  ngOnInit() {}
  listaSeleccionada(lista: Lista){
    if (this.terminada === true){
      this.router.navigateByUrl(`/tab2/agregar/${lista.id}`);
    }else{
      this.router.navigateByUrl(`/tab1/agregar/${lista.id}`);
    }

  }
  borrar(item: Lista){
    this.deseosService.borrarLista(item);
    this.listas = this.deseosService.listas;
  }
  async editarTitulo(lista: Lista) {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Editar Titulo',
      inputs: [
        {
          name: 'titulo',
          type: 'text',
          value: lista.titulo,
          placeholder: 'Nuevo Nombre'
        }],
      buttons: [{
        text: 'Cancelar',
        role: 'cancel',
        handler: () => {
          console.log('Cancelar');
        }
      }, {
        text: 'Guardar',
        handler: (data) => {
          if (data.titulo.length === 0 || data.titulo === lista.titulo){
            return;
          }else{
            // Editar Lista Lista
            this.deseosService.editarTitulo(data.titulo, lista);
          }
        }
      }],
    });

    alert.present();
  }
}
