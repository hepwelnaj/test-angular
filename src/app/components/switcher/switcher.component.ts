import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-switcher',
  templateUrl: './switcher.component.html',
  styleUrls: ['./switcher.component.scss']
})
export class SwitcherComponent {
    @Output()
    public onSwitch: EventEmitter<boolean> = new EventEmitter<boolean>();

    public isOn: boolean = false;
    toggleSwitch(): void {
        this.isOn = !this.isOn;
        this.onSwitch.next(this.isOn);
    }

}
