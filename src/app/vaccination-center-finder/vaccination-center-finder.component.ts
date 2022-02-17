import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../http.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-vaccination-center-finder',
  templateUrl: './vaccination-center-finder.component.html',
  styleUrls: ['./vaccination-center-finder.component.css']
})
export class VaccinationCenterFinderComponent implements OnInit {

  selectedState = "";
  selectedDistrict = "";
  stateList: any = [];
  districtList: any = [];
  slotData: any = [];
  nextDaySlotData:any =[];
 
  thirdDaySlotData:any = [];
  pinActive = false;
  distActive = true;
  submitted = false;
  latestDate ="";
  nextDate = "";
  thirdDate="";


  constructor(private http: HttpService, private fb: FormBuilder) { }

  pinForm!: FormGroup

  ngOnInit(): void {
    this.getState();
    this.todayDate()
    this.createPinForm();
    
  }

  createPinForm() {
    this.pinForm = this.fb.group({
      pin: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]]
    });
  }

  get p() { return this.pinForm.get('pin'); }

  distTab() {
    this.distActive = true;
    this.pinActive = false;
    console.log(this.other)
  }

  pinTab() {
    this.distActive = false;
    this.pinActive = true;
    
  }

  getState() {
    this.http.get(`http://api.ngminds.com/states.json`).subscribe({
      next: (res: any) => {
        this.stateList = res.states;
        console.log(this.stateList)

      },
      error: (err: any) => {
        console.log(err);
      }
    })

  }

  getDistrict() {
    this.http.get(`http://api.ngminds.com/${this.selectedState}.json`).subscribe({
      next: (res: any) => {
        this.districtList = res.districts
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }

  getByDistrict() {
    let params: any = {
      district_id: this.selectedDistrict,
      date: this.latestDate
    }
    this.http.get(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict`, { params }).subscribe({
      next: (res: any) => {
        this.slotData = res.sessions;
        this.other = _.merge(this.slotData, this.nextDaySlotData)
        console.log(this.other)
        console.log(this.slotData)
      },
      error: (err: any) => {
        console.log(err);
      }
    })
    this.nextDayData();
    this.thirdDay();
  }

  getByPin() {
    this.submitted = true;

    if (this.pinForm.invalid) {
      return;
    }

    let params: any = {
      pincode: this.pinForm.value.pin,
      date: this.latestDate
    }
    this.http.get(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin`, { params }).subscribe({
      next: (res: any) => {
        this.slotData = res.sessions;
        console.log(this.slotData)
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }

  nextDayData(){
    let params: any = {
      district_id: this.selectedDistrict,
      date: this.nextDate
    }
    this.http.get(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict`, { params }).subscribe({
      next: (res: any) => {
        this.nextDaySlotData = res.sessions;
        console.log(this.nextDaySlotData)
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }

  thirdDay(){
    let params: any = {
      district_id: this.selectedDistrict,
      date: this.thirdDate
    }
    this.http.get(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict`, { params }).subscribe({
      next: (res: any) => {
        this.thirdDaySlotData = res.sessions;
        console.log(this.thirdDaySlotData)
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }

  todayDate() {
    var currentDate = new Date()
    var day = currentDate.getDate()
    var month = currentDate.getMonth() + 1
    var year = currentDate.getFullYear()
    // document.write()
    this.latestDate = day + "-" + month + "-" + year;
    this.nextDate = (day + 1)+"-" + month + "-" + year;
    this.thirdDate = (day + 2)+"-" + month + "-" + year
    console.log(this.nextDate)
  }

  
}
