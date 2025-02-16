import React, { useState } from "react";
import styled from "styled-components";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [popupMessage, setPopupMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5002/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setPopupMessage("Your message has been sent successfully!");
        setFormData({ name: "", email: "", phone: "", message: "" }); // Reset form fields
      } else {
        setPopupMessage("Something went wrong. Please try again.");
      }
    } catch (error) {
      setPopupMessage("Error submitting the form.");
    }

    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 3000); // Hide popup after 3 seconds
  };

  return (
    <ContactUsContainer>
      {/* Hero Section */}
      <HeroSection>
        <HeroContent>
          <h1>Contact Us</h1>
          <p>We’d love to hear from you! Feel free to reach out to us anytime.</p>
        </HeroContent>
      </HeroSection>

      {/* Contact Form */}
      <Section>
        <SectionTitle>Get in Touch</SectionTitle>
        <SectionContent>
          <Form onSubmit={handleSubmit}>
            <Input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <Input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <Input
              type="tel"
              name="phone"
              placeholder="Your Phone (Optional)"
              value={formData.phone}
              onChange={handleChange}
            />
            <TextArea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              required
            />
            <SubmitButton type="submit">Send Message</SubmitButton>
          </Form>
        </SectionContent>
      </Section>

      {/* Popup Message */}
      {showPopup && <Popup>{popupMessage}</Popup>}

      {/* Footer */}
      <FooterSection>
        <p>&copy; 2025 The Green Capsule | All Rights Reserved</p>
      </FooterSection>
    </ContactUsContainer>
  );
};

export default ContactUs;

/* Styled Components */
const ContactUsContainer = styled.div`
  font-family: "Arial", sans-serif;
  background-color: #f0f5f1;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-x: hidden;
`;

const HeroSection = styled.section`
  background: linear-gradient(135deg, #4caf50, #388e3c);
  padding: 80px 20px;
  color: white;
  text-align: center;
  width: 100%;
`;

const HeroContent = styled.div`
  h1 {
    font-size: 3em;
    font-weight: bold;
    margin-bottom: 20px;
  }

  p {
    font-size: 1.3em;
    max-width: 700px;
    margin: 0 auto;
  }
`;

const Section = styled.section`
  padding: 60px 20px;
  background-color: white;
  text-align: center;
  width: 90%;
  max-width: 800px;
  border-radius: 15px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  margin: 40px 0;
`;

const SectionTitle = styled.h2`
  font-size: 2.5em;
  color: #388e3c;
  margin-bottom: 20px;
`;

const SectionContent = styled.div`
  font-size: 1.2em;
  line-height: 1.6;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
`;

const Input = styled.input`
  width: 80%;
  padding: 12px;
  font-size: 1.2em;
  border: 2px solid #388e3c;
  border-radius: 8px;
`;

const TextArea = styled.textarea`
  width: 80%;
  padding: 12px;
  font-size: 1.2em;
  border: 2px solid #388e3c;
  border-radius: 8px;
  height: 150px;
`;

const SubmitButton = styled.button`
  background-color: #388e3c;
  color: white;
  padding: 14px 28px;
  font-size: 1.3em;
  border: none;
  border-radius: 25px;
  cursor: pointer;
`;

const Popup = styled.div`
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #4caf50;
  color: white;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  z-index: 1000;
`;

const FooterSection = styled.footer`
  background-color: #388e3c;
  color: white;
  text-align: center;
  padding: 20px;
  width: 100%;
`;
