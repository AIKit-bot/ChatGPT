const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

// run this as early in the main process as possible
if (require("electron-squirrel-startup")) app.quit();

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "render/preload.js"),
    },
  });

  win.loadURL("https://chat.openai.com/chat");
};

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

ipcMain.on("reload-render", (event, currentURL) => {
  // Reload the render process with the same URL
  event.sender.loadURL(currentURL);
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
