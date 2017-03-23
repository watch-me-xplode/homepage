import { FontSocket } from "./font-socket.model";

export class WordSocket {

    private fontSockets: FontSocket[] = [];

    constructor(content: string) {
        for (let i = 0; i < content.length; i++) {
            this.fontSockets.push(new FontSocket(content.charAt(i)));
        }
    }

    public getFontSockets(): FontSocket[] { return this.fontSockets; }

    public setPosition(x: number, y: number): void {
        this.fontSockets.forEach((FontSocket: FontSocket) => {
            FontSocket.setCoords(x, y);
            x += FontSocket.getLength();
        });
    }

    public getLength(): number {
        var length: number = 0;
        this.fontSockets.forEach((fontsocket: FontSocket) => {
            length += fontsocket.getLength();
        });
        return length;
    }

    public getHighestFont(): number {
        var size: number = 0;
        this.fontSockets.forEach((fontSocket: FontSocket) => {
            if (size < fontSocket.getFontsize()) {
                size = fontSocket.getFontsize();
            }
        });
        return size;
    }
}