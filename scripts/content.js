const link = document.createElement("link");
link.href = chrome.runtime.getURL("dist/css/styles.css");
link.rel = "stylesheet";
document.head.appendChild(link);

const targetDivState = 'div[data-fullscreen-id="fullscreen-board-breadcrumbs"]';

const observer = new MutationObserver((mutations, observerInstance) => {
  const targetDiv = document.querySelector(targetDivState);

  if (targetDiv) {
    observerInstance.disconnect();

    const myButton = document.createElement("button");
    myButton.className =
      "flex items-center justify-center border border-gray-300 text-gray-800 font-bold py-2 px-4 rounded shadow text-lg";
    const myImage = document.createElement("img");

    chrome.storage.local.get(["base64"], function (data) {
      const base64 = data.base64;
      if (base64) {
        myImage.src = base64;
      }
    });
    myImage.className = "mr-2 h-[20px]";
    targetDiv.className = "flex items-center gap-10";

    chrome.storage.sync.get(["message"], function (data) {
      const buttonText = document.createTextNode(data.message);
      myButton.appendChild(buttonText); // This will be whatever message is set in options
    });

    myButton.appendChild(myImage);
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
        //TODO: check to make sure end of url has a '/'
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
});

// Start observing the document for changes
observer.observe(document.body, {
  childList: true,
  subtree: true,
});
