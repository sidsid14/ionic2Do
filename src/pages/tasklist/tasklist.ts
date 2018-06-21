import { Component } from '@angular/core';
import { NavController, ItemSliding } from 'ionic-angular';
import { AngularFireDatabase, AngularFireObject} from 'angularfire2/database';
import { Dialogs } from '@ionic-native/dialogs';
import {Task} from './task';
import { Observable } from 'rxjs';
@Component({
  selector: 'page-tasklist',
  templateUrl: 'tasklist.html',
})
export class TaskListPage {
  
  tasks: Array<Task> = [];
  
  // constructor(public navCtrl: NavController, db: AngularFireDatabase) {
  // //   this.tasks=[{title:'Milk',status:'open'},
  // //   {title:'Eggs',status:'open'},
  // //   {title:'Syrup',status:'open'},
  // //   {title:'Pancake',status:'open'}
  // // ];

  itemRef: AngularFireObject<any>;
  item: Observable<any>;
  constructor(public navCtrl: NavController, db: AngularFireDatabase,public dialogs: Dialogs) {
    this.itemRef = db.object('tasks');
    this.itemRef.snapshotChanges().subscribe(action => {
        this.item = action.payload.val();
        this.tasks = [];
        for(var key in this.item){
          var obj = this.item[key];
          this.tasks.push(obj);       
        }
      });
  }

  addItem(){
    let theNewTask: string = prompt("New Task");
    console.log("new task ="+theNewTask);
    if(theNewTask != '' && theNewTask != null){    
      this.tasks.push({title:theNewTask, status : "open"});
      this.itemRef.set(this.tasks);
     }
    // this.dialogs.prompt('Add a task', 'Ionic2Do',["Ok", "Cancel"],'').then(
    //   theResult => {
    //     if((theResult.buttonIndex == 1) && (theResult.input1 !== '')){
    //      this.tasks.push({title:theResult.input1, status : "open"});
    //      this.itemRef.set(this.tasks);
    //     }
    //   }
    // )
  }

  markAsDone(slidingItem:ItemSliding, task: Task){    
   task.status="done";
   this.itemRef.set(this.tasks);
   slidingItem.close();
  }

  removeTask(slidingItem:ItemSliding, task: Task){
    task.status="removed";
    let index = this.tasks.indexOf(task);
    if(index > -1){
      this.tasks.splice(index,1);
    }
    this.itemRef.set(this.tasks);
    slidingItem.close();    
  }

}
