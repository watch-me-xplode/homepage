import { Injectable } from '@angular/core';

import { D3Service, D3, Selection } from 'd3-ng2-service';

import { SiteSocketContainer } from '../models/site-socket.model';
import { WordSocketContainer } from '../models/word-socket-container.model';
import { WordSocket } from '../models/word-socket.model';
import { FontSocket } from '../models/font-socket.model';
import { Font } from '../models/font.model';
import { Point } from '../models/point.model';

@Injectable()
export class FontDrawer {

    private d3: D3;
    private svgContainer: any;
    private currentSiteSocket: SiteSocketContainer;
    private siteSocket1: SiteSocketContainer;
    private siteSocket2: SiteSocketContainer;
    private fonts: Font[] = [];

    constructor(private d3service: D3Service) {
        this.d3 = this.d3service.getD3();
    }

    /**
     * draw/update fonts
     * 1. check requirements
     * 2. unsocket all old fonts
     * 3. update fonts
     * 4. clear all unused fonts
     * 5. create new fonts
     * @param site (optional) changes the current font site
     */
    public draw(site?: SiteSocketContainer): void {
        const oldSiteSocket = this.currentSiteSocket;
        if (site != null) {
            this.currentSiteSocket = site;
        }
        if (this.currentSiteSocket == null) {
            console.log('Error: no current site to draw.');
            return;
        }
        if (this.svgContainer == null) {
            this.init();
        }
        if (oldSiteSocket != null) {
            oldSiteSocket.getFontSockets().forEach(socket => socket.removeFont());
        }
        this.fonts.forEach(font => this.updateFont(font));
        this.clearFonts();
        this.createFonts();
    }

    public switchSocketContainer(): void {
        if (this.currentSiteSocket === this.siteSocket1) {
            this.currentSiteSocket = this.siteSocket2;
        } else {
            this.currentSiteSocket = this.siteSocket1;
        }
        this.draw();
    }

    private init(): void {
        this.svgContainer = this.d3.select('#canvas').append('svg')
            .attr('width', 500)
            .attr('height', 700);
    }

    private updateFont(font: Font): void {
        // search possible sockets and inlay font
        const possibleSockets: FontSocket[] = this.currentSiteSocket.getFontSockets().filter(socket => {
            return socket.getValue() === font.getValue() && !socket.isFilled();
        });
        if (possibleSockets.length > 0) {
            // select socket randomly
            const socket = possibleSockets[Math.floor(Math.random() * possibleSockets.length)];
            socket.inlayFont(font);
            // update DOM Element
            font.getDomElement()
                .transition()
                .duration(2000)
                .style('transform', 'translate(' + font.getCoords().x + 'px,' + font.getCoords().y + 'px)');
        } else {
            // no socket found
            this.removeFontFromDOM(font);
        }
    }

    /**
     * remove font from DOM
     * @param font is removed from DOM after exit animation
     */
    private removeFontFromDOM(font: Font): void {
        font.getDomElement()
            .transition()
            .duration(1000)
            .style('opacity', 0)
            .remove();
    }

    /**
     * remove Fonts from this.font which have no socket
     */
    private clearFonts(): void {
        this.fonts = this.fonts.filter(font => {
            return font.isInset();
        });
    }

    private createFonts(): void {
        this.currentSiteSocket.getFontSockets().filter(socket => !socket.isFilled()).forEach(socket => {
            // create font
            const font: Font = new Font(socket.getValue());
            socket.inlayFont(font);
            // create DOM Element
            font.setDomElement(this.svgContainer.append('text'));
            font.getDomElement()
                .style('transform', 'translate(' + font.getCoords().x + 'px,' + font.getCoords().y + 'px)')
                .text(font.getValue())
                .attr('font-family', 'Roboto Mono, monospace')
                .attr('font-size', font.getFontsize() + 'px')
                .attr('font-weight', font.isBold() ? 'bold' : 'none')
                .attr('fill', 'black')
                .style('opacity', 0)
                .transition()
                .duration(1000)
                .delay(1000)
                .style('opacity', 1);
            this.fonts.push(font);
        });
    }
}
