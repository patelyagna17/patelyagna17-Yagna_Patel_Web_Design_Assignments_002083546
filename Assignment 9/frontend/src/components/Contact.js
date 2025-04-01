import React from "react";
import Card from "./Card";
import "./contact.css";

const Contact = () => {
  const cardData = [
    {
      title: "Contact Information",
      content: "✉ Email: info@growth.com\n☎ Phone: +1 545-666-2345 \n🏢 Address: 123 Ahmedabad, Tech Valley",
    },
    {
      title: "Our Location",
      mapEmbed: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4231637.156242956!2d9.18293238140914!3d51.1656913037082!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47b3f967ce73b1df%3A0x8883d4406a23c3ba!2sGermany!5e0!3m2!1sen!2sus!4v1637696685408!5m2!1sen!2sus" width="400" height="300" style="border:0;" allowfullscreen="" loading="lazy"></iframe>',
    },
  ];

  return (
    <div className="contact-container">
      <h1 className="contact-main-title">Get in Touch</h1>
      
      {cardData.map((card, index) => (
        <Card
          key={index}
          title={card.title}
          content={card.content}
          mapEmbed={card.mapEmbed}
          className="contact-card"
        />
      ))}
      
      <Card title="Send Us a Message" className="contact-form-card">
        <form className="contact-form">
          <input type="text" placeholder="Your Name" className="form-input" />
          <input type="email" placeholder="Your Email" className="form-input" />
          <textarea placeholder="Your Message" className="form-input" rows="5"></textarea>
          <button type="submit" className="submit-button">Send Message</button>
        </form>
      </Card>
    </div>
  );
};

export default Contact;
