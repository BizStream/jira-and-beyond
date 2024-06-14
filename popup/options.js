function getAndSetOptions(
  previewImage,
  previewButton,
  urlInput,
  checkboxInput,
  messageInput
) {
  chrome.storage.sync.get(
    ["url", "checked", "message", "urlToFavicon"],
    function (data) {
      urlInput.value = data.url ?? "";
      messageInput.value = data.message ?? "";
      checkboxInput.checked = data.checked ?? false;
      previewButton.textContent = data.message ?? "Preview";
      previewImage.src = data.urlToFavicon ?? "../images/favicon.ico";
    }
  );
}

function playAnimation(saveButton) {
  const newContainer = document.createElement("div");
  newContainer.id = "lottie-container";
  newContainer.style.width = "50px";
  newContainer.style.height = "50px";
  saveButton.insertAdjacentElement("afterend", newContainer);
  const animation = lottie.loadAnimation({
    container: newContainer,
    renderer: "svg",
    loop: false,
    autoplay: true,
    path: chrome.runtime.getURL("images/checkAnimation.json"),
  });

  animation.addEventListener("complete", function () {
    newContainer.remove();
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const previewImage = document.getElementById("previewImage");
  const previewButton = document.getElementById("previewLabel");
  const urlInput = document.getElementById("urlInput");
  const checkboxInput = document.getElementById("checkboxInput");
  const saveButton = document.getElementById("saveButton");
  const messageInput = document.getElementById("messageInput");

  getAndSetOptions(
    previewImage,
    previewButton,
    urlInput,
    checkboxInput,
    messageInput
  );

  urlInput.addEventListener("input", function () {
    const url = urlInput.value;
    const urlToFavicon = new URL(url).origin + "/favicon.ico";
    previewImage.src = urlToFavicon;
  });

  messageInput.addEventListener("input", function () {
    previewButton.textContent = messageInput.value;
  });

  saveButton.addEventListener("click", function (e) {
    e.preventDefault();

    const url = urlInput.value;
    const checked = checkboxInput.checked;
    const urlToFavicon = new URL(url).origin + "/favicon.ico";
    const message = messageInput.value;
    chrome.storage.sync.set({ urlToFavicon, message, url, checked });

    playAnimation(saveButton);
    getAndSetOptions(
      previewImage,
      previewButton,
      urlInput,
      checkboxInput,
      messageInput
    );
  });
});
