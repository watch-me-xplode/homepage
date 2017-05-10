import { Injectable } from '@angular/core';

import { D3Service, D3, Selection } from 'd3-ng2-service';

import { Point } from '../models/point.model';

@Injectable()
export class NaviMenubuttonContentDrawer {

    private readonly y = 100;
    private readonly upperlineData = [
        // closed
        new Point(10, -7),
        new Point(10, -7),
        new Point(10, -7),
        new Point(10, -7),
        new Point(10, -7),
        new Point(10, -7),
        new Point(10, -7),
        new Point(10, -7),
        new Point(10, -7),
        new Point(10, -7),
        new Point(10, -7),
        new Point(10, -7),
        new Point(10, -7),
        new Point(10, -7),
        new Point(10, -7),
        new Point(10, -7),
        new Point(10, -7),
        new Point(10, -7),
        new Point(10, -7),
        // closed -> normal
        new Point(10, -7),
        new Point(10, -7),
        new Point(10, -7),
        new Point(10, -7),
        new Point(10, -7),
        // normal
        new Point(10, -7),
        new Point(10, -7),
        new Point(8, -7),
        new Point(6, -7),
        new Point(5, -7),
        new Point(4, -7),
        new Point(3, -7),
        new Point(2, -7),
        new Point(1, -7),
        new Point(0, -7),
        new Point(-1, -7),
        new Point(-2, -7),
        new Point(-3, -7),
        new Point(-4, -7),
        new Point(-5, -7),
        new Point(-6, -7),
        new Point(-8, -7),
        new Point(-10, -7),
        new Point(-10, -7),
        // normal -> open
        new Point(-10, -7),
        new Point(-10, -7),
        new Point(-10, -7),
        new Point(-10, -7),
        new Point(-10, -7),
        // open
        new Point(-8, -6),
        new Point(-8, -6),
        new Point(-7, -5.25),
        new Point(-6, -4.5),
        new Point(-5, -3.75),
        new Point(-4, -3),
        new Point(-3, -2.25),
        new Point(-2, -1.5),
        new Point(-1, -0.75),
        new Point(0, 0),
        new Point(1, 0.75),
        new Point(2, 1.5),
        new Point(3, 2.25),
        new Point(4, 3),
        new Point(5, 3.75),
        new Point(6, 4.5),
        new Point(7, 5.25),
        new Point(8, 6),
        new Point(8, 6)
    ];
    private readonly centerlineData = [
        // closed
        new Point(-10, 0),
        new Point(-10, 0),
        new Point(-10, 0),
        new Point(-10, 0),
        new Point(-10, 0),
        new Point(-10, 0),
        new Point(-10, 0),
        new Point(-10, 0),
        new Point(-10, 0),
        new Point(-10, 0),
        new Point(-10, 0),
        new Point(-10, 0),
        new Point(-10, 0),
        new Point(-10, 0),
        new Point(-10, 0),
        new Point(-10, 0),
        new Point(-10, 0),
        new Point(-10, 0),
        new Point(-10, 0),
        // closed -> normal
        new Point(-10, 0),
        new Point(-10, 0),
        new Point(-10, 0),
        new Point(-10, 0),
        new Point(-10, 0),
        // normal
        new Point(-10, 0),
        new Point(-10, 0),
        new Point(-8, 0),
        new Point(-6, 0),
        new Point(-5, 0),
        new Point(-4, 0),
        new Point(-3, 0),
        new Point(-2, 0),
        new Point(-1, 0),
        new Point(0, 0),
        new Point(1, 0),
        new Point(2, 0),
        new Point(3, 0),
        new Point(4, 0),
        new Point(5, 0),
        new Point(6, 0),
        new Point(8, 0),
        new Point(10, 0),
        new Point(10, 0),
        // normal -> open
        new Point(13.3, -0.66),
        new Point(16.1, -2.5),
        new Point(18.66, -8.66),
        new Point(16.1, -14.8),
        new Point(13.3, -16.66),
        // open
        new Point(1.5, -19.95),
        new Point(0, -20),
        new Point(-1.5, -19.95),
        new Point(-14, -14),
        new Point(-18.5, -7.5),
        new Point(-20, 0),
        new Point(-18.5, 7.5),
        new Point(-14, 14),
        new Point(-1.5, 19.95),
        new Point(0, 20),
        new Point(1.5, 19.95),
        new Point(14, 14),
        new Point(18.5, 7.5),
        new Point(20, 0),
        new Point(18.5, -7.5),
        new Point(14, -14),
        new Point(1.5, -19.95),
        new Point(0, -20),
        new Point(-1.5, -19.95)
    ];
    private readonly lowerlineData = [
        // closed
        new Point(10, 7),
        new Point(10, 7),
        new Point(10, 7),
        new Point(10, 7),
        new Point(10, 7),
        new Point(10, 7),
        new Point(10, 7),
        new Point(10, 7),
        new Point(10, 7),
        new Point(10, 7),
        new Point(10, 7),
        new Point(10, 7),
        new Point(10, 7),
        new Point(10, 7),
        new Point(10, 7),
        new Point(10, 7),
        new Point(10, 7),
        new Point(10, 7),
        new Point(10, 7),
        // closed -> normal
        new Point(10, 7),
        new Point(10, 7),
        new Point(10, 7),
        new Point(10, 7),
        new Point(10, 7),
        // normal
        new Point(10, 7),
        new Point(10, 7),
        new Point(8, 7),
        new Point(6, 7),
        new Point(5, 7),
        new Point(4, 7),
        new Point(3, 7),
        new Point(2, 7),
        new Point(1, 7),
        new Point(0, 7),
        new Point(-1, 7),
        new Point(-2, 7),
        new Point(-3, 7),
        new Point(-4, 7),
        new Point(-5, 7),
        new Point(-6, 7),
        new Point(-8, 7),
        new Point(-10, 7),
        new Point(-10, 7),
        // normal -> open
        new Point(-10, 7),
        new Point(-10, 7),
        new Point(-10, 7),
        new Point(-10, 7),
        new Point(-10, 7),
        // open
        new Point(-8, 6),
        new Point(-8, 6),
        new Point(-7, 5.25),
        new Point(-6, 4.5),
        new Point(-5, 3.75),
        new Point(-4, 3),
        new Point(-3, 2.25),
        new Point(-2, 1.5),
        new Point(-1, 0.75),
        new Point(0, 0),
        new Point(1, -0.75),
        new Point(2, -1.5),
        new Point(3, -2.25),
        new Point(4, -3),
        new Point(5, -3.75),
        new Point(6, -4.5),
        new Point(7, -5.25),
        new Point(8, -6),
        new Point(8, -6)
    ];
    private readonly lineFunctionLeft: any;
    private readonly lineFunctionRight: any;
    private readonly lineFunctionParam = 1;
    private d3: D3;
    private svgContainer: any;
    private x1: number;
    private x2: number;
    private animationprogress = 0;
    private readonly animationLength = 19; // how many pathpoints are drawn at the same time
    private readonly animationMaxprogress = 24; // the max progress of the animation
    private readonly animationSpeed = 20; // delay between animation steps
    private animationGoal = 0;
    private leftUpperLine: any;
    private leftCenterLine: any;
    private leftBottomLine: any;
    private rightUpperLine: any;
    private rightCenterLine: any;
    private rightLowerLine: any;
    private currentlyDrawing = false;

