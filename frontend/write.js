//Yedam Lee
//Java Script file that creates new post on the Carrot Market

//method that handles events when "post" button is clicked on the website
const handleSubmitForm = async (event) => {
  event.preventDefault();

  //adding the time posted as well
  const body = new FormData(form);
  body.append("insertAt", new Date().getTime());

  try {
    //connecting to the API to post new item
    const response = await fetch("/items", {
      method: "POST",
      body,
    });

    const data = await response.json();

    //moving the page back to index.html after successfully posting a new post
    if (data === "200") {
      //going to the root page
      window.location.pathname = "/";
    }
  } catch (e) {
    //catching the error
    console.error(e);
  }
};

const form = document.getElementById("write-form");
form.addEventListener("submit", handleSubmitForm);
