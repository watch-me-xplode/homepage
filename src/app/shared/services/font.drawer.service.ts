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
    private wordSocketContainer2: WordSocketContainer;
    private fonts: Font[] = [];

    constructor(private d3service: D3Service) {
        this.d3 = this.d3service.getD3();
    }

    public draw(): void {
        if (this.svgContainer == null) {
            this.init();
        }

        //collect data
        var fonts = this.svgContainer.selectAll(".fonts").data(this.fonts);
        // Update
        fonts
            .transition()
            .duration(1000)
            .attr("x", (font) => font.getCoords().x);
        //Create
        fonts.enter().append("text")
            .attr("class", "fonts")
            .attr("x", (font) => font.getCoords().x)
            .attr("y", (font) => font.getCoords().y)
            .text((font) => font.getValue())
            .attr("font-family", "'Roboto Mono', monospace")
            .attr("font-size", (font) => font.getFontsize() + "px")
            .attr("font-weight", (font) => font.isBold() ? "bold" : "none")
            .attr("fill", "black");
            // .transition()
            // .delay(3000)
            // .duration(1000)
            // .attr("x", font => Math.floor(Math.random() * 500) + 1  );
        //Remove
        fonts.exit().remove();

        
    }

    private init(): void {
        this.svgContainer = this.d3.select("body").append("svg")
            .attr("width",1000)
            .attr("height",200);

        let text: string = "A peep at some distant orb has power to raise and purify our thoughts like a strain of sacred music, or a noble picture, or a passage from the grander poets. It always does one good.";
        text = "aaaaaaaagood";
        let text2: string = "dgoo";
        this.wordSocketContainer = new WordSocketContainer(text);
        this.wordSocketContainer.setPosition(0, 0, 500);
        this.wordSocketContainer.getWordSockets().forEach(wordSocket => {
            wordSocket.getFontSockets().forEach(fontSocket => {
                let font: Font = new Font(fontSocket.getValue());
                font.setBold(fontSocket.isBold())
                    .setPoint(fontSocket.getCoords())
                    .setFontsize(fontSocket.getFontsize())
                this.fonts.push(font);
            });
        });
        this.wordSocketContainer2 = new WordSocketContainer(text2);
        this.wordSocketContainer2.setPosition(0, 0, 500);
    }

    public switchSocketContainer(): void {
        let emptyFontIndexList: number[] = [];
        let counter: number = 0;
        this.fonts.forEach(font => {
            let possibleSockets: FontSocket[] = this.wordSocketContainer2.getFontSockets().filter(socket => {
                if (socket.getValue() === font.getValue() && !socket.isFilled()) {
                    return true;
                } else {
                    return false;
                }
            });
            if (possibleSockets.length < 1) {
                emptyFontIndexList.push(counter);
            } else {
                let socket = possibleSockets[Math.floor(Math.random() * possibleSockets.length)];
                font.setPoint(socket.getCoords());
                socket.setFilled(true);
            }
            counter++;
        });
        //remove unused fonts from list
        this.fonts = this.fonts.filter((font, outerIndex) => {
            if (emptyFontIndexList.filter(innerIndex => {
                if (outerIndex === innerIndex) {
                    return true;
                } else {
                    return false;
                }
            }).length > 0) {
                return false;
            } else {
                return true;
            }
        });
        this.draw();
    }
}