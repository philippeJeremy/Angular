import { Directive, HostBinding, Input, OnChanges } from '@angular/core';

@Directive({
  selector: '[appSelected]',
})
export class SelectedDirective implements OnChanges {
  @Input() private appSelected: boolean = false;
  @HostBinding('style.backgroundColor') private backgroundColor: string =
    'white';
  @HostBinding('style.color') private color: string = 'var(--text-regular)';
  @HostBinding('style.fontWeight') private fontWeight: string = '400';

  ngOnChanges(): void {
    if (this.appSelected) {
      this.backgroundColor = 'var(--primary)';
      this.color = 'white';
      this.fontWeight = '500';
    } else {
      this.backgroundColor = 'white';
      this.fontWeight = '400';
      this.color = 'var(--text-regular)';
    }
  }

  constructor() {}
}

