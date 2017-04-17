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

    public setPosition(coords: Point[], widths: number[]): void {
        if ((coords.length === widths.length) && (coords.length === this.containers.length)) {
            for (let i = 0; i < this.containers.length; i++) {
                this.containers[i].setPosition(coords[i].x, coords[i].y, widths[i]);
            }
        }
    }
}
