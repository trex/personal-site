function ContactForm() {
    return <>
        <form className="contact-form" action="https://trex-receiveandforwardformdata.web.val.run" method="POST">
            <hr></hr>
            <h1>say hi!</h1>
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