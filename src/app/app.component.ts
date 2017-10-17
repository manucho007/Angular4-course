import { Component,OnInit } from '@angular/core';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
    //Static values
  // myNotes =[
  //   {id:1, title:"Note 1", description:"Description for note 1"},
  //   {id:2, title:"Note 2", description:"Description for note 2"},
  //   {id:3, title:"Note 3", description:"Description for note 3"},
  //   {id:4, title:"Note 4", description:"Description for note 4"},
  //   {id:5, title:"Note 5", description:"Description for note 5"},
  //   {id:6, title:"Note 6", description:"Description for note 6"},
  // ];
    //It's no longer FirebaselistObservable
  myNotes:any;
  myNottesOffline = [];
  constructor(public afDB: AngularFireDatabase){
      //Fixed the problem
      if(navigator.onLine){
        afDB.list('/notas').valueChanges().subscribe(
          notas=>{
          this.myNotes=notas;
          localStorage.setItem('myNotes',JSON.stringify(this.myNotes));
            });
      }else{
        this.myNotes= JSON.parse(localStorage.getItem('myNotes'));
      }
      //Instead of the sync button, just verifies the connection every 5 sec
      setInterval(()=>{
        if(navigator.onLine){
          if(this.myNottesOffline.length>0){
            this.syncronize();
            console.log('Updated ')
          }
        }else{
          console.log('Offline');
        }
      },5000);
  }
  removeNote(){
    if(navigator.onLine){
      this.afDB.database.ref('notas/' + this.note.id).remove();
    }else{
      this.myNotes.forEach((nota, i) => {
          if(nota.id==this.note.id){
            this.myNotes.splice(i);
          }
      });
        this.myNottesOffline.push({
        id: this.note.id,
        action: 'remove'
      });
    }
    this.note ={id:null, title:null, description:null};
    this.show_form =false;
    localStorage.setItem('myNotes',JSON.stringify(this.myNotes));
  };


  note={id:null, title:null, description:null};
  show_form = false;
  editing = false;
  addNote(){
    this.show_form =true;
    this.editing=false;
    this.note ={id:null, title:null, description:null};
  };
  cancel(){
    this.show_form =false;
  };
  createNote(){
    if(this.editing){
        if(navigator.onLine){
          //Use the same ID
          this.afDB.database.ref('notas/' + this.note.id).set(this.note);
        }else{
          this.myNotes.forEach((nota) => {
              if(nota.id==this.note.id){
                nota=this.note;
              }
          });
          this.myNottesOffline.push({
            id: this.note.id,
            note: this.note,
            action: 'edit'
          });
        }
    }else{
        //Create a new Timestamp ID
        this.note.id =Date.now();
        if(navigator.onLine){
          this.afDB.database.ref('notas/' + this.note.id).set(this.note);
        }else{
          this.myNotes.push(this.note);
          this.myNottesOffline.push({
            id: this.note.id,
            note: this.note,
            action: 'create'
          });
        }
    }
    localStorage.setItem('myNotes',JSON.stringify(this.myNotes));
    this.show_form=false;
    this.note ={id:null, title:null, description:null};
  };
  viewNote(note){
    this.editing=true;
    this.note=note;
    this.show_form =true;
  };
  //Offline behavior, so the list updates in firebase after the network is back
  syncronize(){
    this.myNottesOffline.forEach((record) => {
        switch(record.action){
          case 'create':
            this.afDB.database.ref('notas/' + record.note.id).set(record.note);
            break;
          case 'edit':
            this.afDB.database.ref('notas/' + record.note.id).set(record.note);
            break;
          case 'remove':
            this.afDB.database.ref('notas/' + record.id).remove();
            break;
          default:
              console.log('Not valid');
        }
        //It solves the duplicity on resuming the connection
        this.myNottesOffline.unshift();
    });
  };
  // Llamada a los NgModels del HTML
  // createNote(){
  //   //functionto work with the static values
  //   // if(this.editing){
  //   //   var me=this;
  //   //   this.myNotes.forEach(function(el, i){
  //   //     if(el.id===me.note.id){
  //   //       me.myNotes[i] = me.note;
  //   //     }
  //   //   });
  //   //   me.show_form = false;
  //   //
  //   // }else
  //   // {
  //   //   this.note.id =Date.now();
  //   //   this.myNotes.push(this.note);
  //   //   this.show_form = false;
  //   //   this.note ={id:null, title:null, description:null};
  //   // }
  // };
  //function to work with the static data
  // deleteNote(){
  //   var me=this;
  //   this.myNotes.forEach(function(e,i){
  //     if(e==me.note){
  //       me.myNotes.splice(i, 1);
  //     }
  //   });
  //   me.show_form = false;
  //   this.note ={id:null, title:null, description:null};
  // };

}
