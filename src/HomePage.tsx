import ContactForm from './ContactForm';
import bagAnimation from '/art/bag-animation.gif';

function HomePage() {
    return <>
        <p>t sure does like making things</p>
        <img className="splash-image" src={bagAnimation} alt="Bag Animation" />
        <ContactForm />
    </>
}

export default HomePage;