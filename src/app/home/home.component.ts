import {Component, OnInit, ViewChild} from '@angular/core';
import {Chart} from 'node_modules/chart.js';
import {ChartsService} from '../services/charts.service';
import {MatTableDataSource} from "@angular/material/table";
import {PolicyService} from "../services/policy.service";
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'aga-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  columnsToDisplay = ['policyNumber', 'daysToEnd'];
  expirePolicies: MatTableDataSource<any>;

  userAllPolicies: number;
  customersAll: number;

  allPoliciesByKind: any;
  policiesByKind: any;
  salesDuringYear: any;
  dataCustomersLine: any;
  addedPoliciesBar: any;

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private chartsService: ChartsService, private policyService: PolicyService) {
  }

  ngOnInit(): void {
    this.policyService.getExpirePolicies().subscribe(policies => {
      this.expirePolicies = new MatTableDataSource<any>(policies);
    });

    // this.expirePolicies.sort = this.sort;

    this.chartsService.getSalesDuringYear().subscribe(chartData => {
      this.salesDuringYear = {
        datasets: [{
          data: chartData.data,
          backgroundColor: '#47a5ef',
          borderColor: '#5ba5ef',
          pointBackgroundColor: '#3d88de',
          pointBorderColor: '#ffffff',
          pointRadius: 4,
          lineTension: 0,
          borderWidth: 2,
          hoverBackgroundColor: '#000000'
        }],
        labels: chartData.labels
      };

      const myLineChart = new Chart('lineSaleChart', {
        type: 'line',
        data: this.salesDuringYear,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          legend: {
            display: false
          },
          scales: {
            yAxes: [{
              gridLines: {
                display: false,
              },
              ticks: {
                fontColor: 'white',
                stepSize: 1,
                fontSize: 18,
              }
            }],
            xAxes: [{
              gridLines: {
                display: false,
              },
              ticks: {
                fontColor: 'white',
                fontSize: 15,
              }
            }]
          }
        }
      });
    });

    this.chartsService.getPoliciesByKind().subscribe(chartData => {
      this.policiesByKind = {
        datasets: [{
          data: chartData.data,
          backgroundColor: ['#2a3132', '#336b87', '#90afc5']
        }],
        labels: chartData.labels
      };

      const policyByKind = new Chart('policiesByKind', {
        type: 'pie',
        data: this.policiesByKind,
        options: {
          responsive: true,
          legend: {
            position: 'bottom'
          }
        }
      });
    });

    this.chartsService.getLastWeekAddedPolicies().subscribe(chartData => {
      this.userAllPolicies = chartData.extraData;
      this.addedPoliciesBar = {
        datasets: [{
          data: chartData.data,
          backgroundColor: '#6ca8ee',
          borderColor: '#ffffff'
        }],
        labels: chartData.labels
      };

      const addesPolisyBar = new Chart('addedPolicies', {
        type: 'bar',
        data: this.addedPoliciesBar,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          legend: {
            display: false
          },
          scales: {
            yAxes: [{
              display: false,
              ticks: {
                beginAtZero: true,
                stepSize: 1,
                min: 0
              }
            }],
            xAxes: [{
              gridLines: {
                display: false,
              }
            }]
          },
          layout: {
            padding: {
              bottom: 5,
              left: 10,
              right: 10,
              top: 15
            }
          }
        }
      });
    });

    this.chartsService.getLastWeekCreatedCustomers().subscribe(chartData => {
      this.customersAll = chartData.extraData;
      this.dataCustomersLine = {
        datasets: [{
          data: chartData.data,
          fill: false,
          borderColor: '#0e57cb',
          pointBackgroundColor: '#3d88de',
          pointBorderColor: '#ffffff',
          pointRadius: 6,
          lineTension: 0.5,
          borderWidth: 4
        }],
        labels: chartData.labels
      };

      const myLineCustomers = new Chart('customersLine', {
        type: 'line',
        data: this.dataCustomersLine,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          legend: {
            display: false
          },
          scales: {
            yAxes: [{
              display: false
            }],
            xAxes: [{
              display: false
            }]
          },
          layout: {
            padding: {
              left: 10,
              right: 10,
              bottom: 5,
              top: 15
            }
          }
        }
      });
    });

    this.chartsService.getAllPoliciesByKind().subscribe(chartData => {
      console.log(chartData);
      this.allPoliciesByKind = {
        datasets: [{
          data: chartData.data,
          backgroundColor: ['#2a3132', '#336b87', '#90afc5']
        }],
        labels: chartData.labels
      };

      const allPoliciesByKindChart = new Chart('allPoliciesByKind', {
        type: 'pie',
        data: this.allPoliciesByKind,
        options: {
          responsive: true,
          legend: {
            position: 'bottom'
          }
        }
      });
    });
  }

}
