import { Injectable } from "@angular/core";

import { D3Service, D3, Selection } from 'd3-ng2-service';

@Injectable()
export class NaviDrawer {

    private d3: D3;
    private svgContainer: any;
    private innerCircle: any;
    private outerCircle: any;
    private backgroundCircle: any;
    private menustate: number = 0; // 0 = default, closed; 1 = mousedown; 2 = mouseup

    constructor(private d3service: D3Service) {
        this.d3 = this.d3service.getD3();
    }

    public draw(): void {
        if (this.svgContainer == null) {
            this.init();
        }
        this.innerCircle
            .transition()
            .duration(1000)
            .attr("r", 40);
        this.outerCircle
            .transition()
            .duration(1000)
            .attr("r", this.menustate === 0 ? 40 : 100);
        this.backgroundCircle
            .transition()
            .duration(1000)
            .attr("r", this.menustate === 0 ? 40 : 1000);
    }

    private init(): void {
        this.svgContainer = this.d3.select("body").append("svg")
            .attr("width", 600)
            .attr("height", 600)
            .style("position", "fixed")
            .style("bottom", 0)
            .style("left", "50%")
            .style("overflow", "visible")
            .style("margin-left", -300);

        this.backgroundCircle= this.svgContainer.append("circle")
            .attr("cx", 300)
            .attr("cy", 600)
            .attr("r", 40)
            .style("fill", "#000")
            .style("opacity", 0.2)
            .on("mousedown", () => {
                this.menustate = 0;
                this.draw();
            })
            .on("mouseup", () => {
                this.menustate = 0;
                this.draw();
            });

        this.outerCircle = this.svgContainer.append("circle")
            .attr("cx", 300)
            .attr("cy", 600)
            .attr("r", 40)
            .style("fill", "#0099CC")
            .style("opacity", 0.6)
            .on("mouseenter", () => {
            this.outerCircle
                .transition()
                .duration(100)
                .style("opacity", 0.8);
            })
            .on("mouseleave", () => {
            this.outerCircle
                .transition()
                .duration(100)
                .style("opacity", 0.6);
            })
            .on("mousedown", () => {
                this.menustate = 0;
                this.draw();
            })
            .on("mouseup", () => {
                this.menustate = 0;
                this.draw();
            });

        this.innerCircle = this.svgContainer.append("circle")
            .attr("cx", 300)
            .attr("cy", 600)
            .attr("r", 40)
            .style("fill", "#0099CC")
            .style("opacity", 0.8)
            .on("mousedown", () => {
                this.menustate = this.menustate === 0 ? 1 : 0;
                this.draw();
            })
            .on("mouseup", () => {
                this.menustate = this.menustate === 1 ? 2 : 0;
                this.draw();
            });

            
//test
        this.svgContainer.append("circle")
            .attr("cx", 300)
            .attr("cy", 0)
            .attr("r", 40)
            .style("fill", "#fff")
            .style("opacity", 0.8);
    }
}