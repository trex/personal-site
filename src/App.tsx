import Header from './Header.tsx';
import './App.css'
import bagAnimation from '/bag-animation.gif';
import { PageSection } from './PageSection.tsx';
import { useState } from 'react';



function App() {
  const [navOpen, setNavOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const navClickHandler = (sectionName: string) => {
    if (sectionName != "hamburger") {
      setActiveSection(sectionName);
    }
    setNavOpen(!navOpen);
  }

  const pageSections: PageSection[] = [
    {
      name: "home",
      handleOnClick: () => navClickHandler("home")
    },
    {
      name: "art",
      handleOnClick: () => navClickHandler("art")
    },
    {
      name: "technology",
      handleOnClick: () => navClickHandler("technology")
    }
  ];

  let section = null;
  switch(activeSection){
    case "art":
      section = <h1>Art section</h1>;
      break;
    case "technology":
      section = <h1>Techonology section</h1>;
      break;
    case "home":
    default:
      section = <>
        <p>Atti says I just like making creepy stuff.  True, true.</p>
        <img src={bagAnimation} alt="Bag Animation" />
      </>
  }

  return (
    <>
      <Header pageSections={pageSections} activeSection={activeSection} navOpen={navOpen} handleNavClick={() => navClickHandler("hamburger")} />
      <div className="site-content">
        {section}
      </div>
    </>
  )
}

export default App
