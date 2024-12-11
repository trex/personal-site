import HamburgerButton from './HamburgerButton';
import PageDirectory from './PageDirectory';
import mushroomBuds from '/art/mushroom-buds.png';
import {
    Link,
    NavLink,
    useLocation
  } from "react-router-dom";


function Header({ pages: pages, navOpen, handleNavClick }: 
    { pages: PageDirectory, activePage: string, navOpen: Boolean, handleNavClick: () => void; }) {
    const location = useLocation();
    const currentPath = location.pathname.slice(1);

    return (
        <header>
            <nav>
                <Link className="logo-link" to="/home">
                    <img src={mushroomBuds} alt="Mushroom Buddies"/>
                </Link>
                {navOpen ? (
                    <ul>
                        {Object.entries(pages).map(([key, page]) => {
                            if (!page.hidden) {
                                return <li className="nav-item" key={key}>
                                    <NavLink to={`/${key}`}>
                                        {key}
                                    </NavLink>
                                </li>
                            }
                        })}
                    </ul>
                ) : (
                    <h1>{currentPath}</h1>
                )}
                
                <HamburgerButton open={navOpen} handleNavClick={handleNavClick}></HamburgerButton>
            </nav>
        </header>
    );
}

export default Header;