import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  AfterViewInit,
  ElementRef,
  ViewChild
} from '@angular/core';

declare global {
  interface Window { DM: any; }
}

@Component({
  // tslint:disable-next-line
  selector: 'dailymotion',
  template: `<div #dailymotion></div>`,
  styles: []
})
export class NgxDailymotionComponent implements AfterViewInit, OnChanges {

  @Input() video = '';
  @Input() width = 480;
  @Input() height = 270;
  @Input() autoplay = false;
  @Input() autoplayMute = false;
  @Input() controls = false;
  @Input() mute = false;
  @Input() quality = 'auto';
  @Input() uiLogo = false;
  @Input() queueAutoplayNext = false;
  @Input() queueEnable = false;
  @Input() sharingEnable = false;
  @Input() start = 0;
  @Input() uiTheme = 'dark';

  @Input() pause = false;

  @ViewChild('dailymotion', {static: false}) div;

  player: any = null;

  constructor(
    public element: ElementRef<HTMLElement>
  ) {}

  ngAfterViewInit() {
    if (!this.video) {
      return;
    }

    // https://developer.dailymotion.com/player/#player-parameters
    const options = {
      video: this.video,
      width: this.width,
      height: this.height,
      params: {
        autoplay: this.autoplay,
        controls: this.controls,
        'ui-logo': this.uiLogo,
        'ui-theme': this.uiTheme
      }
    };
    this.player = window.DM.player(this.div.nativeElement, options);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!this.player) {
      return;
    }

    for (const propName in changes) {
      if (propName === 'video') {
        // https://developer.dailymotion.com/player/#player-parameters
        const options = {
          video: this.video
        };
        this.player.load(options);
      } else if (propName === 'controls') {
        this.player.setControls(this.controls);
      } else if (propName === 'pause') {
        if (changes[propName].currentValue === 'true') {
          this.player.pause();
        } else {
          this.player.play();
        }
      }
    }

  }
}
