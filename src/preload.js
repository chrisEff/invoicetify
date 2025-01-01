// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('electronAPI', {
	storeGet: key => ipcRenderer.invoke('store:get', key),
	storeSet: (key, value) => ipcRenderer.invoke('store:set', key, value),
})
