import { Routes, Route } from 'react-router-dom'
import { LanguageProvider } from './i18n/LanguageContext'
import Header from './components/Header'
import Footer from './components/Footer'
import FogBottom from './components/FogBottom'
import Home from './pages/Home'
import Quiz from './pages/Quiz'
import Result from './pages/Result'
import Directory from './pages/Directory'
import Responder from './pages/Responder'
import PlotSearch from './pages/PlotSearch'
import AuthCallback from './pages/AuthCallback'
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
            <Route path="/plot-search" element={<PlotSearch />} />
            <Route path="/auth/callback" element={<AuthCallback />} />
          </Routes>
        </main>
        <Footer />
        <FogBottom />
      </div>
    </LanguageProvider>
  )
}

export default App
