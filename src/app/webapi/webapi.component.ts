import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-webapi',
  templateUrl: './webapi.component.html',
  styleUrls: ['./webapi.component.css'],
})
export class WebapiComponent implements OnInit {
  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.api.getCountryData().subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
  
  countryInp(value: string) {
    if (value) {
      console.log(value);
      this.api
        .insertData({
          name: value,
          active: true,
        })
        .subscribe({
          next: (res) => {
            alert(`${value} successfully Added`);
          },
          error: (err) => {
            console.error(err);
          },
        });
    } else {
      alert('please enter value');
    }
  }

  deleteCountry(id: any) {
    this.api
      .delete({
        id,
      })
      .subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => {
          console.error(err);
        },
      });
  }

  updateData(data: any) {
    this.api
      .updateData({
        id: data.id,
        name: data.name,
      })
      .subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => {
          console.error(err);
        },
      });
  }
}
