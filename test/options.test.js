import { expect } from "chai";
import chrome from "sinon-chrome";
import { JSDOM } from "jsdom";

//TODO: import js script and call actual functions
describe("Options popup", () => {
  let urlInput,
    messageInput,
    checkboxInput,
    previewButton,
    previewImage,
    saveButton;

  beforeEach(() => {
    // Create a virtual DOM environment
    const dom = new JSDOM(
      `<!DOCTYPE html><html><body>
        <input id="urlInput" type="text" />
        <input id="messageInput" type="text" />
        <input id="checkboxInput" type="checkbox" />
        <button id="previewButton"></button>
        <img id="previewImage" />
        <button id="saveButton"></button>
      </body></html>`
    );

    // Define the variables to store the element states
    global.document = dom.window.document;
    urlInput = document.getElementById("urlInput");
    messageInput = document.getElementById("messageInput");
    checkboxInput = document.getElementById("checkboxInput");
    previewButton = document.getElementById("previewButton");
    previewImage = document.getElementById("previewImage");
    saveButton = document.getElementById("saveButton");

    // Use sinon-chrome to mock the chrome API
    global.chrome = chrome;

    // Mock chrome.storage.sync.get
    chrome.storage.sync.get.yields({
      url: "google.com",
      message: "Hello",
      checked: false,
      urlToFavicon: "google.com/favicon.ico",
    });
  });

  afterEach(() => {
    chrome.flush();
  });

  it("should initialize inputs from chrome.storage", function (done) {
    chrome.storage.sync.get(
      ["url", "checked", "message", "urlToFavicon"],
      function (data) {
        urlInput.value = data.url ?? "";
        messageInput.value = data.message ?? "";
        checkboxInput.checked = data.checked ?? false;
        previewButton.textContent = data.message ?? "";
        previewImage.src = data.urlToFavicon ?? "";
      }
    );

    expect(urlInput.value).to.equal("google.com");
    expect(messageInput.value).to.equal("Hello");
    expect(checkboxInput.checked).to.equal(false);
    expect(previewButton.textContent).to.equal("Hello");
    expect(previewImage.src).to.equal("google.com/favicon.ico");
  });
});
