import { Component, OnInit } from '@angular/core';
import { interval, takeWhile, tap } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  max = 1;
  current = 0;

  start() {
    // OLD:
    // const interval = Observable.interval(100);
    // interval
    //   .takeWhile((_: unknown) => !this.isFinished)
    //   .do((i: unknown) => this.current += 0.1)
    //   .subscribe();

    interval(1000).pipe(
      takeWhile((_: unknown) => !this.isFinished),
      tap((_: unknown) => this.current += 0.1)
    ).subscribe();
  }

  finish() {
    this.current = this.max;
  }

  reset() {
    this.current = 0;
  }

  get maxVal() {
    const { max } = this;
    if (isNaN(max) || max < 0.1)
      return 0.1;
    return max;
  }

  get currentVal() {
    const { current } = this;
    if (isNaN(current) || current < 0)
      return 0;
    return this.current;
  }

  get isFinished() {
    return this.currentVal >= this.maxVal;
  }
}
