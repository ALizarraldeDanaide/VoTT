export class Zoom {
    private baseZoom: number = 1;
    private basicStep: number = 0.6;
    private zoom: number = 1;
    private minZoom: number = 0.1;
    private maxZoom: number = 100;

    constructor( baseZoom?:number, basicStep?: number, minZoom?: number, maxZoom?: number){
        if(baseZoom >= 0 ){
            this.baseZoom = baseZoom;
            this.zoom = this.baseZoom;
        }
        if(basicStep >= 0 ){
            this.basicStep = basicStep;
        }
        if(minZoom >= 0 ){
            this.minZoom = minZoom;
        }
        if(maxZoom >= 0 ){
            this.maxZoom = maxZoom;
        }
    }

    public actualZoom(): number {
        return this.zoom;
    }
    
    public resetZoom(): void {
        this.zoom = this.baseZoom;
    }
    
    public canZoomIn(): boolean{
        return this.zoom < this.maxZoom;
    }

    public canZoomOut(): boolean{
        return this.zoom > this.minZoom;
    }

    public zoomIn(): void {
        this.zoom = this.nextZoomInValue();
    }

    public zoomOut(): void {
        this.zoom = this.nextZoomOutValue();
    }

    public nextZoomInValue(): number{
        if( (this.zoom + 0.1) <= 1){
            return this.zoom + 0.1;
        }
        else{
            if( (this.zoom + this.basicStep) <= this.maxZoom){
                return this.zoom + this.basicStep;
            }
            else{
                return this.maxZoom;
            }
        }
    }

    public nextZoomOutValue(): number{
        if( (this.zoom - this.basicStep) >= 1){
            return this.zoom - this.basicStep;
        }
        else{
            if((this.zoom - 0.1) >= this.minZoom){
                return this.zoom - 0.1;
            }
            else{
                return this.minZoom;
            }
        }
    }
}