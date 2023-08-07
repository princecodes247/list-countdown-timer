// import { ITimer } from '../src/interfaces';
// Native
import { join } from 'path';

// Packages
import { BrowserWindow, app, ipcMain, screen, IpcMainEvent } from 'electron';
import isDev from 'electron-is-dev';

const height = 600;
const width = 800;

function createWindow() {
  // Create the browser window.
  const window = new BrowserWindow({
    width,
    height,
    minWidth: width,
    minHeight: height,
    //  change to false to use AppBar
    frame: true,
    show: true,
    resizable: true,
    fullscreenable: true,
    webPreferences: {
      preload: join(__dirname, 'preload.js')
    }
  });

  const port = process.env.PORT || 3000;
  const url = isDev ? `http://localhost:${port}` : join(__dirname, '../src/out/index.html');

  // and load the index.html of the app.
  if (isDev) {
    window?.loadURL(url);
  } else {
    window?.loadFile(url);
  }
  // Open the DevTools.
  // window.webContents.openDevTools();

  // For AppBar
  ipcMain.on('minimize', () => {
    // eslint-disable-next-line no-unused-expressions
    window.isMinimized() ? window.restore() : window.minimize();
    // or alternatively: win.isVisible() ? win.hide() : win.show()
  });
  ipcMain.on('maximize', () => {
    // eslint-disable-next-line no-unused-expressions
    window.isMaximized() ? window.restore() : window.maximize();
  });

  ipcMain.on('close', () => {
    window.close();
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

// listen the channel `message` and resend the received message to the renderer process
ipcMain.on('message', (event: IpcMainEvent, message: any) => {
  console.log(message);
  setTimeout(() => event.sender.send('message', 'hi from electron'), 500);
});

let countdownWindow: Electron.BrowserWindow | null = null;

// Function to create the second window on the first secondary screen.
function createSecondaryWindow() {
  const secondaryDisplay = screen.getAllDisplays().find((display) => display.id !== screen.getPrimaryDisplay().id);

  if (secondaryDisplay) {
    console.log('in sec');
    const { width, height } = secondaryDisplay.workAreaSize;
    return new BrowserWindow({
      width,
      height,
      frame: false,
      show: true,
      x: secondaryDisplay.bounds.x,
      y: secondaryDisplay.bounds.y,
      webPreferences: {
        nodeIntegration: true,
        devTools: true,
        preload: join(__dirname, 'preload.js')
      }
    });
  } else {
    console.log('in sec');

    return new BrowserWindow({
      width: 800,
      height: 600,
      frame: false,
      show: true,
      webPreferences: {
        nodeIntegration: true,
        devTools: true,
        preload: join(__dirname, 'preload.js')
      }
    });
  }
}

ipcMain.on('pause-timer', (_, message: any) => {
  console.log({ message });
  countdownWindow?.webContents?.send('pause-countdown', '');
  // event.sender.send('pause-countdown', '');
});

ipcMain.on('start-timer', (_, timerValue: number) => {
  console.log({ timerValue });
  if (countdownWindow) {
    countdownWindow?.webContents?.send('start-countdown', timerValue);
    // event.sender.send('start-countdown', timerValue);
    return;
    // countdownWindow.close();
    // ipcMain.emit('start-timer', timerValue);
  }
  console.log({ timerValue });

  countdownWindow = createSecondaryWindow();
  if (countdownWindow) {
    const port = process.env.PORT || 3000;
    const url = isDev ? `http://localhost:${port}/countdown.html` : join(__dirname, '../src/out/countdown.html');
    countdownWindow.loadURL(url);

    // Start the countdown on the new window.
    countdownWindow.webContents.on('did-finish-load', () => {
      console.log({ webC: timerValue });
      countdownWindow?.webContents.openDevTools();
      countdownWindow?.webContents?.send('start-countdown', timerValue);
    });

    // Temporarily comment this to test on one screen
    // countdownWindow.setFullScreen(true);

    countdownWindow.on('closed', () => {
      countdownWindow = null;
    });
  }
});
