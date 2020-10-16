import { Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {CustomerService} from '../../services/customer.service';
import {Customer} from '../../models/Customer'
import * as Highcharts from 'highcharts';

import {HomeService} from '../../services/home.service'
import {Dashboard} from '../../models/Dashboard'
import {Chart} from '../../models/Chart'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit{
  updateFlag = false;
  customers: Customer[]
  Highcharts = Highcharts;
  dashboard: Dashboard
  chartSeries: any = []
  

  chartOptions = {
    chart: {
      type: "column",
      width: 900           
    },
    title: { text: "Ventas x Cliente"},
    yAxis:{
      title:{text:"Cantidad Vendida"}
    },
    series: []
  };
  constructor(
    private customerServices: CustomerService,
    private homeService: HomeService,
  ) { 
  }

  ngOnInit() {
    this.getDashboard()
    this.getCustomers()
  }
  changeCustomer(idCustomer : any){
    this.homeService.getCharts(idCustomer)
      .subscribe(data => {
        var datos: any = [];
        data.response.forEach(element => {
          var chartres: any = {};
          chartres.name = element.period;
          chartres.data = [element.total];
          chartres.type = "column";
          datos.push(chartres);
        });
        this.chartOptions.series = datos
        this.updateFlag = true;
      },
      error => {
        console.log(error)
      });
  }

  getDashboard(){
    this.homeService.getDashboard()
      .subscribe(data => {
        this.dashboard = data.response;
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

}
