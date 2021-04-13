import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { FotoService } from '../services/foto.service';

interface data {
  judulFace : string,
  isiFace : string,
  tanggalFace : Date,
  nilaiFace : Number
}

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

export class Tab2Page {

  urlImageStorage : string[] = [];

  judul : string;
  isi : string;
  tanggal : Date;
  nilai : Number;

  isiData : Observable<data[]>;
  isiDataColl : AngularFirestoreCollection<data>;

  indexFoto = [];
  indexFotoCounter = 0;

  constructor(
    public fotoService:FotoService, 
    private afStorage : AngularFireStorage,
    private afs : AngularFirestore
    ) 
    {
      this.isiDataColl = afs.collection('Notes');
      this.isiData = this.isiDataColl.valueChanges();

      this.isiData.subscribe(result => {console.log(result.length)});
    }

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

    var dataLength = 0;
    this.isiData.subscribe(result => {dataLength = result.length})
    var NoteID = "Note-"+dataLength;
    console.log(NoteID);

    this.isiDataColl.doc(NoteID).set({
      judulFace : this.judul,
      isiFace : this.isi,
      tanggalFace : this.tanggal,
      nilaiFace : this.nilai
    });

    //upload gambar
    this.urlImageStorage = [];
    for(var i = 0; i < this.indexFoto.length; i++){
      const imgFilepath = NoteID+`/${this.fotoService.dataFoto[this.indexFoto[i]].filePath}`;
       
      this.afStorage.upload(imgFilepath, this.fotoService.dataFoto[this.indexFoto[i]].dataImage).then(()=>{
        this.afStorage.storage.ref().child(imgFilepath).getDownloadURL().then((url)=>{
          this.urlImageStorage.unshift(url)
        });
      });
    }

    this.isiData = this.isiDataColl.valueChanges();

  }
}
