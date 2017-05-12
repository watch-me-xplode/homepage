import { Injectable, EventEmitter } from '@angular/core';

import { D3Service, D3, Selection } from 'd3-ng2-service';

import { NaviMenubuttonContentDrawer } from './navi-menubutton-content.drawer.service';

import { Point } from '../models/point.model';

@Injectable()
export class NaviDrawer {

    private d3: D3;
    private svgContainer: any;
    private mousedownTimer: any;
    private mouseleaveTimer: any;
    private mouseclick = false;
    private readonly height = 200;
    private buttonLeft: any;
    private buttonRight: any;
    private submenusLeft: any[] = [];
    private submenusRight: any[] = [];

    constructor(private d3service: D3Service, private contentDrawer: NaviMenubuttonContentDrawer) {
        this.d3 = this.d3service.getD3();
    }

    /**
     * todo
     * Call ContentDrawer to draw.
     */
    public draw(switchSiteEmitter: EventEmitter<string>) {
        if (this.svgContainer == null) {
            this.init();
        }
        const backButtonLeft = this.svgContainer.append('circle')
            .attr('cx', 100)
            .attr('cy', this.height / 2)
            .attr('r', 70)
            .attr('fill', 'blue')
            .on('mouseenter', () => {
                clearTimeout(this.mouseleaveTimer);
            })
            .on('mouseup', () => {
                clearTimeout(this.mousedownTimer);
                clearTimeout(this.mouseleaveTimer);
                if (!this.mouseclick) {
                    this.normalizeButtons();
                }
            })
            .on('mouseleave', () => {
                this.mouseleaveTimer = setTimeout(() => {
                    clearTimeout(this.mousedownTimer);
                    if (!this.mouseclick) {
                        this.normalizeButtons();
                    }
                }, 100);
            });
        const backButtonRight = this.svgContainer.append('circle')
            .attr('cx', 600)
            .attr('cy', this.height / 2)
            .attr('r', 70)
            .attr('fill', 'blue')
            .on('mouseenter', () => {
                clearTimeout(this.mouseleaveTimer);
            })
            .on('mouseup', () => {
                clearTimeout(this.mousedownTimer);
                clearTimeout(this.mouseleaveTimer);
                if (!this.mouseclick) {
                    this.normalizeButtons();
                }
            })
            .on('mouseleave', () => {
                this.mouseleaveTimer = setTimeout(() => {
                    clearTimeout(this.mousedownTimer);
                    if (!this.mouseclick) {
                        this.normalizeButtons();
                    }
                }, 100);
            });
        this.buttonLeft = this.svgContainer.append('circle');
        this.buttonRight = this.svgContainer.append('circle');
        this.buttonLeft
            .attr('cx', 100)
            .attr('cy', this.height / 2)
            .attr('r', 20)
            .attr('fill', '#fff')
            .on('mousedown', () => {
                event.preventDefault();
                if (this.mouseclick) {
                    this.mouseclick = false;
                    this.normalizeButtons();
                } else {
                    this.mouseclick = true;
                    this.mousedownTimer = setTimeout(() => {
                        this.mouseclick = false;
                    } , 100);
                    this.highlightButton(false);
                }
            })
            .on('mouseup', () => {
                clearTimeout(this.mousedownTimer);
                clearTimeout(this.mouseleaveTimer);
                if (!this.mouseclick) {
                    this.normalizeButtons();
                }
            })
            .on('mouseleave', () => {
                this.mouseleaveTimer = setTimeout(() => {
                    clearTimeout(this.mousedownTimer);
                    if (!this.mouseclick) {
                        this.normalizeButtons();
                    }
                }, 100);
            })
            .on('touchstart', () => {
                event.preventDefault();
                if (this.mouseclick) {
                    this.mouseclick = false;
                    this.normalizeButtons();
                } else {
                    this.mouseclick = true;
                    this.mousedownTimer = setTimeout(() => {
                        this.mouseclick = false;
                    } , 100);
                    this.highlightButton(false);
                }
            })
            .on('touchend', () => {
                clearTimeout(this.mousedownTimer);
                if (!this.mouseclick) {
                    this.normalizeButtons();
                }
            });
        this.buttonRight
            .attr('cx', 600)
            .attr('cy', this.height / 2)
            .attr('r', 20)
            .attr('fill', '#fff')
            .on('mousedown', () => {
                event.preventDefault();
                if (this.mouseclick) {
                    this.mouseclick = false;
                    this.normalizeButtons();
                } else {
                    this.mouseclick = true;
                    this.mousedownTimer = setTimeout(() => {
                        this.mouseclick = false;
                    } , 100);
                    this.highlightButton(true);
                }
            })
            .on('mouseup', () => {
                clearTimeout(this.mouseleaveTimer);
                clearTimeout(this.mousedownTimer);
                if (!this.mouseclick) {
                    this.normalizeButtons();
                }
            })
            .on('mouseleave', () => {
                this.mouseleaveTimer = setTimeout(() => {
                    clearTimeout(this.mousedownTimer);
                    if (!this.mouseclick) {
                        this.normalizeButtons();
                    }
                }, 100);
            })
            .on('touchstart', () => {
                event.preventDefault();
                if (this.mouseclick) {
                    this.mouseclick = false;
                    this.normalizeButtons();
                } else {
                    this.mouseclick = true;
                    this.mousedownTimer = setTimeout(() => {
                        this.mouseclick = false;
                    } , 100);
                    this.highlightButton(true);
                }
            })
            .on('touchend', () => {
                clearTimeout(this.mousedownTimer);
                if (!this.mouseclick) {
                    this.normalizeButtons();
                }
            });
        this.contentDrawer.draw(this.svgContainer, 100, 600); // draw after circles to be in front of them
        this.submenusRight.push(this.createSubmenu(switchSiteEmitter, 'webdesign', new Point(565, 70)));
        this.submenusRight.push(this.createSubmenu(switchSiteEmitter, 'business', new Point(565, 130)));
        this.submenusLeft.push(this.createSubmenu(switchSiteEmitter, 'webdesign', new Point(135, 70)));
        this.submenusLeft.push(this.createSubmenu(switchSiteEmitter, 'business', new Point(135, 130)));
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
     * Set all buttons into the normal state.
     * Call contentDrawer to go into normal state.
     */
    private normalizeButtons() {
        this.buttonLeft.transition().duration(500).attr('r', 20);
        this.buttonRight.transition().duration(500).attr('r', 20);
        this.submenusLeft.forEach(submenu => {
            submenu.transition().duration(100)
                .attr('fill', 'red')
                .style('display', 'none');
        });
        this.submenusRight.forEach(submenu => {
            submenu.transition().duration(100)
                .attr('fill', 'red')
                .style('display', 'none');
        });
        this.contentDrawer.highlightNone();
    }

    /**
     * Highlight the pressed button and hide the other one.
     * Param1 = Should the right button be highlighted or the left button.
     * Call contentDrawer to hightlight the button.
     */
    private highlightButton(hightlightRight: boolean) {
        if (hightlightRight) {
            this.buttonRight.transition().duration(500).attr('r', 20);
            this.buttonLeft.transition().duration(500).attr('r', 0);
            this.contentDrawer.highlightRight();
            this.submenusRight.forEach(submenu => {
                submenu.style('display', 'initial');
            });
        } else {
            this.buttonLeft.transition().duration(500).attr('r', 20);
            this.buttonRight.transition().duration(500).attr('r', 0);
            this.contentDrawer.highlightLeft();
            this.submenusLeft.forEach(submenu => {
                submenu.style('display', 'initial');
            });
        }
    }

    /**
     * Highlight the currently selected submenu.
     * Param1 = The Submenu element to highlight.
     */
    private highlightSubmenu(submenu: any) {
        submenu.transition().duration(100).attr('fill', 'yellow');
    }

    /**
     * Unhighlight the currently selected submenu.
     * Param1 = The Submenu element to normalize.
     */
    private unhighlightSubmenu(submenu: any) {
        submenu.transition().duration(100).attr('fill', 'red');
    }

    /**
     * Create an submenu element.
     * todo
     */
    private createSubmenu(switchSiteEmitter: EventEmitter<string>, type: string, coords: Point): any {
        const submenu = this.svgContainer.append('circle')
            .attr('cx', coords.x)
            .attr('cy', coords.y)
            .attr('r', 20)
            .attr('fill', 'red')
            .style('display', 'none')
            .on('mouseenter', () => {
                clearTimeout(this.mouseleaveTimer);
                this.highlightSubmenu(submenu);
            })
            .on('mouseleave', () => {
                this.unhighlightSubmenu(submenu);
                this.mouseleaveTimer = setTimeout(() => {
                    clearTimeout(this.mousedownTimer);
                    if (!this.mouseclick) {
                        this.normalizeButtons();
                    }
                }, 100);
            })
            .on('mouseup', () => {
                clearTimeout(this.mousedownTimer);
                clearTimeout(this.mouseleaveTimer);
                if (!this.mouseclick) {
                    this.normalizeButtons();
                }
            })
            .on('click', () => {
                this.mouseclick = false;
                clearTimeout(this.mouseleaveTimer);
                clearTimeout(this.mousedownTimer);
                this.normalizeButtons();
                switchSiteEmitter.emit(type);
            });
        return submenu;
    }
}
