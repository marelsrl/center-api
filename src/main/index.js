import { app, shell, BrowserWindow, ipcMain, dialog } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'

import moment from 'moment';

// server
import server from './server.js';

// database
import couchDb from "./database.js";
import bcrypt from 'bcrypt';

import fs from 'fs'
import { checkDate } from './utils.js';

//

const credentials = {
  user: "admin",
  pass: "admin"
};

const PRICELIST_DB_NAME = "central";
const USERS_DB_NAME = "users";


// ! abbassa il firewall
// ! abilita il cors dalle impostazioni del couch
const driver = new couchDb(credentials);


const PORT = 3000;
const DATE_FORMAT = "yyyy-MM-DD";

function createWindow() {

  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: false,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    server.listen(PORT, err => {
      if (err) return console.log(err);
      console.log(" > server online sulla porta " + PORT);
      mainWindow.show();
    })
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })


  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}


app.whenReady().then(() => {

  electronApp.setAppUserModelId('com.electron')

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  createWindow()

  app.on('activate', function () {

    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})



app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

ipcMain.handle("selectFile", async () => {
  let selecedFile = await dialog.showOpenDialog({ properties: ["openFile"], filters: [{ name: "file", extensions: ["xlsx", "csv"] }] });
  if (selecedFile.canceled) return { status: "error", message: "aborted" };
  return { status: "success", file: selecedFile.filePaths[0] }
})


ipcMain.handle("loadSheet", async (event, payload) => {
  // const created_at = new Date().toLocaleDateString();
  const created_at = moment().format(DATE_FORMAT);
  const TEMP_USER = "user";
  
 
  const parsed = JSON.parse(payload);

  let keys = parsed.header;
  let result = []
  parsed.body.map((x, i) => {

   

    let obj = {};

    x.filter((z, index) => {
      
      return obj[keys[index]] = z
    });

    if (x.length > 1) result.push(obj)

  });
  

  const d = checkDate(result, result.length, result[0].price_date);
  console.log(d)

  // await driver.insertItem(
  //   PRICELIST_DB_NAME,
  //   {
  //     created_at: created_at,
  //     created_by:TEMP_USER,
  //     updated_at:"",
  //     updated_by:created_at,
  //     price_date:created_at,
  //     lista: result

  //   }
  // );


})

ipcMain.handle("addUser", (event, payload) => {

  const withPasswordHashed = { ...payload, password: bcrypt.hashSync(payload.password, 7) }
  driver.insertItem(USERS_DB_NAME, withPasswordHashed)
})


ipcMain.handle("retriveLatestPrice", async (event, payload) => {

  return JSON.stringify(await driver.findAll("central","_design/prices/_view/all"))

})



ipcMain.handle("retriveSessions",async()=>{
  const IS_ACTIVE_DESIGN = "_design/_design/_view/is_active";
  const SESSION_DB = "sessions";
  const data = await driver.findAll(SESSION_DB,IS_ACTIVE_DESIGN);


  return data.map(x=>x.key);
})