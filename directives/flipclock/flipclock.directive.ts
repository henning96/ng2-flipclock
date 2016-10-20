import {Directive, ElementRef, Input, Output, EventEmitter} from "@angular/core";

export interface IFlipClockConfig {
    autoStart?: boolean;
    countdown?: boolean;
    classes?: {};
    clockFace?: string;
    defaultClockFace?: string;
    defaultLanguage?: string;
    language?: string;
    callbacks?: {[cb: string]: Function}
}

export interface IFlipClock {
    new (element: any, time?, config?: IFlipClockConfig);
    start: Function;
    stop: Function;
    setCountdown: (countdown: boolean) => void;
    getCountdown: () => boolean;
    reset: Function;
    timer: any;
}

export interface IFlipClockTime {
    minimumDigits: number;
    time: number;
}

declare const FlipClock: IFlipClock;

@Directive({
    selector: "flip-clock"
})
export class FlipClockDirective {

    private clock: IFlipClock;

    @Input('config') config: IFlipClockConfig = {};
    @Output('start') onStart = new EventEmitter<void>();
    @Output('stop') onStop = new EventEmitter<void>();
    @Output('interval') onInterval = new EventEmitter<void>();
    @Output('reset') onReset = new EventEmitter<void>();

    constructor(private ref: ElementRef) {}

    private secureCallThrough(method: string, ...args: any[]): any{
        if(this.clock){
            return this.clock[method].apply(this.clock, args);
        }
    }

    getCountdown(): boolean{
        return this.secureCallThrough("getCountdown");
    }

    start(){
        this.secureCallThrough("start");
    }

    stop(){
        this.secureCallThrough("stop");
    }

    reset(){
        this.secureCallThrough("reset");
    }

    setCountdown(countdown: boolean){
       this.secureCallThrough("setCountdown", countdown);
    }

    getTime(): IFlipClockTime{
        return this.secureCallThrough("getTime");
    }

    /***
     * @param time in seconds
     */
    setTime(time: number){
        return this.secureCallThrough("setTime", time);
    }

    ngAfterViewInit(){
        if(!FlipClock)
            throw new Error("A global FlipClock object is required for this plugin to work!");

        this.config.callbacks = {
            start: () => {
                this.onStart.emit(null);
            },
            stop: () => {
                this.onStop.emit(null);
            },
            interval: () => {
                this.onInterval.emit(null);
            },
            reset: () => {
                this.onReset.emit(null);
            }
        };

        this.clock = new FlipClock(this.ref.nativeElement, this.config);
    }
}