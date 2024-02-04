import { AppContextProvider } from './context/AppContext'
import { Calculator } from './components/Calculator'

function App() {
  return (
    <AppContextProvider>
      <Calculator />
    </AppContextProvider>
  )
}

export default App
