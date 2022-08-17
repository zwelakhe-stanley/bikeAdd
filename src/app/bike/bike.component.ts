import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { BikeModel } from './bike.model';
import { ApiService } from 'src/app/api.service'
import * as alertifyjs from 'alertifyjs';


@Component({
  selector: 'app-bike',
  templateUrl: './bike.component.html',
  styleUrls: ['./bike.component.css']
})
export class BikeComponent implements OnInit {

  
  formValue !: FormGroup;

  //specs !: FormGroup;
  //specs!: string[];
  specs = [{
    key: "",
    value:""
  }]
 

  
  ind: any;

  bikeModelObj : BikeModel = new BikeModel()

  bikeData = {
    "bikeName":"string",
    "locale":"string",
    "year":"string",
    "contentID":"string",
    "primaryImageURL":"string",
    "bikeModel":"string",
    "bikeSpecs": this.specs,
    "price":"string",
    "description":"string",
    "sku":"string",
    "tech":"string",
    "otherMedia":"string",
  }

  addBikeResp:any;

  constructor(private api: ApiService, public fb: FormBuilder) {

    
   }

  ngOnInit(): void {

    this.formValue = this.fb.group({
      bikeName: [''],
      locale:[''],
      year:[''],
      contentID:[''],
      primaryImageURL:[''],
      bikeModel:[''],
      bikeSpecs: this.specs,
      price:[''],
      description:[''],
      sku:[''],
      tech:[''],
      otherMedia:[''],
      key: [''],
      value: [''],
    })
    
  }

 

  addRow() {
    const specsForm = this.fb.group({
      key: this.formValue.value.key,
      value: this.formValue.value.value
    });
    //console.log(specsForm.value)
    //this.specs = [{key: this.formValue.value.key, value: this.formValue.value.value}]
    //[
      //{"key": this.formValue.value.key, "value": this.formValue.value.value}
    //]

    this.specs.push({key: this.formValue.value.key, value: this.formValue.value.value});
    console.log(this.specs)

    this.formValue.controls['key'].reset();
    this.formValue.controls['value'].reset();


  }




  postBikeDetails(){


    this.bikeData = {
      "bikeName": this.formValue.value.bikeName,
      "locale": this.formValue.value.locale,
      "year": this.formValue.value.year,
      "contentID": this.formValue.value.contentID,
      "primaryImageURL": this.formValue.value.primaryImageURL,
      "bikeModel": this.formValue.value.bikeModel,
      "bikeSpecs": this.specs,
      "price": this.formValue.value.price,
      "description": this.formValue.value.description,
      "sku": this.formValue.value.sku,
      "tech": this.formValue.value.tech,
      "otherMedia": this.formValue.value.otherMedia


    }
    
    //console.log(this.bikeSpecs)
    console.log(this.bikeData.bikeSpecs)
  
    

    

    const bike = this.api.addBike(this.bikeData)
    console.log(bike)

    this.api.addBike(this.bikeData).subscribe(data => {
      console.log(data)
      alertifyjs.success("Bike added Successfully!")
    })


  //  this.formValue.reset(this.formValue.value.value);

  }

}
