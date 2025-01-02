// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('electronAPI', {
	storeGet: (key: string) => ipcRenderer.invoke('store:get', key),
	storeSet: (key: string, value: any) => ipcRenderer.invoke('store:set', key, value),
})

declare global {
	interface Window {
		electronAPI: {
			storeGet: Function
			storeSet: Function
		}
	}
}
