import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import {CustomerService} from '../../services/customer.service';
import {Customer} from '../../models/Customer'
import { error } from 'protractor';

import { NotifierService } from "angular-notifier";
import { Cities } from 'src/app/models/Cities';

declare var $: any;
@Component({
  templateUrl: './customer.component.html'
})

export class CustomerComponent implements OnInit {
  error = '';
  isEdit = false;
  customers: Customer[]
  customer: Customer
  customerObj = new Customer
  formCustomer: FormGroup
  private readonly notifier: NotifierService;
  cities: Cities[]

  constructor(
    private formBuilder: FormBuilder,
    private customerServices: CustomerService,
    notifierService: NotifierService
  ) { 
    this.formCustomer = this.formBuilder.group({
        documentId: ['', Validators.required],
        firstName: ['', Validators.required],
        lastName: ['',],
        address: ['', Validators.required],
        city: ['',Validators.required],
        cellphone: [''],
    });
    this.notifier = notifierService;
  }

  ngOnInit() {
      this.getCities()
     this.getCustomers()
  }
  get form() { return this.formCustomer.controls; }
  onSubmit(){
      if (this.formCustomer.invalid) {
          this.notifier.notify("warning", "Por favor revise el formulario");
          return;
      }
      
      
      if(!this.isEdit){
        this.customerObj.idCustomer = null;
      }else{
        this.customerObj.idCustomer = this.customer.idCustomer;
      }
      
      this.customerObj.documentId = this.form.documentId.value;
      this.customerObj.firstName = this.form.firstName.value;
      this.customerObj.lastName = this.form.lastName.value;
      this.customerObj.address = this.form.address.value;
      this.customerObj.city = this.form.city.value;
      this.customerObj.cellphone = this.form.cellphone.value;

      this.saveCustomer();
  }

  editCustomer(idCustomer: number):void{
      this.showModal();
      this.isEdit = true;
      this.customer = this.customers.find(r => r.idCustomer == idCustomer);
      console.log(idCustomer);
      this.form["documentId"].setValue(this.customer.documentId);
      this.form["firstName"].setValue(this.customer.firstName);
      this.form["lastName"].setValue(this.customer.lastName);
      this.form["address"].setValue(this.customer.address);
      this.form["city"].setValue(this.customer.city);
      this.form["cellphone"].setValue(this.customer.cellphone);
  }

  showModal():void {
    $("#myModal").modal('show');
    $("#formCustomer")[0].reset();
  }
  hideModal():void {
    $("#myModal").modal('hide');
  }

  getCities(){
    this.customerServices.getCities()
      .subscribe(data => {
        this.cities = data;
      },
      error => {
        console.log(error)
      });
  }

  getCustomers(){
    this.customerServices.getCustomers()
      .subscribe(data => {
        this.customers = data.response;
      },
      error => {
        console.log(error)
      });
  }

  saveCustomer(){
    this.customerServices.saveCustomers(this.customerObj)
    .subscribe(data => {
      this.isEdit = false;
      this.hideModal();
      this.getCustomers();
      if(data.response)
        this.notifier.notify("success", data.msg);
      else
        this.notifier.notify("error", data.msg);
    },error => {
      console.log(error)
      this.isEdit = false;
    })
  }

  deleteCustomer(idCustomer: number){
    this.customerServices.deleteCustomers(idCustomer)
    .subscribe(data => {
      this.getCustomers();
      if(data.response)
        this.notifier.notify("success", data.msg);
      else
        this.notifier.notify("error", data.msg);
    },error => {
      console.log(error)
    })
  }

}
