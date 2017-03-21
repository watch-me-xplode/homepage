import { Component } from '@angular/core';

import * as d3 from "d3";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app works!';

  constructor() {
    // var svgContainer = d3.select("body").append("svg")
    // .attr("width", 200)
    // .attr("height", 200);

    // //Draw the Rectangle
    // var rectangle = svgContainer.append("rect")
    // .attr("x", 10)
    // .attr("y", 10)
    // .attr("width", 50)
    // .attr("height", 100);
  }
}
