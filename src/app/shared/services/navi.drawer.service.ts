import { Injectable } from '@angular/core';

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
    private buttonLeft: any;
    private buttonRight: any;
    private submenusLeft: any[] = [];
    private submenusRight: any[] = [];

    private getCurrentSubpage: any;
    private setCurrentSubpage: any;

    private readonly sidePadding = 100;
    private readonly height = 200;
    private readonly clickHoverDelay = 200;
    private readonly mouseleaveDelay = 100;

    constructor(private d3service: D3Service, private contentDrawer: NaviMenubuttonContentDrawer) {
        this.d3 = this.d3service.getD3();
    }

    /**
     * todo
     * Call ContentDrawer to draw.
     */
    public draw(setCurrentSubpage: (subpage: string) => void, getCurrentSubpage: () => string) {
        this.setCurrentSubpage = setCurrentSubpage;
        this.getCurrentSubpage = getCurrentSubpage;
        if (this.svgContainer == null) {
            this.init();
        }
        const backButtonLeft = this.createBackButton(new Point(this.sidePadding, this.height / 2));
        const backButtonRight = this.createBackButton(new Point(window.innerWidth - this.sidePadding, this.height / 2));
        this.buttonLeft = this.svgContainer.append('circle');
        this.buttonRight = this.svgContainer.append('circle');
        this.buttonLeft
            .attr('cx', this.sidePadding)
            .attr('cy', this.height / 2)
            .attr('r', 20)
            .attr('fill', 'rgba(255, 255, 255, 0.4)')
            .style('cursor', 'pointer')
            .on('mousedown', () => {
                event.preventDefault();
                if (this.mouseclick) {
                    this.mouseclick = false;
                    this.normalizeButtons();
                } else {
                    this.mouseclick = true;
                    this.mousedownTimer = setTimeout(() => {
                        this.mouseclick = false;
                    } , this.clickHoverDelay);
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
            .on('mouseenter', () => {
                clearTimeout(this.mouseleaveTimer);
            })
            .on('mouseleave', () => {
                this.mouseleaveTimer = setTimeout(() => {
                    clearTimeout(this.mousedownTimer);
                    if (!this.mouseclick) {
                        this.normalizeButtons();
                    }
                }, this.mouseleaveDelay);
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
                    } , this.clickHoverDelay);
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
            .attr('cx', window.innerWidth - this.sidePadding)
            .attr('cy', this.height / 2)
            .attr('r', 20)
            .attr('fill', 'rgba(255, 255, 255, 0.4)')
            .style('cursor', 'pointer')
            .on('mousedown', () => {
                event.preventDefault();
                if (this.mouseclick) {
                    this.mouseclick = false;
                    this.normalizeButtons();
                } else {
                    this.mouseclick = true;
                    this.mousedownTimer = setTimeout(() => {
                        this.mouseclick = false;
                    } , this.clickHoverDelay);
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
            .on('mouseenter', () => {
                clearTimeout(this.mouseleaveTimer);
            })
            .on('mouseleave', () => {
                this.mouseleaveTimer = setTimeout(() => {
                    clearTimeout(this.mousedownTimer);
                    if (!this.mouseclick) {
                        this.normalizeButtons();
                    }
                }, this.mouseleaveDelay);
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
                    } , this.clickHoverDelay);
                    this.highlightButton(true);
                }
            })
            .on('touchend', () => {
                clearTimeout(this.mousedownTimer);
                if (!this.mouseclick) {
                    this.normalizeButtons();
                }
            });
        // draw submenus
        this.submenusRight.push(this.createSubmenu('home', new Point(window.innerWidth - this.sidePadding + 25, this.height / 2 - 40)));
        this.submenusRight.push(this.createSubmenu('webdesign', new Point(window.innerWidth - this.sidePadding - 35, this.height / 2 - 30)));
        this.submenusRight.push(this.createSubmenu('business', new Point(window.innerWidth - this.sidePadding - 35, this.height / 2 + 30)));
        this.submenusRight.push(this.createSubmenu('aboutme', new Point(window.innerWidth - this.sidePadding + 25, this.height / 2 + 40)));
        this.submenusLeft.push(this.createSubmenu('home', new Point(this.sidePadding - 25, this.height / 2 - 40)));
        this.submenusLeft.push(this.createSubmenu('webdesign', new Point(this.sidePadding + 35, this.height / 2 - 30)));
        this.submenusLeft.push(this.createSubmenu('business', new Point(this.sidePadding + 35, this.height / 2 + 30)));
        this.submenusLeft.push(this.createSubmenu('aboutme', new Point(this.sidePadding - 25, this.height / 2 + 40)));
        // draw after circles to be in front of them
        this.contentDrawer.draw(this.svgContainer, this.sidePadding, window.innerWidth - this.sidePadding);
    }

    /**
     * Create canvas to draw something on it.
     */
    private init(): void {
        this.svgContainer = this.d3.select('#navi-canvas').append('svg')
            .attr('width', window.innerWidth)
            .attr('height', this.height)
            .style('position', 'absolute')
            .style('bottom', 0)
            .style('left', 0);
    }

    /**
     * Set all buttons into the normal state.
     * Call contentDrawer to go into normal state.
     */
    private normalizeButtons() {
        this.buttonLeft.transition().duration(500).attr('r', 20);
        this.buttonRight.transition().duration(500).attr('r', 20);
        this.contentDrawer.highlightNone();
        this.hideSubmenus();
    }

    /**
     * Highlight the pressed button and hide the other one.
     * Param1 = Should the right button be highlighted or the left button.
     * Call contentDrawer to hightlight the button.
     * Show submenu of the triggered side.
     */
    private highlightButton(hightlightRight: boolean) {
        if (hightlightRight) {
            this.buttonRight.transition().duration(500).attr('r', 20);
            this.buttonLeft.transition().duration(500).attr('r', 0);
            this.contentDrawer.highlightRight();
        } else {
            this.buttonLeft.transition().duration(500).attr('r', 20);
            this.buttonRight.transition().duration(500).attr('r', 0);
            this.contentDrawer.highlightLeft();
        }
        this.showSubmenus(hightlightRight);
    }

    /**
     * Create BackButtons.
     * BackButtons are invisible behind the whole navi to build a "bridge" between the main button and
     * the subpages. With this bridge the mouseleave-event can be handled properly.
     */
    private createBackButton(coords: Point): any {
        const button = this.svgContainer.append('circle')
            .attr('cx', coords.x)
            .attr('cy', coords.y)
            .attr('r', 75)
            .attr('fill', 'rgba(255,255,255,0)')
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
                }, this.mouseleaveDelay);
            });
        return button;
    }

    /**
     * Create an submenu element.
     * Param1 = The type of the submenu (the subpage it represents).
     * Param2 = The coords where to draw the submenu.
     */
    private createSubmenu(type: string, coords: Point): any {
        const submenu = this.svgContainer.append('circle')
            .attr('cx', coords.x)
            .attr('cy', coords.y)
            .attr('r', 20)
            .attr('fill', 'red')
            .style('display', 'none')
            .on('mouseenter', () => {
                clearTimeout(this.mouseleaveTimer);
                if (!this.isCurrentSubmenu(type)) {
                    this.highlightSubmenu(submenu);
                }
            })
            .on('mouseleave', () => {
                if (!this.isCurrentSubmenu(type)) {
                    this.unhighlightSubmenu(submenu);
                }
                this.mouseleaveTimer = setTimeout(() => {
                    clearTimeout(this.mousedownTimer);
                    if (!this.mouseclick) {
                        this.normalizeButtons();
                    }
                }, this.mouseleaveDelay);
            })
            .on('mouseup', () => {
                clearTimeout(this.mousedownTimer);
                clearTimeout(this.mouseleaveTimer);
                if (!this.mouseclick) {
                    this.normalizeButtons();
                    this.setCurrentSubpage(type);
                }
            })
            .on('click', () => {
                this.mouseclick = false;
                clearTimeout(this.mouseleaveTimer);
                clearTimeout(this.mousedownTimer);
                this.normalizeButtons();
                this.setCurrentSubpage(type);
            });
        return submenu;
    }

    /**
     * Show submenus of triggered side.
     * Param1 = If true, the right side was triggered.
     */
    private showSubmenus(showRight: boolean) {
        if (showRight) {
            this.submenusRight.forEach(submenu => {
                submenu.style('display', 'initial');
            });
        } else {
            this.submenusLeft.forEach(submenu => {
                submenu.style('display', 'initial');
            });
        }
    }

    /**
     * Hide all submenus.
     */
    private hideSubmenus() {
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
     * Returns true if the submenu type is currently visible.
     * Param1 = The type to reference the subpage title.
     */
    private isCurrentSubmenu(type: string) {
        return type === this.getCurrentSubpage();
    }
}
