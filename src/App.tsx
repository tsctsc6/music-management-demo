import { lazy, Suspense } from 'react'
import './App.css'
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';

const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const NotFound = lazy(() => import("./pages/NotFound"));

const Login = lazy(() => import("./pages/Login"));

export default function App() {
  return (
    <MemoryRouter>
      <div>
        <Navbar />
        <main style={{ padding: "80px 1rem 1rem" }}>
          <Suspense fallback={<p>Loading...</p>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </MemoryRouter>
  )
}
