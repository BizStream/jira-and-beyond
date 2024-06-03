const { expect } = require("chai");
const chrome = require("sinon-chrome");
const { JSDOM } = require("jsdom");

describe("Options popup", () => {
  let urlInput,
    messageInput,
    checkboxInput,
    previewButton,
    previewImage,
    saveButton;
  let getAndSetOptions, playAnimation;

  beforeEach(() => {
    // Create a virtual DOM environment
    const dom = new JSDOM(
      `<!DOCTYPE html><html><body>
        <input id="urlInput" type="text" />
        <input id="messageInput" type="text" />
        <input id="checkboxInput" type="checkbox" />
        <button id="previewLabel"></button>
        <img id="previewImage" />
        <button id="saveButton"></button>
      </body></html>`
    );

    // Define the variables to store the element states
    global.window = dom.window;
    global.document = dom.window.document;
    urlInput = document.getElementById("urlInput");
    messageInput = document.getElementById("messageInput");
    checkboxInput = document.getElementById("checkboxInput");
    previewButton = document.getElementById("previewLabel");
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

    // Import functions after the DOM and chrome API are mocked
    const optionsModule = require("../popup/options.js");
    getAndSetOptions = optionsModule.getAndSetOptions;
    playAnimation = optionsModule.playAnimation;
  });

  afterEach(() => {
    chrome.flush();
  });

  it("should initialize inputs from chrome.storage", function () {
    getAndSetOptions(
      previewImage,
      previewButton,
      urlInput,
      checkboxInput,
      messageInput
    );

    expect(urlInput.value).to.equal("google.com");
    expect(messageInput.value).to.equal("Hello");
    expect(checkboxInput.checked).to.equal(false);
    expect(previewButton.textContent).to.equal("Hello");
    expect(previewImage.src).to.equal("google.com/favicon.ico");
  });
});
