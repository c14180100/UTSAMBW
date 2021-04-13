import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

interface data {
  judulFace : string,
  isiFace : string,
  tanggalFace : Date,
  nilaiFace : Number
}

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  isiData : Observable<data[]>;
  isiDataColl : AngularFirestoreCollection<data>;

  constructor(private router : Router, afs : AngularFirestore) {
    this.isiDataColl = afs.collection('Notes');
    this.isiData = this.isiDataColl.valueChanges();
  }

  createNote(){
    this.router.navigateByUrl("tab2");
  }

  seeDetails(id){
    this.router.navigateByUrl("tab3/"+id);
  }
}
