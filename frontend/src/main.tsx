// import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.tsx'
// import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { persister, store } from './Redux/Store/Store.ts'
import { PersistGate } from 'redux-persist/integration/react'
import { Toaster } from 'react-hot-toast'

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)

root.render(
  <Provider store={store}>
    <PersistGate loading = {null} persistor={persister}>
      <Toaster/>
      <App />
    </PersistGate>
  </Provider>
)