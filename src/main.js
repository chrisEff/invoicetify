import * as fs from 'node:fs'
import * as path from 'node:path'

import { app, BrowserWindow, dialog, ipcMain } from 'electron'
import started from 'electron-squirrel-startup'

import store from './store'

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (started) {
	app.quit()
}

let windowSettings = store.get('main.window')

const createWindow = () => {
	// Create the browser window.
	const mainWindow = new BrowserWindow({
		width: windowSettings.width,
		height: windowSettings.height,
		minWidth: 800,
		minHeight: 600,
		x: windowSettings.x,
		y: windowSettings.y,
		webPreferences: {
			preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
		},
	})

	// and load the index.html of the app.
	mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY)

	mainWindow.on('resized', () => {
		const size = mainWindow.getSize()
		const pos = mainWindow.getPosition()
		store.set('main.window', {
			width: size[0],
			height: size[1],
			x: pos[0],
			y: pos[1],
		})
	})

	mainWindow.on('moved', () => {
		const pos = mainWindow.getPosition()
		store.set('main.window.x', pos[0])
		store.set('main.window.y', pos[1])
	})

	// Open the DevTools.
	// mainWindow.webContents.openDevTools();
}

const handleStoreGet = (event, key) => {
	return store.get('renderer.' + key)
}

const handleStoreSet = (event, key, value) => {
	store.set('renderer.' + key, value)
}

const leftImgFolderPath = path.join(app.getPath('userData'), 'header-left.png')
const rightImgFolderPath = path.join(app.getPath('userData'), 'header-right.png')

const handleImageUpload = async targetPath => {
	const result = await dialog.showOpenDialog({ properties: ['openFile'] })
	if (result.canceled) return

	fs.copyFile(result.filePaths[0], targetPath, err => {
		if (err) throw err
	})
}

const handleGetImage = path => {
	try {
		const imageData = fs.readFileSync(path)
		return imageData.toString('base64')
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
	} catch (ignore) {
		return null
	}
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
	ipcMain.handle('store:get', handleStoreGet)
	ipcMain.handle('store:set', handleStoreSet)
	ipcMain.handle('uploadLeftImage', async () => handleImageUpload(leftImgFolderPath))
	ipcMain.handle('uploadRightImage', async () => handleImageUpload(rightImgFolderPath))
	ipcMain.handle('getLeftImage', () => handleGetImage(leftImgFolderPath))
	ipcMain.handle('getRightImage', () => handleGetImage(rightImgFolderPath))
	createWindow()

	// On OS X it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	app.on('activate', () => {
		if (BrowserWindow.getAllWindows().length === 0) {
			createWindow()
		}
	})
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit()
	}
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
