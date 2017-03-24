import { Injectable } from "@angular/core";

import { D3Service, D3, Selection } from 'd3-ng2-service';

import { WordSocketContainer } from "../models/word-socket-container.model";
import { WordSocket } from "../models/word-socket.model";
import { FontSocket } from "../models/font-socket.model";
import { Font } from "../models/font.model";

@Injectable()
export class FontDrawer {

    private d3: D3;
    private svgContainer: any;
    private wordSocketContainer: WordSocketContainer;
    private currentSocketContainer: WordSocketContainer;
    private wordSocketContainer2: WordSocketContainer;
    private fonts: Font[] = [];

    constructor(private d3service: D3Service) {
        this.d3 = this.d3service.getD3();
    }

    public draw(): void {
        if (this.svgContainer == null) {
            this.init();
        }
        this.currentSocketContainer.getFontSockets().forEach(socket => socket.setFilled(false));
        this.fonts.forEach(font => {
            font.setInset(false);
            this.updateFont(font);
        });
        this.clearFonts();
        this.createFonts();
    }

    public switchSocketContainer(): void {
        if (this.currentSocketContainer === this.wordSocketContainer) {
            this.currentSocketContainer = this.wordSocketContainer2;
        } else {
            this.currentSocketContainer = this.wordSocketContainer;
        }
        this.draw();
    }

    private init(): void {
        this.svgContainer = this.d3.select("#canvas").append("svg")
            .attr("width",1000)
            .attr("height",600);

        let text: string = "A peep at some distant orb has power to raise and purify our thoughts like a strain of sacred music, or a noble picture, or a passage from the grander poets. It always does one good.";
        text += text;
        text += text;
        let text2: string = "Apparently we had reached a great height in the atmosphere, for the sky was a dead black, and the stars had ceased to twinkle. By the same illusion which lifts the horizon of the sea to the level of the spectator on a hillside, the sable cloud beneath was dished out, and the car seemed to float in the middle of an immense dark sphere, whose upper half was strewn with silver.";
        text2 += text2;
        this.wordSocketContainer = new WordSocketContainer(text);
        this.wordSocketContainer.setPosition(0, 0, 500);
        this.wordSocketContainer2 = new WordSocketContainer(text2);
        this.wordSocketContainer2.setPosition(0, 0, 500);
        this.currentSocketContainer = this.wordSocketContainer;
    }

    private updateFont(font: Font): void {
        //search possible sockets and inlay font
        let possibleSockets: FontSocket[] = this.currentSocketContainer.getFontSockets().filter(socket => {
            return socket.getValue() === font.getValue() && !socket.isFilled();
        });
        if (possibleSockets.length > 0) {
            //select socket randomly
            let socket = possibleSockets[Math.floor(Math.random() * possibleSockets.length)];
            socket.setFilled(true);
            font.setInset(true);                
            font.setPoint(socket.getCoords());
            //update DOM Element
            font.getDomElement()
                .transition()
                .duration(2000)
                .attr("x", font.getCoords().x)
                .attr("y", font.getCoords().y);
        } else {
            //no socket found
            this.removeFont(font);
        }
    }

    private removeFont(font: Font): void {
        font.getDomElement()
            .transition()
            .duration(1000)
            .style("opacity", 0)
            .remove();
    }

    private clearFonts(): void {
        this.fonts = this.fonts.filter(font => {
            return font.isInset();
        });
    }

    private createFonts(): void {
        this.currentSocketContainer.getFontSockets().filter(socket => !socket.isFilled()).forEach(fontSocket => {
            //create font
            let font: Font = new Font(fontSocket.getValue());
            font.setBold(fontSocket.isBold())
                .setPoint(fontSocket.getCoords())
                .setFontsize(fontSocket.getFontsize());
            //create DOM Element
            font.setDomElement(this.svgContainer.append("text"));
            font.getDomElement()
                .attr("x", font.getCoords().x)
                .attr("y", font.getCoords().y)
                .text(font.getValue())
                .attr("font-family", "'Roboto Mono', monospace")
                .attr("font-size", font.getFontsize() + "px")
                .attr("font-weight", font.isBold() ? "bold" : "none")
                .attr("fill", "black")
                .style("opacity", 0)
                .transition()
                .duration(1000)
                .delay(1000)
                .style("opacity", 1);
            this.fonts.push(font);
        });
    }
}