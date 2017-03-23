import { Point } from "./point.model";

export class FontSocket {

    private filled: boolean = false;
    private value: string;
    private coords: Point;
    private bold: boolean = false;
    private fontsize: number = 20;

    constructor(value: string) {
        this.value = value;
    }

    public isFilled(): boolean { return this.filled; }
    public getValue(): string { return this.value; }
    public getCoords(): Point { return this.coords; }
    public isBold(): boolean { return this.bold; }
    public getFontsize(): number { return this.fontsize; }
    public getLength(): number { return this.fontsize * 0.55; }

    public setCoords(x: number, y: number): void { this.coords = new Point(x, y) }
    public setPoint(point: Point): void { this.coords = point; }
    public setBold(bold: boolean): void { this.bold = bold; }
    public setFilled(filled: boolean): void { this.filled = filled; }
    public setFontsize(size: number): void { this.fontsize = size; }
}