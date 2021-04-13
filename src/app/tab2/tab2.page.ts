import { Component } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FotoService } from '../services/foto.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  urlImageStorage : string[] = [];

  judul : String;
  isi : String;
  tanggal : Date;
  rating : Number;

  indexFoto = [];
  indexFotoCounter = 0;

  constructor(
    public fotoService:FotoService, 
    private afStorage : AngularFireStorage
    ) {}

  async ngOnInit(){
    await this.fotoService.loadFoto();
  }

  addPictures(){
    this.fotoService.tambahFoto();
    this.indexFoto.push(this.indexFotoCounter);
    this.indexFotoCounter++;
  }

  saveNote(){
    // var today = new Date();
    // this.tanggal = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();


  }

}
