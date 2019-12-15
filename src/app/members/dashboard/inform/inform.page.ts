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
    blockData: any;
    varietyData: any;
    totalItems: number;
    page: number;
    previousPage: number;
    showPagination: boolean;
    viewDate: any;
    codigo_bloque: any;
    codigo_variedad: any;
    fecha_fin: any;
    fecha_inicio: any;


  constructor(private config: NgbPaginationConfig,private authService: AuthenticationService,public apiService: ApiService) {
      this.inventoryData = [];
      this.blockData = [];
      this.varietyData = [];
      this.config.boundaryLinks = true;
  }


  ngOnInit() {
      this.page =1;
      this.previousPage =1;
      this.codigo_bloque='ALL';
      this.codigo_variedad='ALL';
      this.fecha_inicio='2019-11-01';
      this.fecha_fin='2019-12-01';
    this.getBlock();
    this.getVariety();

  }

  getInventory() {

    this.apiService.getInventoryFiltered(this.codigo_bloque,this.codigo_variedad,this.fecha_inicio,this.fecha_fin).subscribe(
        response => {
            console.log(response);
            this.inventoryData = response;
        },
        error => {
          alert('Se produjo un error al consumir el servicio');
        })
  }
    getBlock() {
        this.apiService.getBlocks().subscribe(
            response => {
                this.blockData = response;
            },
            error => {
                alert('Se produjo un error al consumir el servicio');
            })
    }
    getVariety() {
        this.apiService.getVariety().subscribe(
            response => {
                this.varietyData = response;
            },
            error => {
                alert('Se produjo un error al consumir el servicio');
            })
    }

  logout() {
    this.authService.logout();
  }

}
