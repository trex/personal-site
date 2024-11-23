import Header from './Header.tsx';
import './App.css'
import bagAnimation from '/bag-animation.gif';
import { PageSection } from './PageSection.tsx';
import { useState } from 'react';



function App() {
  const [navOpen, setNavOpen] = useState(false);
  const navClickHandler = () => {
    setNavOpen(!navOpen);
  }

  const pageSections: PageSection[] = [
    {
      name: "art",
      handleOnClick: navClickHandler
    },
    {
      name: "technology",
      handleOnClick: navClickHandler
    }
  ];

  return (
    <>
      <Header pageSections={pageSections} navOpen={navOpen} handleNavClick={navClickHandler} />
      <div className="site-content">
        <p>Atti says I just like making creepy stuff.  True, true.</p>
        <img src={bagAnimation} alt="Bag Animation" />
      </div>
    </>
  )
}

export default App
