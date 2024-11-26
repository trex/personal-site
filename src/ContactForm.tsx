import React, { useState } from 'react';

function ContactForm() {
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget as HTMLFormElement);

        try {
            const response = await fetch('https://trex-receiveandforwardformdata.web.val.run', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                setSuccessMessage('Your message has been sent successfully!');
                (event.currentTarget as HTMLFormElement).reset();
            } else {
                setSuccessMessage('There was an error sending your message.');
            }
        } catch (error) {
            setSuccessMessage('There was an error sending your message.');
        }
    };

    return <>
        <form className="contact-form" onSubmit={handleSubmit}>
            <hr></hr>
            <h1>{successMessage ? <p className="success-message">{successMessage}</p> : "say hi!" }</h1>
            
            <div className="contact-form-field">
                <input type="text" name="subject" id="subject" required 
                 placeholder="Subject"/>
            </div>
            <div className="contact-form-field">
                <textarea name="message" id="message" rows={10} required 
                 placeholder="Message..."/>
            </div>
            <button>Send</button>
            
        </form>
    </>
}

export default ContactForm;