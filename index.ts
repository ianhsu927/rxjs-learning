import {
  filter,
  fromEvent,
  map,
  debounceTime,
  merge,
  switchMap,
  catchError,
  of,
  interval,
} from "rxjs";
import { ajax } from "rxjs/ajax";

/**
 * 按钮点击事件
 */
function buttonEvent() {
  const button = document.getElementById("rxButton")!;

  const buttonClicks$ = fromEvent(button, "click");

  buttonClicks$
    .pipe(
      map((event) => event.clientX),
      filter((clientX) => clientX > 50)
    )
    .subscribe((clientX) => console.log(`Mouse click at: ${clientX}`));
}

/**
 * 输入框事件
 */
function inputEvent() {
  const input = document.getElementById("rxInput")!;

  const input$ = fromEvent(input, "input");

  input$
    .pipe(
      debounceTime(300),
      map((event) => event.target.value)
    )
    .subscribe((value) => console.log(value));
}

function mergeEvent() {
  const button1 = document.getElementById("button1")!;
  const button2 = document.getElementById("button2")!;
  const button1Clicks$ = fromEvent(button1, "click");
  const button2Clicks$ = fromEvent(button2, "click");
  const mergedClicks$ = merge(
    button1Clicks$.pipe(map(() => "Button 1 clicked")),
    button2Clicks$.pipe(map(() => "Button 2 clicked"))
  );

  mergedClicks$.subscribe((message) => console.log(message));
}

/**
 * ajax 请求
 */
function ajaxEvent() {
  const button = document.getElementById("fetchData")!;

  fromEvent(button, "click")
    .pipe(
      switchMap(() =>
        ajax.getJSON("https://jsonplaceholder.typicode.com/todos/1").pipe(
          catchError((error) => {
            console.error("Error:", error);
            return of({ error: true, message: error.message });
          })
        )
      )
    )
    .subscribe((data) => console.log("Data:", data));
}

/**
 * 计时器
 */
function timerEvent() {
  const timerDiv = document.getElementById("timer")!;
  interval(1000).subscribe(
    (seconds) => (timerDiv.textContent = seconds.toString())
  );
}

timerEvent();
