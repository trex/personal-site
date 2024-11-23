import HamburgerButton from './HamburgerButton';
import PageDirectory from './PageDirectory';
import mushroomBuds from '/art/mushroom-buds.png';


function Header({ pages: pages, activePage, navOpen, handleNavClick }: 
    { pages: PageDirectory, activePage: string, navOpen: Boolean, handleNavClick: () => void; }) {
    return (
        <header>
            <nav>
                <img className="nav-item" 
                    onClick={pages.home.handleOnClick} 
                    src={mushroomBuds} alt="Mushroom Buddies" />
                {navOpen ? (
                    <ul>
                        {Object.keys(pages).map((page) => 
                            <li className={`nav-item ${activePage===page ? "active" : ""}`} 
                            key={page} onClick={pages[page].handleOnClick}>
                                {page}
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