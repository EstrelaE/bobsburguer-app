document.querySelector("#burgerButton").addEventListener("click", getBurger);
document.querySelector("#storeButton").addEventListener("click", getStore);
document.querySelector("#truckButton").addEventListener("click", getTruck);

function getBurger() {
  const season = document.querySelector("#season").value;
  const episode = document.querySelector("#episode").value;
  getFetch("burgerOfTheDay", season, episode);
}
function getStore() {
  const season = document.querySelector("#season").value;
  const episode = document.querySelector("#episode").value;
  getFetch("storeNextDoor", season, episode);
}
function getTruck() {
  const season = document.querySelector("#season").value;
  const episode = document.querySelector("#episode").value;
  getFetch(
    "pestControlTruck",
    season,
    `https://bobsburgers-api.herokuapp.com/episodes/${episode}`
  );
}

function getFetch(name, s, e) {
  const url = `https://bobsburgers-api.herokuapp.com/${name}?season=${s}&episode=${e}`;

  fetch(url)
    .then((res) => res.json()) // parse response as JSON
    .then((data) => {
      console.log(data);
      if (!data.length) {
        document.querySelector("h2").innerText = "Can't find none :(";
        document.querySelector(".content").innerHTML = "";
      } else {
        document.querySelector("h2").innerText = "ENJOY!";
      }
      data.forEach((e) => {
        document.querySelector(".content").innerHTML += `
        <h3>${e.name}</h3> <p>${e.price}</p>`;

        if (!e.price) {
          document.querySelector(".content").innerHTML = `<h3>${e.name}</h3>
          <img src="${e.image}" /> `;
          document.querySelector("img").src = e.image;
        }
      });
    })
    .catch((err) => {
      console.log(`error ${err}`);
    });
}
