const link = document.createElement("link");
link.href = chrome.runtime.getURL("dist/css/styles.css");
link.rel = "stylesheet";
document.head.appendChild(link);

chrome.storage.sync.get(["url", "checked"], function (data) {
  console.log("Data: ", data);
  const url = data.url;
  const checked = data.checked;
});

let checkExist = setInterval(function () {
  const targetDiv = document.querySelector(
    'div[data-fullscreen-id="fullscreen-board-breadcrumbs"]'
  );

  if (targetDiv) {
    clearInterval(checkExist);

    const myButton = document.createElement("button");
    myButton.innerText = "Click me";
    myButton.className =
      "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center justify-center tag-BUTTON";
    const myImage = document.createElement("img");

    //TODO: Fix this error
    //Denying load of chrome-extension://nigodhdkccodhcagpinfogceefjaohgo/images/favicon.ico.
    //Resources must be listed in the web_accessible_resources manifest key in order to be loaded by pages outside the extension.

    myImage.src = chrome.runtime.getURL("images/favicon.ico"); // This will be the image set in options
    myImage.style.marginRight = "10px";
    const buttonText = document.createTextNode("GO TO SOLO"); // This will be whatever message is set in options

    myButton.appendChild(myImage);
    myButton.appendChild(buttonText);
    targetDiv.appendChild(myButton);

    myButton.addEventListener("click", function () {
      const currentUrl = window.location.href;
      console.log("currentUrl", currentUrl);
      const code = currentUrl.split("/")[6];
      console.log("code", code);
      if (!code) {
        console.error("No code found");
      }

      chrome.storage.sync.get(["url"], function (data) {
        console.log("Data: ", data);
        const newUrl = data.url + code; // This will be the URL set in options
        chrome.storage.sync.get(["checked"], function (data) {
          if (data.checked) {
            window.open(newUrl, "_blank");
          } else {
            window.location.href = newUrl;
          }
        });
      });
    });
  }
}, 500);
