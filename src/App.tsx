import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Diabetes from './pages/Diabetes'
import Hypertension from './pages/Hypertension'
import HeartFailure from './pages/HeartFailure'
import Asthma from './pages/Asthma'
import COPD from './pages/COPD'
import Mood from './pages/Mood'
import Cases from './pages/Cases'
import Assessment from './pages/Assessment'
import Glossary from './pages/Glossary'
import Settings from './pages/Settings'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/diabetes" element={<Diabetes />} />
        <Route path="/hypertension" element={<Hypertension />} />
        <Route path="/heart-failure" element={<HeartFailure />} />
        <Route path="/asthma" element={<Asthma />} />
        <Route path="/copd" element={<COPD />} />
        <Route path="/mood" element={<Mood />} />
        <Route path="/cases" element={<Cases />} />
        <Route path="/assessment" element={<Assessment />} />
        <Route path="/glossary" element={<Glossary />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Layout>
  )
}

export default App
