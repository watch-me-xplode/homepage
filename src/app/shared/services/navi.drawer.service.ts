import { Injectable } from '@angular/core';

import { D3Service, D3, Selection } from 'd3-ng2-service';

import { NaviMenubuttonContentDrawer } from './navi-menubutton-content.drawer.service';

import { Point } from '../models/point.model';

@Injectable()
export class NaviDrawer {

    private d3: D3;
    private svgContainer: any;
    private mousedownTimer: any;
    private mouseclick = false;
    private readonly height = 200;

    constructor(private d3service: D3Service, private contentDrawer: NaviMenubuttonContentDrawer) {
        this.d3 = this.d3service.getD3();
    }

    /**
     * todo
     * Call ContentDrawer to draw.
     */
    public draw() {
        if (this.svgContainer == null) {
            this.init();
        }
        const button1 = this.svgContainer.append('circle');
        const button2 = this.svgContainer.append('circle');
        button1
            .attr('cx', 100)
            .attr('cy', this.height / 2)
            .attr('r', 20)
            .attr('fill', '#fff')
            .on('mousedown', () => {
                event.preventDefault();
                if (this.mouseclick) {
                    this.mouseclick = false;
                    this.normalizeButtons(button1, button2);
                } else {
                    this.mouseclick = true;
                    this.mousedownTimer = setTimeout(() => {
                        this.mouseclick = false;
                    } , 100);
                    this.highlightButton(button1, button2, false);
                }
            })
            .on('mouseup', () => {
                clearTimeout(this.mousedownTimer);
                if (!this.mouseclick) {
                    this.normalizeButtons(button1, button2);
                }
            })
            .on('mouseleave', () => {
                clearTimeout(this.mousedownTimer);
                if (!this.mouseclick) {
                    this.normalizeButtons(button1, button2);
                }
            })
            .on('touchstart', () => {
                event.preventDefault();
                if (this.mouseclick) {
                    this.mouseclick = false;
                    this.normalizeButtons(button1, button2);
                } else {
                    this.mouseclick = true;
                    this.mousedownTimer = setTimeout(() => {
                        this.mouseclick = false;
                    } , 100);
                    this.highlightButton(button1, button2, false);
                }
            })
            .on('touchend', () => {
                clearTimeout(this.mousedownTimer);
                if (!this.mouseclick) {
                    this.normalizeButtons(button1, button2);
                }
            });
        button2
            .attr('cx', 600)
            .attr('cy', this.height / 2)
            .attr('r', 20)
            .attr('fill', '#fff')
            .on('mousedown', () => {
                event.preventDefault();
                if (this.mouseclick) {
                    this.mouseclick = false;
                    this.normalizeButtons(button1, button2);
                } else {
                    this.mouseclick = true;
                    this.mousedownTimer = setTimeout(() => {
                        this.mouseclick = false;
                    } , 100);
                    this.highlightButton(button2, button1, true);
                }
            })
            .on('mouseup', () => {
                clearTimeout(this.mousedownTimer);
                if (!this.mouseclick) {
                    this.normalizeButtons(button1, button2);
                }
            })
            .on('mouseleave', () => {
                clearTimeout(this.mousedownTimer);
                if (!this.mouseclick) {
                    this.normalizeButtons(button1, button2);
                }
            })
            .on('touchstart', () => {
                event.preventDefault();
                if (this.mouseclick) {
                    this.mouseclick = false;
                    this.normalizeButtons(button1, button2);
                } else {
                    this.mouseclick = true;
                    this.mousedownTimer = setTimeout(() => {
                        this.mouseclick = false;
                    } , 100);
                    this.highlightButton(button2, button1, true);
                }
            })
            .on('touchend', () => {
                clearTimeout(this.mousedownTimer);
                if (!this.mouseclick) {
                    this.normalizeButtons(button1, button2);
                }
            });
        this.contentDrawer.draw(this.svgContainer, 100, 600); // draw after circles to be in front of them
    }

    /**
     * Create canvas to draw something on it.
     */
    private init(): void {
        this.svgContainer = this.d3.select('#navi-canvas').append('svg')
            .attr('width', 700)
            .attr('height', this.height)
            .style('position', 'absolute')
            .style('top', 0)
            .style('left', 0);
    }

    /**
     * Set both buttons into the normal state.
     * Call contentDrawer to go into normal state.
     */
    private normalizeButtons(button1: any, button2: any) {
        button1
            .transition()
            .duration(100)
            .attr('r', 20);
        button2
            .transition()
            .duration(100)
            .attr('r', 20);
        this.contentDrawer.highlightNone();
    }

    /**
     * Highlight the pressed button and hide the other one.
     * The first parameter represents the pressed button.
     * The last parameter represents if the right button should be highlighted (to call the content service).
     * Call contentDrawer to hightlight the button.
     */
    private highlightButton(highlightedButton: any, hiddenButton: any, hightlightRight: boolean) {
        highlightedButton
            .transition()
            .duration(100)
            .attr('r', 20);
        hiddenButton
            .transition()
            .duration(100)
            .attr('r', 0);
        if (hightlightRight) {
            this.contentDrawer.highlightRight();
        } else {
            this.contentDrawer.highlightLeft();
        }
    }
}
