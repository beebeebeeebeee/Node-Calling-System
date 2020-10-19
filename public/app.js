document.addEventListener("DOMContentLoaded", () => {
  fetch("/api/dom")
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      document.title = res.title;
    });

  get_status();

  socket.on("update", () => {
    get_status();
  });
});

function get_status() {
  const prepare = document.querySelector("#prepare");
  const ready = document.querySelector("#ready");
  fetch("/api/status")
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      console.log(res);
      prepare.innerHTML = "";
      ready.innerHTML = "";
      res.pending.forEach((element) => {
        prepare.innerHTML += `${element}<br>`;
      });
      res.ready.forEach((element) => {
        ready.innerHTML += `${element}<br>`;
      });
    });
}
