import Header from './Header.tsx';
import './App.css'
import PageDirectory from './PageDirectory.tsx';
import { useState, useEffect } from 'react';
import HomePage from './HomePage.tsx';
import AboutPage from './AboutPage.tsx';
import Footer from './Footer.tsx';
import GamePage from './GamePage.tsx';
import ProjectsPage from './ProjectsPage.tsx';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation
} from "react-router-dom";

function RouteWrapper({ element, onEnter }: { element: React.ReactNode, onEnter: (path: string) => void }) {
  const location = useLocation();
  
  useEffect(() => {
    onEnter(location.pathname);
  }, [location]);

  return <div className="site-content">{element}</div>;
}

function App() {
  const [navOpen, setNavOpen] = useState(false);
  const navClickHandler = (navItem: string) => {
    if (navItem === "🍔") {
      setNavOpen(true);
    } else {
      setNavOpen(false);
    }
  }

  const pages: PageDirectory = {
    "home": {
      element: <HomePage />,
      hidden: false,
    },
    "projects": {
      element: <ProjectsPage />,
      hidden: false,
    },
    "about": {
      element: <AboutPage />,
      hidden: false,
    },
    "game": {
      element: <GamePage />,
      hidden: false,
    },
  };

  return (
    <Router>
      <Header pages={pages} navOpen={navOpen} handleNavClick={() => navClickHandler("🍔")} />
      <Routes>
        <Route
          path={"/"} 
          element={
            <RouteWrapper 
              element={pages.home.element} 
              onEnter={(path) => navClickHandler(path.slice(1))}
            />
          } 
        />
        {Object.entries(pages).map(([key, { element }]) => (
          <Route 
            key={key} 
            path={`/${key}`} 
            element={
              <RouteWrapper 
                element={element} 
                onEnter={(path) => navClickHandler(path.slice(1))}
              />
            } 
          />
        ))}
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
