import { Component, OnInit } from '@angular/core';
import { DeseosService } from 'src/app/services/deseos.service';
import { ActivatedRoute } from '@angular/router';
import { Lista } from 'models/lista.model';
import { ListaItem } from 'models/lista-item.model';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {

  lista: Lista;
  nombreItem = '';
  constructor(
    private deseosService: DeseosService,
    private route: ActivatedRoute
  ) {
    const listaId = this.route.snapshot.paramMap.get('listaId');
    // console.log(listaId);
    this.lista = this.deseosService.obtenerLista(listaId);
    // console.log(this.lista);
   }

  ngOnInit() {
  }


  agregarItem() {
    if (this.nombreItem.length === 0) {
      return;
    }

    const nuevoItem = new ListaItem(this.nombreItem);
    this.lista.items.push(nuevoItem);

    this.nombreItem = '';
    this.deseosService.guardarStorage();
  }

  cambioChange(item: ListaItem) {
    const pendientes = this.lista.items
                                 .filter(itemData => !itemData.completado)
                                 .length;
    // console.log({pendientes});
    if (pendientes === 0) {
      this.lista.terminadaEn = new Date();
      this.lista.completada = true;
    } else {
      this.lista.terminadaEn = null;
      this.lista.completada = false;
    }
    // console.log(item);
    this.deseosService.guardarStorage();
  }

  borrarItem(i) {
    this.lista.items.splice(i, 1);
    this.deseosService.guardarStorage();
  }

}
