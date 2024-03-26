/* eslint-disable prettier/prettier */
import { contextBridge } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {
  selectFile:()=>electronAPI.ipcRenderer.invoke("selectFile"),
  loadSheet:payload=>electronAPI.ipcRenderer.invoke("loadSheet",JSON.stringify(payload)),
  addUser:payload=>electronAPI.ipcRenderer.invoke("addUser",payload),
  retriveLatestPrice:()=>electronAPI.ipcRenderer.invoke("retriveLatestPrice"),
  retriveSessions:()=>electronAPI.ipcRenderer.invoke("retriveSessions"),
  showError:msg=>electronAPI.ipcRenderer.send("showError",msg),
  showMessage:payload=>electronAPI.ipcRenderer.send("showMessage",payload),
  ipcRenderer:electronAPI.ipcRenderer
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  window.electron = electronAPI
  window.api = api
}
