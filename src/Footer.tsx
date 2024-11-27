import githubLogo from '/github-logo.png';
import linkedInLogo from '/linked-in-logo.webp';

function Footer() {
    return (
        <footer>
            <a href="https://github.com/trex">
                <img className="social-logo" src={githubLogo} alt="GitHub Logo" />
            </a>
            <a href="https://www.linkedin.com/in/cheese-pizza/">
                <img className="social-logo" src={linkedInLogo} alt="LinkedIn Logo" />
            </a>
        </footer>
    );
}

export default Footer;