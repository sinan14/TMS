import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trainerallocation',
  templateUrl: './trainerallocation.component.html',
  styleUrls: ['./trainerallocation.component.css']
})
export class TrainerallocationComponent implements OnInit {
  trainer={
    fname:'',
  lname: '',
  address: '',
  email: '',
  phno: '',
  qual:'',
  skill: '',
  comp: '',
  desgn: '',
  course: '',
  img: '',
  typeemp:'',
  startdate :'',
  enddate:'',
  time:'',
  courseid:'',
  batchid:'',
  meetinglink:''
  }
  courseids=[
    "CXR001","CSA002","FSD003",
    "DSA004","RPA005",
    "DMS006","MLAI007",
    "MOODLE008","ARM009 ","IOT010","AWSEDU011"
  ]
  tname:any;
   allocateddetails:any=[];
  constructor(private trainerlistService:AdminService,private router:Router) { }
  
  ngOnInit(): void {
   
    var allocateddetails=[];
    
    let  trainerId = localStorage.getItem("gettrainerId");
    this.trainerlistService.getTrainer(trainerId).subscribe((data:any) =>{
      this.trainer = JSON.parse(JSON.stringify(data));
      
      console.log(this.trainer)
      this.tname=this.trainer.fname +' '+this.trainer.lname;
    })
    var email=localStorage.getItem('trainermail');
  this.trainerlistService.checkDates(email).subscribe((data)=>{
    allocateddetails=JSON.parse(JSON.stringify(data));
    console.log(allocateddetails)
    var len=allocateddetails.length;
    for(let i=0;i<len;i++){
      var startdate=allocateddetails[i].startdate;
      var enddate=allocateddetails[i].enddate;
      this.dates.push({'startdate':startdate,'enddate':enddate})
    }
    console.log(this.dates);
    this.allocateddetails=allocateddetails;

  })
   
  }
  schedule(){
    console.log(this.trainer);
    this.trainerlistService.schedule(this.trainer);
    this.router.navigate(['/admin/dashboard']);

  }
  

filter(){
  var dt = new Date(this.trainer.startdate);
  var dte=new Date(this.trainer.enddate);
   if(dt>=dte){
    alert('Start date should be before end date!');
    this.trainer.startdate='';
      this.trainer.enddate=''
      
  }
  else{
    for(let i=0;i<this.dates.length;i++){
      var start=new Date (this.dates[i].startdate);
      var end=new Date(this.dates[i].enddate);
      console.log(dt.getTime());
      console.log(start.getTime())
     if((dt.getTime()>=start.getTime() && dte.getTime()<=end.getTime())||(dt.getTime()>=start.getTime()&&dt.getTime()<=end.getTime())||(dte.getTime()>=start.getTime()&&dte.getTime()<=end.getTime()))
   
   
     {
        alert('Already alloacted between '+this.dates[i].startdate+' and '+this.dates[i].enddate);
        this.trainer.startdate='';
        this.trainer.enddate=''
        break;
     }
    }
  }
   
}


dates:any=[];



validate(){
 
  console.log(this.dates);
     var dt = new Date(this.trainer.startdate);
     var dte=new Date(this.trainer.enddate);
     if(this.trainer.startdate==''){
       alert('Choose a starting date');
       this.trainer.startdate='';
         this.trainer.enddate=''
     }
     else if(dt>=dte){
       alert('Start date should be before end date!');
       this.trainer.startdate='';
         this.trainer.enddate=''
         
     }
     else{
      for(let i=0;i<this.dates.length;i++){
        var start=new Date (this.dates[i].startdate);
        var end=new Date(this.dates[i].enddate);
        console.log(dt.getTime());
        console.log(start.getTime())
       if((dt.getTime()>=start.getTime() && dte.getTime()<=end.getTime())||(dt.getTime()>=start.getTime()&&dt.getTime()<=end.getTime())||(dte.getTime()>=start.getTime()&&dte.getTime()<=end.getTime()))
     
     
       {
          alert('Already alloacted between '+this.dates[i].startdate+' and '+this.dates[i].enddate);
          this.trainer.startdate='';
          this.trainer.enddate=''
          break;
       }
      }
     }
     
}

}
