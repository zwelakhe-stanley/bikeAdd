import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as alertifyjs from 'alertifyjs';

import { map } from 'rxjs/operators';
//import { MatDialog } from '@angular/material/dialog';



@Injectable({
  providedIn: 'root'
})
export class ApiService {
  readonly mergeAPIUrl = "http://localhost:8000/"

  constructor(private httpClient:HttpClient) { }



  addBike(bikeData:{bikeName: string, locale: string, year?: string, contentID: string, primaryImageURL?: string, bikeModel?: string, bikeSpecs?: any, price?: string, description?: string, sku: string, tech?: string, otherMedia?: string}):Observable<any[]>
  {
    if (bikeData.locale != null && bikeData.bikeName != null)
    {
      console.log(bikeData)
      
      return this.httpClient.post<any>(this.mergeAPIUrl, bikeData)
     
      .pipe(map((res:any)=>{
        return res;

      }));
      //return alertifyjs.success("Bike added successfully!")
    }
    else{
      console.log("blahblah")
      return alertifyjs.error("Please enter valid details");
      
    }
  }

  }

