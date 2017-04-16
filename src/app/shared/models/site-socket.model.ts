import { WordSocketContainer } from './word-socket-container.model';
import { WordSocket } from './word-socket.model';
import { FontSocket } from './font-socket.model';

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

    public setPosition(): void {
        // todo
    }
}