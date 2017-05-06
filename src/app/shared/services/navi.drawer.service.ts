import { Injectable } from '@angular/core';

import { D3Service, D3, Selection } from 'd3-ng2-service';

import { Point } from '../models/point.model';

@Injectable()
export class NaviDrawer {

    private d3: D3;
    private svgContainer: any;

    constructor(private d3service: D3Service) {
        this.d3 = this.d3service.getD3();
    }

    /**
     * todo
     */
    public draw() {
        if (this.svgContainer == null) {
            this.init();
        }
        const button1 = this.svgContainer.append('circle')
            .attr('cx', 100)
            .attr('cy', 100)
            .attr('r', 50)
            .attr('fill', 'green');
        const button2 = this.svgContainer.append('circle')
            .attr('cx', 600)
            .attr('cy', 100)
            .attr('r', 50)
            .attr('fill', 'green');
    }

    /**
     * Create canvas to draw something on it.
     */
    private init(): void {
        this.svgContainer = this.d3.select('#canvas').append('svg')
            .attr('width', 700)
            .attr('height', 200)
            .style('position', 'absolute')
            .style('top', 0)
            .style('left', 0);
    }
}
