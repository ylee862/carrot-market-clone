//JS for our root page for Carrot Market

//getting the time element
const calculateTime = (timeStamp) => {
  const curTime = new Date().getTime() + 4 * 60 * 60 * 1000;

  //finding how long ago the post was posted
  const time = new Date(curTime - timeStamp);

  const hour = time.getHours();
  const min = time.getMinutes();
  const sec = time.getSeconds();

  //showing the time
  if (hour > 0) return `${hour} hours ago`;
  else if (min > 0) return `${min} minutes ago`;
  else if (sec > 0) return `${sec} seconds ago`;
  else return "just listed";
};

const renderData = (data) => {
  const main = document.querySelector("main");

  //creating div for each element in our database
  //using reverse() to show the posts that were newly listed to show on the top of the page
  data.reverse().forEach(async (obj) => {
    //creating item-list div
    const itemListDiv = document.createElement("div");
    itemListDiv.className = "item-list";

    //creating image div
    const imgDiv = document.createElement("div");
    imgDiv.className = "item-list__img";

    //posting image onto the screen
    const img = document.createElement("img");
    const response = await fetch(`/images/${obj.id}`);

    //changing it into blob type
    const blob = await response.blob();

    //changing the blob into url
    const url = URL.createObjectURL(blob);
    img.src = url;

    //creating item-list__info div, having the information about the item
    const itemListInfoDiv = document.createElement("div");
    itemListInfoDiv.className = "item-list__info";

    //creating item-list__info--title div
    const itemListInfoTitleDiv = document.createElement("div");
    itemListInfoTitleDiv.className = "item-list__info--title";
    itemListInfoTitleDiv.innerText = obj.title;

    //creating item-list__info--meta
    const itemListInfoMetaDiv = document.createElement("div");
    itemListInfoMetaDiv.className = "item-list__info--meta";
    itemListInfoMetaDiv.innerText =
      obj.place + " " + calculateTime(obj.insertAt);

    //creating item-list__info--price
    const itemListInfoPriceDiv = document.createElement("div");
    itemListInfoPriceDiv.className = "item-list__info--price";
    itemListInfoPriceDiv.innerText = "$" + obj.price;

    imgDiv.appendChild(img);

    //adding title, meta, price div into Info div
    itemListInfoDiv.appendChild(itemListInfoTitleDiv);
    itemListInfoDiv.appendChild(itemListInfoMetaDiv);
    itemListInfoDiv.appendChild(itemListInfoPriceDiv);

    itemListDiv.appendChild(imgDiv);

    //adding Info div into main div
    itemListDiv.appendChild(itemListInfoDiv);

    main.appendChild(itemListDiv);
  });
};

const fetchList = async () => {
  console.log("Data received:");
  //sending GET API request
  const response = await fetch("/items");

  //data comes in as an array
  const data = await response.json();

  renderData(data);
};

console.log("Data received:");

fetchList();
