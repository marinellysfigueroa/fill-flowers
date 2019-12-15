import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../../services/authentication.service";
import {ApiService} from "../../../services/api.service";
import {NgbPaginationConfig} from "@ng-bootstrap/ng-bootstrap";


@Component({
  selector: 'app-inform',
  templateUrl: './inform.page.html',
  styleUrls: ['./inform.page.scss'],
    providers: [NgbPaginationConfig]
})
export class InformPage implements OnInit {
    inventoryData: any;
    totalItems: number;
    page: number;
    previousPage: number;
    showPagination: boolean;
    viewDate: any;


  constructor(private config: NgbPaginationConfig,private authService: AuthenticationService,public apiService: ApiService) {
      this.inventoryData = [];
      this.config.boundaryLinks = true;
  }


  ngOnInit() {
      this.page =1;
      this.previousPage =1;




  }
    loadPage(page: number) {
        if (page !== this.previousPage) {
            this.previousPage = page;
            this.getInventory(this.page-1);
        }
    }
  getInventory(page:number) {

    this.apiService.getList().subscribe(
        response => {

          //this.inventoryData = response;
          console.log(response);

          if ((!response && !response.data) || (Number(response.message) ==0)) {
            this.inventoryData = [];
            this.showPagination = false;
          }
          else {
            this.inventoryData = response.data;
            this.totalItems =  Number(response.message);
            this.showPagination = true;
          }

        },
        error => {
          alert('Se produjo un error al consumir el servicio');

        })

    var formElement = <HTMLFormElement>document.getElementById('inform');
    formElement.style.display='block';
  }
  logout() {
    this.authService.logout();
  }

}
