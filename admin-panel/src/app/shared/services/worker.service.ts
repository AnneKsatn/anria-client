import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class WorkerService {

  constructor(public firestore: AngularFirestore) { }

  getWorkers(){
    return this.firestore.collection("/workers").snapshotChanges()
  }

  getWorkerById(id: string) {
    return this.firestore.collection("workers").doc(id).get()
  }

  deleteWorkerById(id: string){
    return this.firestore.collection("/workers").doc(id).delete()
  }

    
  //   .subscribe((data: any) => {
  //     let data2 = data.map(function (procedure: any) {
  //       return {
  //         name: procedure.payload.doc.data().surname
  //           + " " +
  //           procedure.payload.doc.data().name
  //           + " " +
  //           procedure.payload.doc.data().patronymic,
  //         phone: procedure.payload.doc.data().phone,
  //         email: procedure.payload.doc.data().email,
  //         department: procedure.payload.doc.data().department,
  //         position: procedure.payload.doc.data().position,
  //         id: procedure.payload.doc.id
  //       }
  //     })

  //     this.data = new MatTableDataSource(data2)
  //   });
  // }
}
