import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router';
import { Toaster } from 'sonner';
import Navigation from './components/Navigation';
import ScrollManager from './components/ScrollManager';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import Services from './pages/Services';
import NotFound from './pages/NotFound';

function Layout() {
  const { pathname } = useLocation();
  const isHome = pathname === '/';

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className={isHome ? 'flex-1' : 'flex-1 pt-20'}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:id" element={<ProjectDetail />} />
          <Route path="/services" element={<Services />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <Toaster position="top-right" />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <ScrollManager />
      <Layout />
    </Router>
  );
}
