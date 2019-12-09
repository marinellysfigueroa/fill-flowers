import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Platform } from '@ionic/angular';
import { ApiService } from '../../services/api.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss']
})
export class DashboardPage implements OnInit {
  
  inventoryData: any;
  databaseObj: SQLiteObject; // Database instance object
  name_model:string = ""; // Input field model
  row_data: any = []; // Table rows
  readonly database_name:string = "fillcoflowers.db"; // DB name
  readonly table_name:string = "inventory"; // 

  constructor(private platform: Platform,private authService: AuthenticationService,
    private sqlite: SQLite,public apiService: ApiService) { 
      
    this.inventoryData = [];
/*
    this.platform.ready().then(() => {
      this.createDB();
    }).catch(error => {
      console.log(error);
    })
    */

  }

  

  ngOnInit() {
    var formElement = <HTMLFormElement>document.getElementById('inform');
    formElement.style.display='none';
    //this.getInventory();
  }

  getInventory() {
    
    this.apiService.getList().subscribe(response => {
      this.inventoryData = response;
    })
    var formElement = <HTMLFormElement>document.getElementById('inform');
    formElement.style.display='block';
  }

  logout() {
    this.authService.logout();
  }
  download()
  {
    var formElement = <HTMLFormElement>document.getElementById('inform');
    formElement.style.display='none';
    console.log("Downloading...");
    setTimeout(() => { 
      /* 
      this.createDB() ;
      this.createTable() ;
      this.insertAll();
      */
      this.inventoryData = [];
      console.log("Download success!!");
      //(".loader").fadeOut("slow");

      alert("Se descargó la información de manera satisfactoria"); 

    }, 2000);
  }
  inform()
  {
    console.log("Going to inform module...");
  }
  createDB() {
    this.sqlite.create({
      name: this.database_name,
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        this.databaseObj = db;
        alert(this.database_name +' Database Created!');
      })
      .catch(e => {
        alert("error " + JSON.stringify(e))
      });
  }
  createTable() {
    this.databaseObj.executeSql('CREATE TABLE IF NOT EXISTS ' + this.table_name + ' (cod_malla varchar(255),codigo_variedad varchar(255),numero_tallos varchar(255),cod_bloque varchar(255))', [])
      .then(() => {
        alert('Table Created!');
      })
      .catch(e => {
        alert("error " + JSON.stringify(e))
      });
  }
  
  insertAll() {

    this.apiService.getList().subscribe(response => {
      this.inventoryData = response;
    })
    
    for (var i = 0; i < this.inventoryData.length; i++) {
      var cod_malla=this.inventoryData.data.item(i).cod_malla;
      var codigo_variedad=this.inventoryData.data.item(i).codigo_variedad;
      var numero_tallos=this.inventoryData.data.item(i).numero_tallos;
      var cod_bloque=this.inventoryData.data.item(i).cod_bloque;
      
      console.log(cod_malla+' '+codigo_variedad+' '+numero_tallos+' '+cod_bloque);

      this.databaseObj.executeSql('INSERT INTO ' + this.table_name + ' (cod_malla,codigo_variedad,numero_tallos,cod_bloque) VALUES ("' + cod_malla + '","' + codigo_variedad + '","' + numero_tallos + '","' + cod_bloque + '")', [])
      .then(() => {
        alert('Row Inserted!');
        this.getRows();
      })
      .catch(e => {
        alert("error " + JSON.stringify(e))
      });

    }
    
    
  }
  getRows() {
    this.databaseObj.executeSql("SELECT * FROM " + this.table_name, [])
      .then((res) => {
        this.row_data = [];
        if (res.rows.length > 0) {
          for (var i = 0; i < res.rows.length; i++) {
            this.row_data.push(res.rows.item(i));
          }
        }
      })
      .catch(e => {
        alert("error " + JSON.stringify(e))
      });
  }
  
}
