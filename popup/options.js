document.addEventListener("DOMContentLoaded", function () {
  chrome.storage.sync.get(["url", "checked"], function (data) {
    console.log("Data: ", data);
    urlInput.value = data.url;
    checkboxInput.checked = data.checked;
  });

  chrome.storage.local.get(["base64"], function (data) {
    console.log("Data: ", data);
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
  const imageSpan = document.getElementById("imageSpan");

  button.addEventListener("click", function () {
    fileInput.click();
  });

  fileInput.addEventListener("change", function () {
    const file = fileInput.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const imagePreview = document.getElementById("imagePreview");
        imagePreview.src = e.target.result;
        imagePreview.style.display = "block";
      };
      reader.readAsDataURL(file);
    }
    console.log("File: ", file);
  });

  urlInput.addEventListener("change", function () {
    const url = urlInput.value;
    console.log("URL: ", url);
  });

  checkboxInput.addEventListener("change", function () {
    const checked = checkboxInput.checked;
    console.log("Checked: ", checked);
  });

  saveButton.addEventListener("click", function (e) {
    e.preventDefault();
    console.log("Save Button Clicked!");

    const url = urlInput.value;
    const file = fileInput.files[0];
    const checked = checkboxInput.checked;

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
          } else {
            console.log("File data saved to local storage.");
          }
        });
      };
      reader.readAsDataURL(file);
    }

    console.log("URL: ", url);
    chrome.storage.sync.set({ url, checked }, function () {
      console.log("Saved URL: ", url);
      console.log("Saved Checked: ", checked);
    });
  });
});
