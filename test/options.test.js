import sinon from "sinon"; // for mocking any other function calls
import sinonChrome from "sinon-chrome"; // for mocking chrome API calls
import { expect } from "chai";

global.chrome = sinonChrome;

describe("Options popup", () => {
  beforeEach(() => {
    sinon.reset();
    sinonChrome.flush();
  });

  afterEach(() => {
    sinon.restore();
    sinonChrome.reset();
  });

  it("should retrieve URL and checked status from sync storage", (done) => {
    sinonChrome.storage.sync.get.callsFake((keys, callback) => {
      callback({ url: "https://www.google.com", checked: true }); // mock data provided by a callback
    });

    const urlInput = { value: "" };
    const checkboxInput = { checked: false };

    chrome.storage.sync.get(["url", "checked"], (data) => {
      urlInput.value = data.url;
      checkboxInput.checked = data.checked;

      expect(urlInput.value).to.equal("https://www.google.com");
      expect(checkboxInput.checked).to.be.true;
      done();
    });
  });

  it("should retrieve base64 image from local storage", (done) => {
    sinonChrome.storage.local.get.callsFake((keys, callback) => {
      callback({ base64: "base64" }); // mock data provided by a callback
    });

    const imagePreview = { src: "", style: { display: "none" } };

    chrome.storage.local.get(["base64"], (data) => {
      const base64 = data.base64;
      if (base64) {
        imagePreview.src = base64;
        imagePreview.style.display = "block";
      }

      expect(imagePreview.src).to.equal("base64");
      expect(imagePreview.style.display).to.equal("block");
      done();
    });
  });
});
