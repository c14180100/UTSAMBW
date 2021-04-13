import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { ActivatedRoute} from '@angular/router';
import { Observable } from 'rxjs';

interface data {
  judulFace : string,
  isiFace : string,
  tanggalFace : Date,
  nilaiFace : Number
}

export class Tab3Page {

  isiData : Observable<data[]>;
  isiDataColl : AngularFirestoreCollection<data>;

  indexData : Number;

  constructor(private route : ActivatedRoute, afs : AngularFirestore) {
    this.isiDataColl = afs.collection('Notes');
    this.isiData = this.isiDataColl.valueChanges();
  }

  async ngOnInit(){
    this.indexData = parseInt(this.route.snapshot.paramMap.get('iFoto'));
  }

}
