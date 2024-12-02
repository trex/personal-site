import Header from './Header.tsx';
import './App.css'
import PageDirectory from './PageDirectory.tsx';
import { useState } from 'react';
import HomePage from './HomePage.tsx';
import AboutPage from './AboutPage.tsx';
import Footer from './Footer.tsx';
import ProjectsPage from './ProjectsPage.tsx';

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
    "home": {
      handleOnClick: () => navClickHandler("home"),
      page: <HomePage />
    },
    "projects": {
      handleOnClick: () => navClickHandler("projects"),
      page: <ProjectsPage />
    },
    "about": {
      handleOnClick: () => navClickHandler("about"),
      page: <AboutPage />
    }
  };

  let pageToDisplay = null;
  switch(activePage) {
    case "projects":
      pageToDisplay = <ProjectsPage />;
      break;
    case "about":
      pageToDisplay = <AboutPage />;
      break;
    case "home":
    default:
      pageToDisplay = <HomePage />;
  };

  return (
    <>
      <Header pages={pages} activePage={activePage} navOpen={navOpen} handleNavClick={() => navClickHandler("hamburger")} />
      <div className="site-content">
        {pageToDisplay}
      </div>
      <Footer />
    </>
  )
}

export default App
