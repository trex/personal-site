import Header from './Header.tsx';
import './App.css'
import PageDirectory from './PageDirectory.tsx';
import { useState } from 'react';
import HomePage from './HomePage.tsx';
import ArtPage from './ArtPage.tsx';
import TechnologyPage from './TechnologyPage.tsx';

function App() {
  const [navOpen, setNavOpen] = useState(false);
  const [activePage, setActivePage] = useState("");
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
    "art": {
      handleOnClick: () => navClickHandler("art"),
      page: <ArtPage />
    },
    "Technology": {
      handleOnClick: () => navClickHandler("technology"),
      page: <TechnologyPage />
    }
  };

  let pageToDisplay = null;
  switch(activePage) {
    case "art":
      pageToDisplay = <ArtPage />;
      break;
    case "technology":
      pageToDisplay = <TechnologyPage />;
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
    </>
  )
}

export default App
