import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { TrainersSearchModel } from './trainerssearch.module';
import { Router } from '@angular/router';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
 trainerslist:TrainersSearchModel[]=[]
  constructor(private adminservice:AdminService, private router:Router) { }

  ngOnInit(): void {
    this.adminservice.getTrainers().subscribe((trainers)=>{
    this.trainerslist=(JSON.parse(JSON.stringify(trainers)))})
  }
namesearch="";
skillsearch="";
typesearch="";
coursesearch="";
updateName(event:any){
 this.namesearch=event.target.value;
}
searchName(){
 this.adminservice.searchByName(this.namesearch).subscribe((trainers)=>{
   this.trainerslist=JSON.parse(JSON.stringify(trainers));
 })
}
updateSkill(event:any){
 this.skillsearch=event.target.value;
}
searchSkill(){
  this.adminservice.searchBySkill(this.skillsearch).subscribe((trainers)=>{
    this.trainerslist=JSON.parse(JSON.stringify(trainers));
  })
}
updateType(event:any){
  this.typesearch=event.target.value;
}
searchType(){
  this.adminservice.searchByType(this.typesearch).subscribe((trainers)=>{
    this.trainerslist=JSON.parse(JSON.stringify(trainers));
  })
}
updateCourse(event:any){
  this.coursesearch=event.target.value;
}
searchCourse(){
  
  this.adminservice.searchByCourse(this.coursesearch).subscribe((trainers)=>{
    this.trainerslist=JSON.parse(JSON.stringify(trainers));
  })
}
Allocate(trainer:any){
  localStorage.setItem("gettrainerId", trainer._id.toString());
  
  this.router.navigate(['/admin/allocation']);

}
}
