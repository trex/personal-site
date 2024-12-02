import ContactForm from './ContactForm';
import elBarto from '/el-barto.jpg';

function HomePage() {
    return <>
        <img className="splash-image" src={elBarto} alt="Me as el Barto" />
        <p className="homepage-blurb">Hi, I’m T – a maker of many things! Whether it’s designing intuitive tech solutions or crafting vibrant artwork, I thrive at the intersection of creativity and innovation. Take a peek at my project portfolio to see where ideas come to life (and sometimes get a little weird). Let’s make something amazing together!</p>
        <ContactForm />
    </>
}

export default HomePage;