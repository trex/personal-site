import HamburgerButton from './HamburgerButton';
import { PageSection } from './PageSection';
import mushroomBuds from '/mushroom-buds.png';


function Header({ pageSections, navOpen, handleNavClick }: { pageSections: Array<PageSection>, navOpen: Boolean, handleNavClick: () => void; }) {
    return (
        <header>
            <nav>
                <img src={mushroomBuds} alt="Mushroom Buddies" />
                {navOpen ? (
                    <ul>
                        {pageSections.map((section) => 
                            <li className="nav-item" key={section.name} onClick={section.handleOnClick}>
                                {section.name}
                            </li>
                        )}
                    </ul>
                ) : (
                    <h1>things by t</h1>
                )}
                
                <HamburgerButton open={navOpen} handleNavClick={handleNavClick}></HamburgerButton>
            </nav>
        </header>
    );
}

export default Header;