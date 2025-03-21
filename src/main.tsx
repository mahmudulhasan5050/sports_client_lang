import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App'
import { Toaster } from 'react-hot-toast'
import './utils/i18n'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
    <BrowserRouter >
        <App />
        <Toaster position="top-right" />
    </BrowserRouter>
)
