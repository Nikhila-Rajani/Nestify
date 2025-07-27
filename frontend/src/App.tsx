import { BrowserRouter as Router, Routes } from "react-router-dom"
import {routes} from './routes/routes'

const App : React.FC = () => {
  return (
    <div>
      <Router>
        <Routes>
          {routes}
        </Routes>
      </Router>
    </div>
  )
}

export default App ;