/* eslint-disable prettier/prettier */
import { app, shell, BrowserWindow, ipcMain, dialog } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import os from 'os'

import moment from 'moment';

// server
import server from './server.js';
import fs from 'fs'

// database
import couchDb from "./database.js";
import bcrypt from 'bcrypt';

// import { checkDate } from './utils.js';
import { buildOneSQL } from './SQL/d.js';
import { sql, config } from './SQL/sqlConnection.js';

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

let mainWindow;

function createWindow() {

  mainWindow = new BrowserWindow({
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


  for (let el of result) {
    
    switch(el.promo_type){
      case "1": 
        // el.calculated_price = (Number(el.price) * Number(el.discount_by_percentage)) / 100; // percentage
        // el.calculated_price = Number(el.price) * Number(el.discount_by_decimal) // decimal
        // el.calculated_price = Number(el.price) - Number(el.discount_byù_cents)  // cents
        break;
      case "2":
        break
      default:
        break
    }

  }

  // const nq = checkDate(result, result.length, result[0].price_date);
  // if (nq) return { status: "errore", message: "trovata un incongruenza con le date dei prezzi" }



  let date = result[0].price_date;

  


  // const price_list_by_date = await driver.findAll("central", "_design/prices/_view/price_list_by_date");

  // const found_by_date = await price_list_by_date.find(x => x.key == date)


  // if (found_by_date) return { status: "success", message: "questa data esiste, quindi è da aggiornare" }

  console.log(result[0])
  try {
    await driver.insertItem(
      PRICELIST_DB_NAME,
      {
        created_at: created_at,
        created_by: TEMP_USER,
        updated_at: "",
        updated_by: created_at,
        price_date: created_at,
        lista: result

      }
    );

    let groceryPrices = [...result].filter(x => x.sell_type == "2");

    

    // sql.connect(config, async err => {
    //   if (err) return res.json({ status: "error", message: err.message });
    //   const request = new sql.Request();
    //   await request.query("TRUNCATE table [dbo].[plu]")
    //   for (let i = 0; i < groceryPrices.length; i++) {
    //     const SQL = buildOneSQL(groceryPrices[i]);

    //     request.query(SQL, (err, result) => {
    //       if (err) return console.log({ status: "error", message: err.message, sql: SQL });
    //       // let target = result.recordset
    //       // if (!target) return res.json({ status: "error", message: "no item found" });

    //       // const processed = bui(target);
    //       // console.log(processed);
    //       // console.log(`inserted grocery products ${i} into scale 🚀`) //data:SqlToJson(target)
    //     })
    //   }


    // })



    return { status: "success", message: "il prezziario è stato inserito con successo" }
  } catch (err) {
    return { status: "error", message: err.message }

  }




})

ipcMain.handle("addUser", (event, payload) => {

  const withPasswordHashed = { ...payload, password: bcrypt.hashSync(payload.password, 7) }
  driver.insertItem(USERS_DB_NAME, withPasswordHashed)
})


ipcMain.handle("retriveLatestPrice", async (event, payload) => {

  return JSON.stringify(await driver.findAll("central", "_design/prices/_view/all"))

})



ipcMain.handle("retriveSessions", async () => {
  const ALL_DESIGN = "_design/_list/_view/all";
  const SESSION_DB = "sessions";
  const data = await driver.findAll(SESSION_DB, ALL_DESIGN);


  return data.map(x => x.key);
})

// ! alerts

ipcMain.on("showError", (e, msg) => {
  dialog.showErrorBox("Errore", msg);
})


ipcMain.on("showMessage", (e, { title, message }) => {
  dialog.showMessageBox(mainWindow, {
    title,
    message
  })
})

ipcMain.handle('getHostName', async () => {
  return os.hostname()
})