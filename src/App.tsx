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
  const [activePage, setActivePage] = useState("home");
  const navClickHandler = (pageName: string) => {
    if (pageName != "hamburger") {
      setActivePage(pageName);
    }
    setNavOpen(!navOpen);

    // Home can be navigated to from header image, make sure hamburger is closed
    if (pageName === "home") {
      setNavOpen(false);
    }
  }

  const pages: PageDirectory = {
    "": {
      element: <HomePage />,
      hidden: true,
    },
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
      element: <GamePage rows={4} cols={4} />,
      hidden: true,
    },
  };

  return (
    <Router>
      <Header pages={pages} activePage={activePage} navOpen={navOpen} handleNavClick={() => navClickHandler("hamburger")} />
      <Routes>
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
