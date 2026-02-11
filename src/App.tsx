import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from '@/components/layout'
import { HomePage, AcademyPage, ModulePage } from '@/pages'

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/academy" element={<AcademyPage />} />
          <Route path="/academy/:moduleId" element={<ModulePage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App
