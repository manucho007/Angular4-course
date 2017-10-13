import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  myNotes =[
    {id:1, title:"Note 1", description:"Description for note 1"},
    {id:2, title:"Note 2", description:"Description for note 2"},
    {id:3, title:"Note 3", description:"Description for note 3"},
    {id:4, title:"Note 4", description:"Description for note 4"},
    {id:5, title:"Note 5", description:"Description for note 5"},
    {id:6, title:"Note 6", description:"Description for note 6"},
  ];
  note={title:null, body:null};
  show_form = false;
  addNote(){
    this.show_form =true;
  };
  cancel(){
    this.show_form =false;
  };
}
