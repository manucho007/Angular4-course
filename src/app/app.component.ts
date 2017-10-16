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
  // myNotes: AngularFireList<any[]>;
  myNotes:any;
  constructor(public afDB: AngularFireDatabase){
      afDB.list('/notas').valueChanges().subscribe(notas=>{
            this.myNotes=notas;
          });
  }
  note={id:null, title:null, description:null};
  show_form = false;
  editing = false;
  getNotes(){
    return this.afDB.list<any>('/notas');
  };
  addNote(){
    this.show_form =true;
    this.editing=false;
    this.note ={id:null, title:null, description:null};
  };
  cancel(){
    this.show_form =false;
  };
  createNote(){
    this.note.id =Date.now();
    this.afDB.database.ref('notas/' + this.note.id).set(this.note);
    this.show_form=false;
    this.note ={id:null, title:null, description:null};
  };
  viewNote(note){
    this.editing=true;
    this.note=note;
    this.show_form =true;
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
  //function for firebase

}
