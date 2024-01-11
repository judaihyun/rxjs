import { Observable } from "rxjs";

const rxChapter1 = () => {
  const numbers$ = new Observable(function subscribe(observer) {
    observer.next(1);
    observer.next(2);
    observer.next(3);
  });

  return numbers$;
};

export default rxChapter1;
