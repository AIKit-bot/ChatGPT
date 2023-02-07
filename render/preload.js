const { ipcRenderer } = require("electron");

// Listen for the "DOMContentLoaded" event to ensure the page has finished loading
document.addEventListener("DOMContentLoaded", () => {
  const observer = new MutationObserver((mutations) => {
    const retryElements = document.getElementsByClassName(
      "min-h-[20px] flex flex-col items-start gap-4 whitespace-pre-wrap flex flex-row gap-2 text-red-500"
    );

    if (retryElements.length > 0) {
      // If the element is found, reload the render process
      const currentURL = window.location.href;
      ipcRenderer.send("reload-render", currentURL);
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
});
