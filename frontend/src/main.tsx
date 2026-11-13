import { ViteReactSSG } from 'vite-react-ssg'
import routes from './routes'
import '@fontsource/familjen-grotesk/500.css'
import '@fontsource/familjen-grotesk/600.css'
import '@fontsource/familjen-grotesk/700.css'
import '@fontsource/dm-sans/400.css'
import '@fontsource/dm-sans/400-italic.css'
import '@fontsource/dm-sans/500.css'
import '@fontsource/dm-sans/600.css'
import './styles/globals.css'
import './styles/content.css'

export const createRoot = ViteReactSSG({ routes })
