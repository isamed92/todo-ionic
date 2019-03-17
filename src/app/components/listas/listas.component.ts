import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { DeseosService } from 'src/app/services/deseos.service';
import { Router } from '@angular/router';
import { AlertController, IonList } from '@ionic/angular';
import { Lista } from 'models/lista.model';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent implements OnInit {
  @ViewChild(IonList) lista: IonList;
  @Input() terminada = true;


  ngOnInit() {}


  constructor(
    public deseosService: DeseosService,
    private router: Router,
    private alertCtrl: AlertController) {
  }

  listaSeleccionada(lista: Lista) {
    if ( this.terminada ) {
      this.router.navigateByUrl(`/tabs/tab2/agregar/${lista.id}`);
    } else {
      this.router.navigateByUrl(`/tabs/tab1/agregar/${lista.id}`);
    }
    // console.log(lista);
  }

  borrarLista( lista: Lista ) {
    this.deseosService.borrarLista(lista);
  }

  async editarLista( lista: Lista ) {
    const alert = await this.alertCtrl.create({
      header: 'Editar lista',
      inputs: [{
        name: 'titulo',
        type: 'text',
        value: lista.titulo,
        placeholder: 'Nombre de la lista'
      }],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            this.lista.closeSlidingItems();
            // console.log('Cancelar');
          }
        },
        {
          text: 'Editar',
          handler: (data) => {
            console.log(data);
            if (data.titulo.length === 0) {
              return;
            }
            lista.titulo = data.titulo;
            this.deseosService.guardarStorage();
            this.lista.closeSlidingItems();
          }
        }
      ]
    });
    alert.present();

  }
}
