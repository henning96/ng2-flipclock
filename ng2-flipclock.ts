import {NgModule} from "@angular/core";
import {FlipClockDirective} from "./directives/flipclock/flipclock.directive";

export {FlipClockDirective} from "./directives/flipclock/flipclock.directive";

@NgModule({
    declarations: [
        FlipClockDirective
    ],
    exports: [
        FlipClockDirective
    ]
})
export class FlipClockModule {

}