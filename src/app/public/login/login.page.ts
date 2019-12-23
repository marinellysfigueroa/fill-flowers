import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Platform } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  databaseObj: SQLiteObject; // Database instance object
  readonly database_name:string = "users.db"; // DB name
  readonly table_name:string = "users";
  row_data: any = []; // Table rows
  correo: string='';
  password: string='';


  constructor(private platform: Platform,private authService: AuthenticationService,private sqlite: SQLite) {

      this.platform.ready().then(() => {
          this.createDB();
      }).catch(error => {
          console.log(error);
      });


  }

  ngOnInit() {
  }
  login() {

    if(this.correo!=="" && this.password!=="" )
    {

      console.log("Iniciando sesión");

      this.databaseObj.executeSql("SELECT * FROM " + this.table_name+" WHERE correo='"+this.correo+"' and password='"+this.password+"'", [])
          .then((res) => {
            this.row_data = [];
            if (res.rows.length > 0) {
              for (var i = 0; i < res.rows.length; i++) {
                this.row_data.push(res.rows.item(i));
                this.authService.login();
              }
            }
            else
            {
              alert("Correo y password no válidos");
            }
          })
          .catch(e => {
            alert("error " + JSON.stringify(e))
          });
    }else
    {
      alert("Introduzca correo y password");
    }
  }
    createDB() {
        this.sqlite.create({
            name: this.database_name,
            location: 'default'
        })
            .then((db: SQLiteObject) => {
                this.databaseObj = db;
            })
            .catch(e => {
                alert("error " + JSON.stringify(e))
            });
    }
}
