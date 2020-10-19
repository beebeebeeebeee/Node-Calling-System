document.addEventListener("DOMContentLoaded", () => {
  fetch("/api/dom")
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      document.title = res.title;
    });

  socket.on("update", () => {
    update();
  });
  init();
  update();
});

function init() {
  form = document.querySelector("#form");
  pending = document.querySelector("#pending");
  ready = document.querySelector("#ready");

  form.addEventListener("submit", (evt) => {
    evt.preventDefault();

    fetch(`api/add/${document.querySelector("#number").value}`);
    document.querySelector("#number").value = "";
    update();
  });
}

function update() {
  fetch(`api/status`)
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      console.log(res);
      pending.innerHTML = "";
      ready.innerHTML = "";
      res.pending.forEach((element) => {
        pending.innerHTML += `<button class="btn btn-secondary btn-block" onclick='state_ready("${element}");'>${element}</button><br>`;
      });
      res.ready.forEach((element) => {
        ready.innerHTML += `<button class="btn btn-warning btn-block" onclick='state_delete("${element}");'>${element}</button><br>`;
      });
    });
}

function state_ready(id) {
  fetch(`api/ready/${id}`);
}

function state_delete(id) {
  fetch(`api/delete/${id}`);
}
