document.addEventListener("DOMContentLoaded", function () {
  chrome.storage.sync.get(["url", "checked", "message"], function (data) {
    urlInput.value = data.url ?? "";
    messageInput.value = data.message ?? "";
    checkboxInput.checked = data.checked;
  });

  chrome.storage.local.get(["base64"], function (data) {
    const base64 = data.base64;
    if (base64) {
      const imagePreview = document.getElementById("imagePreview");
      imagePreview.src = base64;
      imagePreview.style.display = "block";
    }
  });

  const button = document.getElementById("imageButton");
  const fileInput = document.getElementById("fileInput");
  const urlInput = document.getElementById("urlInput");
  const checkboxInput = document.getElementById("checkboxInput");
  const saveButton = document.getElementById("saveButton");
  const messageInput = document.getElementById("messageInput");

  button.addEventListener("click", function () {
    fileInput.click();
  });

  fileInput.addEventListener("change", function () {
    const file = fileInput.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const imagePreview = document.getElementById("imagePreview");
        imagePreview.src = e.target.result;
        imagePreview.style.display = "block";
      };
      reader.readAsDataURL(file);
    }
  });

  saveButton.addEventListener("click", function (e) {
    e.preventDefault();

    let existingContainer = document.getElementById("lottie-container");
    if (existingContainer) {
      existingContainer.classList.remove("hidden");
    }

    const animation = lottie.loadAnimation({
      container: document.getElementById("lottie-container"),
      renderer: "svg",
      loop: false,
      autoplay: true,
      path: chrome.runtime.getURL("images/checkAnimation.json"),
    });

    animation.addEventListener("complete", function () {
      existingContainer.classList.add("hidden");
    });

    const url = urlInput.value;
    const file = fileInput.files[0];
    const checked = checkboxInput.checked;
    const message = messageInput.value;

    if (file) {
      const reader = new FileReader();
      reader.onloadend = function () {
        const base64 = reader.result;
        chrome.storage.local.set({ base64 }, function () {
          //saved to local because it's a large amount of data
          if (chrome.runtime.lastError) {
            console.error(
              "Error saving to local storage:",
              chrome.runtime.lastError
            );
          }
        });
      };
      reader.readAsDataURL(file);
    }

    chrome.storage.sync.set({ url, checked, message });
  });
});