    constructor(private d3service: D3Service) {
        this.d3 = this.d3service.getD3();
        this.lineFunctionLeft = this.d3.line()
            .x((d: any) => { return d.x + this.x1; })
            .y((d: any) => { return d.y + this.y; })
            .curve(this.d3.curveCatmullRom.alpha(this.lineFunctionParam));
        this.lineFunctionRight = this.d3.line()
            .x((d: any) => { return d.x + this.x2; })
            .y((d: any) => { return d.y + this.y; })
            .curve(this.d3.curveCatmullRomOpen.alpha(this.lineFunctionParam));
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
        if (!(this.x1 && this.x2)) {
            console.log('Error: No x-coords to draw Navibutton content.');
            return;
        }

        this.currentlyDrawing = true;
        this.animatedDraw();
    }

    /**
     * Hightlight the left button. Hide the right button.
     * Triggers animation.
     * Left equals negative animation progress.
     */
    public highlightLeft() {
        this.animationGoal = -this.animationMaxprogress;
        this.draw();
    }

    /**
     * Hightlight the right button. Hide the left button.
     * Triggers animation.
     * Right equals positive animation progress.
     */
    public highlightRight() {
        this.animationGoal = this.animationMaxprogress;
        this.draw();
    }

    /**
     * Normalize both buttons.
     * Triggers animation.
     */
    public highlightNone() {
        this.animationGoal = 0;
        this.draw();
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
            .attr('stroke', '#111')
            .attr('stroke-width', 3)
            .attr('fill', 'none')
            .attr('stroke-linecap', 'round')
            .attr('pointer-events', 'none')
            // .style('opacity', 0)
            // .transition()
            // .duration(1000)
            .style('opacity', 1);
        return line;
    }

