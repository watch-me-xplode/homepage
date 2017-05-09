import { Injectable } from '@angular/core';

import { D3Service, D3, Selection } from 'd3-ng2-service';

import { Point } from '../models/point.model';

@Injectable()
export class NaviMenubuttonContentDrawer {

    private readonly y = 100;
    private readonly upperlineData = [
        new Point(10, -7),
        new Point(5, -7),
        new Point(0, -7),
        new Point(-5, -7),
        new Point(-10, -7),
        new Point(-8, -6),
        new Point(-4, -3),
        new Point(0, 0),
        new Point(4, 3),
        new Point(8, 6)
    ];
    private readonly centerlineData = [
        new Point(-10, 0),
        new Point(-5, 0),
        new Point(0, 0),
        new Point(5, 0),
        new Point(10, 0)
    ];
    private readonly lowerlineData = [
        new Point(10, 7),
        new Point(5, 7),
        new Point(0, 7),
        new Point(-5, 7),
        new Point(-10, 7),
        new Point(-8, 6),
        new Point(-4, 3),
        new Point(0, 0),
        new Point(4, -3),
        new Point(8, -6)
    ];
    private readonly lineFunctionLeft: any;
    private readonly lineFunctionRight: any;
    private d3: D3;
    private svgContainer: any;
    private x1: number;
    private x2: number;
    private animationprogress = 0;
    private readonly animationlength = 5; // how many pathpoints are drawn at the same time
    private readonly animationMaxprogress = 5; // the max progress of the animation
    private leftUpperLine: any;
    private leftCenterLine: any;
    private leftBottomLine: any;
    private rightUpperLine: any;
    private rightCenterLine: any;
    private rightBottomLine: any;
    private currentlyDrawing = false;

    constructor(private d3service: D3Service) {
        this.d3 = this.d3service.getD3();
        this.lineFunctionLeft = this.d3.line()
            .x((d: any) => { return d.x + this.x1; })
            .y((d: any) => { return d.y + this.y; })
            .curve(this.d3.curveCatmullRom.alpha(0.5));
        this.lineFunctionRight = this.d3.line()
            .x((d: any) => { return d.x + this.x2; })
            .y((d: any) => { return d.y + this.y; })
            .curve(this.d3.curveCatmullRom.alpha(0.5));
    }

    /**
     * todo
     */
    public draw(svgContainer?: any, x1?: number, x2?: number) {
        // check if the animation is still drawing
        if (this.currentlyDrawing) {
            console.log('Warning: Animation is still in progress.');
            return;
        }
        // error handling
        if (svgContainer) {
            this.svgContainer = svgContainer;
        }
        if (x1 && x2) {
            this.x1 = x1;
            this.x2 = x2;
        }
        if (!this.svgContainer) {
            console.log('Error: No SvgContainer to draw Navibutton content.');
            return;
        }
        if (!(x1 && x2)) {
            console.log('Error: No x-coords to draw Navibutton content.');
            return;
        }

        const upperLineCurrentData = this.upperlineData.slice(this.animationprogress, this.animationprogress + this.animationlength);
        const centerLineCurrentData = this.centerlineData.slice(this.animationprogress, this.animationprogress + this.animationlength);
        const lowerLineCurrentData = this.lowerlineData.slice(this.animationprogress, this.animationprogress + this.animationlength);
        if (this.leftBottomLine) { // update lines
            this.leftUpperLine.attr('d', this.lineFunctionLeft(<any>upperLineCurrentData));
            this.leftCenterLine.attr('d', this.lineFunctionLeft(<any>centerLineCurrentData));
            this.leftBottomLine.attr('d', this.lineFunctionLeft(<any>lowerLineCurrentData));
            this.rightUpperLine.attr('d', this.lineFunctionRight(<any>upperLineCurrentData));
            this.rightCenterLine.attr('d', this.lineFunctionRight(<any>centerLineCurrentData));
            this.rightBottomLine.attr('d', this.lineFunctionRight(<any>lowerLineCurrentData));
        } else { // no line created yet
            this.leftUpperLine = this.drawLine(this.lineFunctionLeft, upperLineCurrentData);
            this.leftCenterLine = this.drawLine(this.lineFunctionLeft, centerLineCurrentData);
            this.leftBottomLine = this.drawLine(this.lineFunctionLeft, lowerLineCurrentData);
            this.rightUpperLine = this.drawLine(this.lineFunctionRight, upperLineCurrentData);
            this.rightCenterLine = this.drawLine(this.lineFunctionRight, centerLineCurrentData);
            this.rightBottomLine = this.drawLine(this.lineFunctionRight, lowerLineCurrentData);
        }
    }

    /**
     * Draw a Line with specific function and data.
     * Param1 = Linefunction: Function to calculate coords.
     * Param2 = Linedata: Data to insert into function.
     * Returns the drawed line object.
    */
    private drawLine(linefunction: any, linedata: Point[]): any {
        const line = this.svgContainer.append('path')
            .attr('d', linefunction(<any>linedata))
            .attr('stroke', '#fff')
            .attr('stroke-width', 3)
            .attr('fill', 'none')
            .attr('stroke-linecap', 'round')
            .attr('pointer-events', 'none');
        return line;
    }
}
