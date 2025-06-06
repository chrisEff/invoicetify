// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer } from 'electron'

type StoreValue = string | number | boolean | object | null

contextBridge.exposeInMainWorld('electronAPI', {
	storeGet: (key: string) => ipcRenderer.invoke('store:get', key),
	storeSet: (key: string, value: StoreValue) => ipcRenderer.invoke('store:set', key, value),
	uploadLeftImage: () => ipcRenderer.invoke('uploadLeftImage'),
	uploadRightImage: () => ipcRenderer.invoke('uploadRightImage'),
	getLeftImage: () => ipcRenderer.invoke('getLeftImage'),
	getRightImage: () => ipcRenderer.invoke('getRightImage'),
})

declare global {
	interface Window {
		electronAPI: {
			storeGet: (key: string) => Promise<StoreValue>
			storeSet: (key: string, value: StoreValue) => Promise<void>
			uploadLeftImage: () => Promise<void>
			uploadRightImage: () => Promise<void>
			getLeftImage: () => Promise<string>
			getRightImage: () => Promise<string>
		}
	}
}
