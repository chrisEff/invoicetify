import de from '../locales/de.json'
import en from '../locales/en.json'

const lang = await window.electronAPI.storeGet('language')

export default lang === 'de' ? de : en
