function HamburgerButton({ open, handleNavClick }: { open: Boolean; handleNavClick: () => void; }) {
    return (
        <div 
            className={`nav-button nav-${open ? 'open' : 'closed'}`} 
            onClick={() => handleNavClick()}
            aria-label={open ? "Close nav" : "Open nav"}
        >
            <div className="bar1"></div>
            <div className="bar2"></div>
            <div className="bar3"></div>
        </div>
    )
}

export default HamburgerButton;