import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-trendings',
  templateUrl: './trendings.component.html',
  styleUrls: ['./trendings.component.css']
})
export class TrendingsComponent implements OnInit {

  title = 'app';
  trendings: any;
  selectedIds : Data[] = [];
  selectedTrending : Data[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getRestItems();
  }

  // Read all REST Items
  getRestItems(): void {
    this.restItemsServiceGetRestItems()
      .subscribe(
        trendings => {
          this.trendings = trendings;
        }
      )
  }

  GetVideoData(video) {
    this.trendings = this.trendings.map(v => {
      if(v.id == video.id) {
        v.checked = v.checked ? !v.checked : true
      }
      return v
    })
    this.selectedTrending = this.trendings.filter(v => v.checked && v.checked == true)
  }

  sendSelected(){
    let selectedIds = [];
    let selectedTrending = this.trendings.map(v => {
      if(v.checked && v.checked == true) {
        selectedIds.push(v.id)
      }
    });
    this.selectedIds = selectedIds
    console.log(selectedIds)
  }

  // Rest Items Service: Read all REST Items
 restItemsServiceGetRestItems() {
   return this.http
     .get<any[]>(`https://api.meuzic.com/youtube/trendings`)
     .pipe(map(data => data.data.items));
 }

}
