import { WordSocketContainer } from './word-socket-container.model';
import { WordSocket } from './word-socket.model';
import { FontSocket } from './font-socket.model';
import { Point } from './point.model';

export class SiteSocketContainer {

    private containers: WordSocketContainer[] = [];

    constructor(contents: string[]) {
        contents.forEach(content => {
            this.containers.push(new WordSocketContainer(content));
        });
    }

    public getWordSockets(): WordSocket[] {
        const wordSockets: WordSocket[] = [];
        this.containers.forEach(container => {
            container.getWordSockets().forEach(wordSocket => {
                wordSockets.push(wordSocket);
            });
        });
        return wordSockets;
    }
    public getFontSockets(): FontSocket[] {
        const fontSockets: FontSocket[] = [];
        this.containers.forEach(container => {
            container.getWordSockets().forEach(wordSocket => {
                wordSocket.getFontSockets().forEach(socket => {
                    fontSockets.push(socket);
                });
            });
        });
        return fontSockets;
    }

    /**
     * Set the position of the containers on the canvas.
     * @param coords An Array of Points which represents the starting coords of each text container.
     * @param widths An Array which represents the length of each text container
     */
    public setPosition(coords: Point[], widths: number[]): void {
        if ((coords.length === widths.length) && (coords.length === this.containers.length)) {
            this.adaptPosition(coords, widths);
            for (let i = 0; i < this.containers.length; i++) {
                this.containers[i].setPosition(coords[i].x, coords[i].y, widths[i]);
            }
        }  else {
            console.log('Warning: Arraylenght of coords, widths and containerelements is unequal.');
        }
    }

    /**
     * Adapt the positon and width of the containers to match current viewwidth.
     *  If the container is to far on the right side, the x-coord is adapted to match the viewwidth.
     * @param coords An Array of Points which represents the starting coords of each text container.
     * @param widths An Array which represents the length of each text container
     */
    private adaptPosition(coords: Point[], widths: number[]): void {
        const viewwidth = window.innerWidth;
        for (let i = 0; i < coords.length; i++) {
            if (widths[i] > viewwidth) {
                widths[i] = viewwidth;
            }
            if (coords[i].x + widths[i] > viewwidth) {
                coords[i].x = viewwidth - widths[i];
            }
        }
    }
}
