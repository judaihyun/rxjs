import { user$ } from "./instant_search";

(function () {
  user$.subscribe({
    next: (v: any) => drawLayer(v.items),
    error: (e) => {
      console.error(e);
      alert(e.message);
    },
  });

  function drawLayer(
    items: Array<{ avatar_url: string; login: string; html_url: string }>
  ) {
    console.log(items);
    const layer = document.getElementById("suggestLayer");
    if (!layer) return;
    layer.innerHTML = items
      .map((user) => {
        return `<li class="user">
            <img src="${user.avatar_url}" width="50px" height="50px"/>
            <p>
                <a href="${user.html_url}" target="_blank">${user.login}</a>
            </p>
        </li>`;
      })
      .join("");
  }
})();
