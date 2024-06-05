const link = document.createElement("link");
link.href = chrome.runtime.getURL("dist/css/styles.css");
link.rel = "stylesheet";
document.head.appendChild(link);

const targetDivState = 'nav[aria-label="Breadcrumbs"] ol';
let myButton;

function createButton() {
  myButton = document.createElement("button");
  myButton.className =
    "flex items-center justify-center border border-gray-300 text-gray-800 font-bold px-2 rounded shadow h-[24px] ml-10 text-sm mt-[-10px] pt-4 pb-4";
  const myImage = document.createElement("img");
  myImage.className = "mr-2 h-[20px]";

  chrome.storage.sync.get(["message", "urlToFavicon"], function (data) {
    const buttonText = document.createTextNode(data.message);
    myButton.appendChild(buttonText);
    myImage.src = data.urlToFavicon;
  });

  myButton.appendChild(myImage);

  clickButton(myButton);
}

function clickButton(myButton) {
  myButton.addEventListener("click", function () {
    const currentUrl = window.location.href;
    const code = currentUrl.split("/")[7];
    if (!code) {
      console.error("No code found");
      return;
    }

    chrome.storage.sync.get(["url"], function (data) {
      let newUrl = data.url;
      newUrl += code;

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

const observer = new MutationObserver((mutations, observerInstance) => {
  const targetDiv = document.querySelector(targetDivState);

  if (targetDiv) {
    if (!myButton) {
      createButton();
    }

    if (!targetDiv.contains(myButton)) {
      targetDiv.appendChild(myButton);
    }
  }
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
});
