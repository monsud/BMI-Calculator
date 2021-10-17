import { combineLatest, fromEvent } from 'rxjs';
import { pluck, map, debounceTime } from 'rxjs/operators';

const height$ = fromEvent(
    document.querySelector('#height'),
    'input'
).pipe(
    pluck('target', 'value'),
    map((n:any) => n / 100)
)

const weight$ = fromEvent(
    document.querySelector('#weight'),
    'input'
).pipe(
    pluck('target', 'value'),
    map((n:any) => parseInt(n))
)

const range = (n:any) => {
    if (n < 18.5) return 'sottopeso';
    if (n < 25) return 'normale';
    return 'sovrappeso'
}

const calculator$ = combineLatest(
    height$,
    weight$
).pipe(
    debounceTime(1000),
    map( ([h, w]) => w / (h * h)),
    //map(v => range(v))
    map(range)
)

calculator$.subscribe(console.log)