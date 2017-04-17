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

    public draw(): void {
        if (this.svgContainer == null) {
            this.init();
        }
        this.currentSiteSocket.getFontSockets().forEach(socket => socket.removeFont());
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
            .attr('width', 1000)
            .attr('height', 600);

        const text1: string[] = [`A peep at some distant orb has power to raise and purify our thoughts like a strain of sacred music, 
        or a noble picture, or a passage from the grander poets. It always does one good.`];
        text1.push(text1[0]);
        text1.push(text1[0]);
        const text2: string[] = [`Apparently we had reached a great height in the atmosphere, for the sky was a dead black, and the 
        stars had ceased to twinkle. By the same illusion which lifts the horizon of the sea to the level of the spectator on 
        a hillside, the sable cloud beneath was dished out, and the car seemed to float in the middle of an immense dark sphere, 
        whose upper half was strewn with silver.`];
        text2.push(text2[0]);
        this.siteSocket1 = new SiteSocketContainer(text1);
        this.siteSocket1.setPosition([new Point(0, 0), new Point(0, 500), new Point(0, 1000)], [500, 500, 500]);
        this.siteSocket2 = new SiteSocketContainer(text2);
        this.siteSocket2.setPosition([new Point(0, 0), new Point(0, 500), new Point(0, 1000)], [500, 500, 500]);
        this.currentSiteSocket = this.siteSocket1;
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
                .attr('x', font.getCoords().x)
                .attr('y', font.getCoords().y);
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
        this.currentSiteSocket.getFontSockets().filter(socket => !socket.isFilled()).forEach(fontSocket => {
            // create font
            const font: Font = new Font(fontSocket.getValue());
            // create DOM Element
            font.setDomElement(this.svgContainer.append('text'));
            font.getDomElement()
                .attr('x', font.getCoords().x)
                .attr('y', font.getCoords().y)
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
