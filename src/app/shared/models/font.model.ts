import { FontSocket } from './font-socket.model';
import { Point } from './point.model';

export class Font {

    private value: string;
    private coords: Point;
    private bold = false;
    private fontsize: number;
    private domElement: any = null;
    private inset = false;

    constructor(value: string) {
        this.value = value;
    }

    public getValue(): string { return this.value; }
    public getCoords(): Point { return this.coords; }
    public isBold(): boolean { return this.bold; }
    public isInset(): boolean { return this.inset; }
    public getFontsize(): number { return this.fontsize; }
    public getDomElement(): any { return this.domElement; }

    public setIntoSocket(socket: FontSocket): Font {
        this.inset = true;
        this.coords = socket.getCoords();
        this.bold = socket.isBold();
        this.fontsize = socket.getFontsize();
        return this;
    }
    public removeFromSocket(): Font {
        this.inset = false;
        return this;
    }
    public setDomElement(domElement: any): Font { this.domElement = domElement; return this; }
}
