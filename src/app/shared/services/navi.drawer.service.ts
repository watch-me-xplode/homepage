import { Injectable } from "@angular/core";

import { D3Service, D3, Selection } from 'd3-ng2-service';

@Injectable()
export class NaviDrawer {

    private d3: D3;
    private svgContainer: any;

    constructor(private d3service: D3Service) {
        this.d3 = this.d3service.getD3();
    }

    public draw(): void {
        if (this.svgContainer == null) {
            this.init();
        }
    }

    private init(): void {

    }
}