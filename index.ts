import rxChapter1 from "./rxChapter1";

rxChapter1().subscribe({
  next: (v) => console.log(v),
  error: (e) => console.error(e),
});
