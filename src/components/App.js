import { BrowserRouter as Router } from 'react-router-dom'
import Home from './Home'
import Navbar from './Navbar'

function App(props) {
  return (
    <Router>
      <Navbar />
      <Home />
    </Router>
  )
}

export default App
