import { Routes, Route } from 'react-router-dom'
import { LanguageProvider } from './i18n/LanguageContext'
import Header from './components/Header'
import FogBottom from './components/FogBottom'
import Home from './pages/Home'
import Quiz from './pages/Quiz'
import Result from './pages/Result'
import Directory from './pages/Directory'
import Responder from './pages/Responder'
import './App.css'

function App() {
  return (
    <LanguageProvider>
      <div className="app">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/result/:pathwayId" element={<Result />} />
            <Route path="/directory" element={<Directory />} />
            <Route path="/responder" element={<Responder />} />
          </Routes>
        </main>
        <FogBottom />
      </div>
    </LanguageProvider>
  )
}

export default App
