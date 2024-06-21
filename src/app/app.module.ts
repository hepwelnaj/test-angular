import {NgModule} from "@angular/core";
import {AppComponent} from "./app.component";
import {AppRoutingModule} from "./app.routes";
import {BrowserModule} from "@angular/platform-browser";
import {PaginationComponent} from "./components/pagination/pagination.component";
import {SwitcherComponent} from "./components/switcher/switcher.component";

@NgModule({
    imports: [
        AppRoutingModule,
        BrowserModule,
    ],
    declarations: [
        AppComponent,
        PaginationComponent,
        SwitcherComponent,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
