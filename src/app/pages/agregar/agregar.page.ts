import { Component, OnInit } from '@angular/core';
import {DeseosService} from '../../services/deseos.service';
import { ActivatedRoute} from '@angular/router';
import {Lista} from '../../models/lista.model';
import {ListaItem} from '../../models/lista-item.model.';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {
lista: Lista;
nombreItem = '';
  constructor(private deseosService: DeseosService, private route: ActivatedRoute) {
  const listId = this.route.snapshot.paramMap.get('listaId');
  this.lista = this.deseosService.obtenerLista(listId);

  }

  ngOnInit() {
  }
  agregarItem(){
  if (this.nombreItem.length === 0){
    return;
  }
  const newItem = new ListaItem(this.nombreItem);
  this.lista.items.push(newItem);
  this.nombreItem = '';
  this.deseosService.guardarStorage();
  }
  cambioCheck(item: ListaItem){
    const pendientes = this.lista.items.filter( itemData => !itemData.completado)
        .length;
    if (pendientes === 0){
      this.lista.terminadaEn = new Date();
      this.lista.terminada = true;
    }else{
      this.lista.terminadaEn = null;
      this.lista.terminada = false;
    }
    this.deseosService.guardarStorage();
  }
  borrar(id: number){
    this.lista.items.splice(id, 1);
    this.deseosService.guardarStorage();
  }
}