    /**
     * Update the path and opacity of a line.
     * Param1: line = line element to update.
     * Param2: lineFunction = Function to calculate coords.
     * Param3: lineData = the path on which the line will be drawn.
     * Param4: progress = the animation progress to determine if the line should be visible or not.
     */
    private updateLine(line: any, lineFunction: any, lineData: any, progress: number) {
        line.attr('d', lineFunction(<any>lineData))
            .transition().duration(100).style('opacity',
                ((this.animationMaxprogress + this.animationLength) / 4 > progress ? 0 : 1));
    }

    /**
     * This function calls itself until the animation is completed.
     */
    private animatedDraw() {
            // progress right and left only differ from the direction they are progressing.
            // because the default situation should be 0, and in the array it is another index,
            // we have to add the animation length to the animation progress
            const progressLeft = this.animationMaxprogress - this.animationprogress;
            const progressRight = this.animationMaxprogress + this.animationprogress;
            const leftUpperLineCurrentData = this.upperlineData.slice(progressLeft, progressLeft + this.animationLength);
            const leftCenterLineCurrentData = this.centerlineData.slice(progressLeft, progressLeft + this.animationLength);
            const leftLowerLineCurrentData = this.lowerlineData.slice(progressLeft, progressLeft + this.animationLength);
            const rightUpperLineCurrentData = this.upperlineData.slice(progressRight, progressRight + this.animationLength);
            const rightCenterLineCurrentData = this.centerlineData.slice(progressRight, progressRight + this.animationLength);
            const rightLowerLineCurrentData = this.lowerlineData.slice(progressRight, progressRight + this.animationLength);
            if (this.leftBottomLine) {
                // update lines
                this.updateLine(this.leftUpperLine, this.lineFunctionLeft, leftUpperLineCurrentData, progressLeft);
                this.updateLine(this.leftCenterLine, this.lineFunctionLeft, leftCenterLineCurrentData, progressLeft);
                this.updateLine(this.leftBottomLine, this.lineFunctionLeft, leftLowerLineCurrentData, progressLeft);
                this.updateLine(this.rightUpperLine, this.lineFunctionRight, rightUpperLineCurrentData, progressRight);
                this.updateLine(this.rightCenterLine, this.lineFunctionRight, rightCenterLineCurrentData, progressRight);
                this.updateLine(this.rightLowerLine, this.lineFunctionRight, rightLowerLineCurrentData, progressRight);
            } else {
                // create lines
                this.leftUpperLine = this.drawLine(this.lineFunctionLeft, leftUpperLineCurrentData);
                this.leftCenterLine = this.drawLine(this.lineFunctionLeft, leftCenterLineCurrentData);
                this.leftBottomLine = this.drawLine(this.lineFunctionLeft, leftLowerLineCurrentData);
                this.rightUpperLine = this.drawLine(this.lineFunctionRight, rightUpperLineCurrentData);
                this.rightCenterLine = this.drawLine(this.lineFunctionRight, rightCenterLineCurrentData);
                this.rightLowerLine = this.drawLine(this.lineFunctionRight, rightLowerLineCurrentData);
            }
            // animation handling
            setTimeout(() => {
                if (this.animationGoal < this.animationprogress) {
                    this.animationprogress--;
                    this.animatedDraw();
                } else if (this.animationGoal > this.animationprogress) {
                    this.animationprogress++;
                    this.animatedDraw();
                } else {
                    this.currentlyDrawing = false;
                }
            }, this.animationSpeed);
    }
}
