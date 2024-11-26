import Header from './Header.tsx';
import './App.css'
import PageDirectory from './PageDirectory.tsx';
import { useState } from 'react';
import HomePage from './HomePage.tsx';
import CreationsPage from './CreationsPage.tsx';
import AboutPage from './AboutPage.tsx';
import githubLogo from '/github-logo.png';

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
    "creations": {
      handleOnClick: () => navClickHandler("creations"),
      page: <CreationsPage />
    },
    "about": {
      handleOnClick: () => navClickHandler("about"),
      page: <AboutPage />
    }
  };

  let pageToDisplay = null;
  switch(activePage) {
    case "creations":
      pageToDisplay = <CreationsPage />;
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
      <footer>
        <a href="https://github.com/trex">
          <img className="social-logo" src={githubLogo} alt="GitHub Logo" />
        </a>
      </footer>
    </>
  )
}

export default App
