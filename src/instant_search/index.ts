import {
  fromEvent,
  map,
  filter,
  debounceTime,
  distinctUntilChanged,
  tap,
  switchMap,
  catchError,
} from "rxjs";
import Axios from "axios";
const axios = Axios;

const dom = document.getElementById("search");
const layer = document.getElementById("suggestLayer");
if (!dom) throw new Error("dom is not defined");
if (!layer) throw new Error("layer is not defined");
const keyup$ = fromEvent(dom, "keyup").pipe(
  debounceTime(300),
  map((e) => (e.target as HTMLInputElement)?.value!),
  distinctUntilChanged()
);

const user$ = keyup$.pipe(
  filter((query) => query.trim().length > 0),
  tap(showLoading),
  switchMap((query) =>
    axios.get("https://api.github.com/search/users?q=" + query)
  ),
  tap(hideLoading),
  catchError((e, orgObservable) => {
    console.log("서버 에러가 발생하였으나 다시 호출하도록 처리.", e.message);

    return orgObservable;
  }),
  map((e) => e.data)
);

keyup$
  .pipe(
    filter((query) => query.trim().length === 0),
    tap((v) => (layer.innerHTML = ""))
  )
  .subscribe();

const loading = document.getElementById("loading");
const loadingText = document.getElementById("loading_text");

function showLoading() {
  if (!loading) return;
  if (!loadingText) return;
  console.log("....loading....");
  loading.style.display = "block";
  loadingText.innerHTML = "....loading....";
}

function hideLoading() {
  if (!loading) return;
  if (!loadingText) return;
  console.log("....loading out....");
  loading.style.display = "none";
  loadingText.innerHTML = "";
}

export { user$ };
