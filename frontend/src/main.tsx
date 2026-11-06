import { ViteReactSSG } from 'vite-react-ssg'
import routes from './routes'
import './styles/globals.css'
import './styles/content.css'

export const createRoot = ViteReactSSG({ routes })
