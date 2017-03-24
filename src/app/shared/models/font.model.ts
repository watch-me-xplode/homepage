import { Point } from "./point.model";

export class Font {

    private value: string;
    private coords: Point;
    private bold: boolean = false;
    private fontsize: number;
    private domElement: any = null;
    private inset: boolean = false;

    constructor(value: string) {
        this.value = value;
    }

    public getValue(): string { return this.value; }
    public getCoords(): Point { return this.coords; }
    public isBold(): boolean { return this.bold; }
    public isInset(): boolean { return this.inset; }
    public getFontsize(): number { return this.fontsize; }
    public getDomElement(): any { return this.domElement; }

    public setCoords(x: number, y: number): Font { this.coords = new Point(x, y); return this; }
    public setPoint(point: Point): Font { this.coords = point; return this; }
    public setBold(bold: boolean): Font { this.bold = bold; return this; }
    public setInset(inset: boolean): Font { this.inset = inset; return this; }
    public setFontsize(size: number): Font { this.fontsize = size; return this; }
    public setDomElement(domElement: any): Font { this.domElement = domElement; return this; }
}