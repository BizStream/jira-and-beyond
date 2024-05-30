function getAndSetOptions() {
  const previewImage = document.getElementById("previewImage");

  chrome.storage.sync.get(
    ["url", "checked", "message", "urlToFavicon"],
    function (data) {
      urlInput.value = data.url ?? "";
      messageInput.value = data.message ?? "";
      checkboxInput.checked = data.checked;
      previewButton.textContent = data.message;
      if (data.urlToFavicon) {
        previewImage.src = data.urlToFavicon;
      }
    }
  );
}

document.addEventListener("DOMContentLoaded", function () {
  chrome.storage.sync.get(
    ["url", "checked", "message", "urlToFavicon"],
    function (data) {
      urlInput.value = data.url ?? "";
      messageInput.value = data.message ?? "";
      checkboxInput.checked = data.checked;
      previewButton.textContent = data.message;
      if (data.urlToFavicon) {
        previewImage.src = data.urlToFavicon;
      }
    }
  );

  const previewImage = document.getElementById("previewImage");
  const previewButton = document.getElementById("previewLabel");
  const urlInput = document.getElementById("urlInput");
  const checkboxInput = document.getElementById("checkboxInput");
  const saveButton = document.getElementById("saveButton");
  const messageInput = document.getElementById("messageInput");

  saveButton.addEventListener("click", function (e) {
    e.preventDefault();

    const url = urlInput.value;
    const checked = checkboxInput.checked;
    const urlToFavicon = new URL(url).origin + "/favicon.ico";
    const message = messageInput.value;
    chrome.storage.sync.set({ urlToFavicon, message });

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

    chrome.storage.sync.get(["urlToFavicon", "message"], function (data) {
      const urlToFavicon = data.urlToFavicon;
      console.log(urlToFavicon);
      if (urlToFavicon) {
        previewImage.src = urlToFavicon;
        console.log(previewImage.src);
      }
      previewButton.textContent = data.message;
    });
    chrome.storage.sync.set({ url, checked, message, urlToFavicon });
  });
});
