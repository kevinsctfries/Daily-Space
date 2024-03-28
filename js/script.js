const apod = `https://api.nasa.gov/planetary/apod?api_key=FNfFs6Abw19SfaXKG69opY1xn5ZBEuUAZgeFMH4w&date=`;
let currentDate = new Date();
let userDate = currentDate.toJSON().slice(0, 10);
let url = apod + userDate;

//fetches image from nasa
function getFetch() {
  fetch(url)
    .then((res) => res.json()) // parse response as JSON
    .then((data) => {
      console.log(data);
      if (data.media_type === "image") {
        document.querySelector("img").src = data.url;
      } else if (data.media_type === "video") {
        document.querySelector("iframe").src = data.url;
      } else {
        console.log("Houston, we have a problem");
      }
      document.querySelector("#imgTitle").innerText = data.title;
      document.querySelector("#imgDate").innerText = data.date;
      document.querySelector("#imgDesc").innerText = data.explanation;
    })
    .catch((err) => {
      console.log(`error ${err}`);
    });
}

getFetch();

//go back 1 day
document.querySelector("#btnBack").addEventListener("click", backDate);

function backDate() {
  let preDay = currentDate;
  preDay.setDate(preDay.getDate() - 1);
  preDay = preDay.toJSON().slice(0, 10);
  console.log(preDay);
  url = apod + preDay;
  getFetch();
}

document.querySelector("#btnNext").addEventListener("click", nextDate);

function nextDate() {
  let nextDay = currentDate;
  nextDay.setDate(nextDay.getDate() + 1);
  nextDay = nextDay.toJSON().slice(0, 10);
  url = apod + nextDay;
  getFetch();
}
