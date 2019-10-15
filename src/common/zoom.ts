export class Zoom {
    private baseZoom: number = 1;
    private basicStep: number = 0.6;
    private zoom: number = 1

    constructor( baseZoom?:number, basicStep?: number){
        if(baseZoom >= 0 ){
            this.baseZoom = baseZoom;
            this.zoom = this.baseZoom;
        }
        if(basicStep >= 0 ){
            this.basicStep = basicStep;
        }
    }

    public actualZoom(): number {
        return this.zoom;
    }
    
    public resetZoom(): void {
        this.zoom = this.baseZoom;
    }
    public canZoomIn(): boolean{
        return this.zoom < this.maxZoom();
    }

    public canZoomOut(): boolean{
        return this.zoom > this.minZoom();
    }

    public zoomIn(): void {
        if (this.canZoomIn()) {
            this.zoom = this.nextZoomInValue();
        }
    }

    public zoomOut(): void {
        if (this.canZoomOut()) {
            this.zoom = this.nextZoomOutValue();
        }
    }

    public nextZoomInValue(): number{
        return this.zoom + this.basicStep;
    }

    public nextZoomOutValue(): number{
        return this.zoom - this.basicStep;
    }

    private minZoom(): number {
        return this.basicStep * 2;
    }

    private maxZoom(): number {
        return this.baseZoom * 100;
    }
}