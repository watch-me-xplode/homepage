import { Font } from './font.model';
import { Point } from './point.model';

export class FontSocket {

    private inlayedFont: Font = null;
    private value: string;
    private coords: Point;
    private bold = false;
    private fontsize = 20;

    constructor(value: string) {
        this.value = value;
    }

    public isFilled(): boolean { return this.inlayedFont != null; }
    public getValue(): string { return this.value; }
    public getCoords(): Point { return this.coords; }
    public isBold(): boolean { return this.bold; }
    public getFontsize(): number { return this.fontsize; }
    public getLength(): number { return this.fontsize * 0.55; }

    public setCoords(x: number, y: number): void { this.coords = new Point(x, y); }
    public setPoint(point: Point): void { this.coords = point; }
    public setBold(bold: boolean): void { this.bold = bold; }
    public inlayFont(font: Font): void {
        if (this.inlayedFont == null) {
            this.inlayedFont = font;
            this.inlayedFont.setIntoSocket(this);
        } else {
            console.log('error: Inlayed font into filled socket');
        }
    }
    public removeFont(): void {
        if (this.inlayedFont != null) {
            this.inlayedFont.removeFromSocket();
        }
        this.inlayedFont = null;
    }
    public setFontsize(size: number): void { this.fontsize = size; }
}
