import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import {SalesService} from '../../services/sales.service';
import {CustomerService} from '../../services/customer.service';
import {Sale} from '../../models/Sale'
import { Customer } from 'src/app/models/Customer';

import { NotifierService } from "angular-notifier";

declare var $: any;
@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html'
})
export class SalesComponent implements OnInit {
  error = '';
  isEdit = false;
  sales: Sale[]
  sale: Sale
  customers: Customer[]
  saleObj = new Sale
  formSale: FormGroup
  private readonly notifier: NotifierService;

  constructor(
    private formBuilder: FormBuilder,
    private salesServices: SalesService,
    private customerServices: CustomerService,
    notifierService: NotifierService
  ) { 
      this.formSale = this.formBuilder.group({
        period: ['', Validators.required],
        quantity: ['', Validators.required],
        value: ['',Validators.required],
        idCustomer: ['', Validators.required]
      });

      this.notifier = notifierService;
  }

  ngOnInit() {
    this.getCustomers()
    this.getSales()
  }
  get form() { return this.formSale.controls; }
 
  onSubmit(){
    if (this.formSale.invalid) {
        this.notifier.notify("warning", "Por favor revise el formulario");
        return;
    }
    if(!this.isEdit){
      this.saleObj.idSale = null;
    }else{
      this.saleObj.idSale = this.sale.idSale;
    }
    
    this.saleObj.period = this.form.period.value;
    this.saleObj.value = this.form.value.value;
    this.saleObj.quantity = this.form.quantity.value;
    this.saleObj.idCustomer = parseInt(this.form.idCustomer.value);

    this.saveSales();
  }

  editSale(idSale: number){
      this.showModal();
      this.isEdit = true;
      this.sale = this.sales.find(r => r.idSale == idSale);
      this.form["period"].setValue(this.sale.period);
      this.form["quantity"].setValue(this.sale.quantity);
      this.form["value"].setValue(this.sale.value);
      this.form["idCustomer"].setValue(this.sale.idCustomer);
  }

  showModal():void {
    $("#myModal").modal('show');
    $("#formSale")[0].reset();
  }
  hideModal():void {
    $("#myModal").modal('hide');
  }

  getSales() {
    this.salesServices.getSales()
      .subscribe(data => {
        this.sales = data.response;
      },
      error => {
        console.log(error)
      });
  }

  saveSales(){
    this.salesServices.saveSales(this.saleObj)
    .subscribe(data => {
      this.isEdit = false;
      this.hideModal();
      this.getSales();
      if(data.response)
        this.notifier.notify("success", data.msg);
      else
        this.notifier.notify("error", data.msg);
    },error => {
      console.log(error)
      this.isEdit = false;
    })
  }

  deleteSale(idSale: number){
    this.salesServices.deletesales(idSale)
    .subscribe(data => {
      this.getSales();
      if(data.response)
        this.notifier.notify("success", data.msg);
      else
        this.notifier.notify("error", data.msg);
    },error => {
      console.log(error)
    })
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

}
