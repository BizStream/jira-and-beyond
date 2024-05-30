import vm from "vm";
import fs from "fs";
import chrome from "sinon-chrome";
import { expect } from "chai";
import { JSDOM } from "jsdom";

describe("Options popup", () => {
  let urlInput, messageInput, checkboxInput;

  beforeEach(() => {
    // Define the variables to store the element states
    urlInput = { value: "" };
    messageInput = { value: "" };
    checkboxInput = { checked: false };

    // Use sinon-chrome to mock the chrome API
    global.chrome = chrome;

    // Mock chrome.storage.sync.get
    chrome.storage.sync.get.yields({
      url: "google.com",
      message: "Hello",
      checked: false,
    });

    //TODO: Mock the DOM
    // Mock the document.getElementById to return our variables
    // const mockDocument = {
    //   getElementById: (id) => {
    //     if (id === "urlInput") return urlInput;
    //     if (id === "messageInput") return messageInput;
    //     if (id === "checkboxInput") return checkboxInput;
    //     return null;
    //   },
    // };

    // const context = {
    //   chrome: chrome,
    //   document: mockDocument,
    // };

    // const code = fs.readFileSync("popup/options.js", "utf8");
    // vm.runInNewContext(code, context);
  });

  afterEach(() => {
    chrome.flush();
  });

  it("should initialize inputs from chrome.storage", function (done) {
    chrome.storage.sync.get(["url", "checked", "message"], function (data) {
      urlInput.value = data.url ?? "";
      messageInput.value = data.message ?? "";
      checkboxInput.checked = data.checked;
    });
    setTimeout(() => {
      expect(urlInput.value).to.equal("google.com");
      expect(messageInput.value).to.equal("Hello");
      expect(checkboxInput.checked).to.equal(false);
      done();
    }, 0);
  });
});
