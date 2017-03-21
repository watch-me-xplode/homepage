import { Component } from '@angular/core';

import { D3Service, D3, Selection } from 'd3-ng2-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app works!';

  private d3: D3;
  private timer: any;
  private mousebuttonspressed: number = 0;

  constructor(private d3service: D3Service) {
    //document.body.onmousedown = () => { this.mousebuttonspressed++; };
    document.body.onmouseup = () => { this.mousebuttonspressed--; };
    this.d3 = d3service.getD3();
    var svgContainer = this.d3.select("body").append("svg")
    .attr("width", 200)
    .attr("height", 200);

    //Draw the Rectangle
    var rectangle = svgContainer.append("rect")
    .attr("x", 10)
    .attr("y", 10)
    .attr("width", 50)
    .attr("height", 100)
    .on("mousedown", () => {
      this.mousebuttonspressed++;
      this.test();
    });
  }

  private test(): void {
    if (this.mousebuttonspressed > 0) {
      console.log(this.mousebuttonspressed);
      this.timer = setTimeout(() => {
        this.test();
      }, 500);
    } else {
      clearTimeout(this.timer);
    }
  }
}
