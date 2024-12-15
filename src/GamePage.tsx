import ContactForm from './ContactForm';
import Lettris from './Lettris';

export default function GamePage() {
    return (
        <>
            <Lettris rows={4} cols={4} />
            
            <ContactForm>
                <div>
                    Please leave me some feedback for the any thoughts you have about this game.  Thanks for playing!
                </div>
            </ContactForm>
        </>
    );
}