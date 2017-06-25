import { WordSocket } from './word-socket.model';
import { FontSocket } from './font-socket.model';

export class WordSocketContainer {

    private wordSockets: WordSocket[] = [];

    constructor(content: string) {
        content.split(' ').forEach((word: string) => {
            this.wordSockets.push(new WordSocket(word));
        });
    }

    public getWordSockets(): WordSocket[] {
        return this.wordSockets;
    }

    public getFontSockets(): FontSocket[] {
        const fontSockets: FontSocket[] = [];
        this.wordSockets.forEach(wordSocket => {
            wordSocket.getFontSockets().forEach(socket => {
                fontSockets.push(socket);
            });
        });
        return fontSockets;
    }

    public setPosition(x: number, y: number, width: number): void {
        // calculate lineheight
        let lineheight = 0;
        this.wordSockets.forEach((wordSocket: WordSocket) => {
            const highestWordFont: number = wordSocket.getHighestFont();
            if (lineheight < highestWordFont) {
                lineheight = highestWordFont;
            }
        });
        // setPosition for all lines
        this.setLinePosition(x, y + lineheight, width, lineheight, 0);
    }

    private setLinePosition(x: number, y: number, width: number, lineheight: number, socketIndex: number): void {
        if (socketIndex < this.wordSockets.length) {
            let currentLineWidth = 0;
            if (this.wordSockets[socketIndex].getLength() > width) {
                this.wordSockets[socketIndex].setPosition(x + currentLineWidth, y);
                socketIndex++;
            } else {
                while (socketIndex < this.wordSockets.length && currentLineWidth + this.wordSockets[socketIndex].getLength() <= width) {
                    this.wordSockets[socketIndex].setPosition(x + currentLineWidth, y);
                    const wordlength: number = this.wordSockets[socketIndex].getLength();
                    currentLineWidth += wordlength + lineheight * 0.55;
                    socketIndex++;
                }
            }
            this.setLinePosition(x, y + lineheight, width, lineheight, socketIndex);
        }
    }
}
