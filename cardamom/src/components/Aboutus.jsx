import React from 'react';
import styled from 'styled-components';

const Aboutus = () => {
  return (
    <AboutUsContainer>
      <HeroSection>
        <HeroContent>
          <h1>The Green Capsule</h1>
          <p>
            Discover the finest, organic cardamom straight from nature's heart to your home.
            A product built on purity, sustainability, and tradition.
          </p>
          <LearnMoreButton href="#mission">Learn More</LearnMoreButton>
        </HeroContent>
      </HeroSection>

      <Section id="mission">
        <ImageCard src="bg1.jpg" alt="Mission" />
        <SectionTitle>Our Mission</SectionTitle>
        <SectionContent>
          <p>
            At The Green Capsule, our mission is simple: to deliver the highest quality, sustainably sourced cardamom to the world.
            We are committed to promoting wellness through pure, organic products that enrich lives while preserving the environment.
          </p>
        </SectionContent>
      </Section>

      <Section id="vision">
        <ImageCard src="bg2.jpg" alt="Vision" />
        <SectionTitle>Our Vision</SectionTitle>
        <SectionContent>
          <p>
            Our vision is to be the leading provider of cardamom globally, known for our dedication to quality, sustainability, and the health benefits our products offer.
            We aim to foster a connection between nature and wellness by sharing the essence of pure cardamom with every customer.
          </p>
        </SectionContent>
      </Section>

      <Section id="story">
        <ImageCard src="bg3.jpg" alt="Story" />
        <SectionTitle>Our Story</SectionTitle>
        <SectionContent>
          <p>
            The Green Capsule was born from a passion for nature and the belief that the world deserves access to the purest cardamom. What began as a humble farming initiative in the heart of Kerala has evolved into a global brand committed to quality and sustainability. Every capsule encapsulates the essence of authentic, organic cardamom, harvested with care and respect for the land.
          </p>
        </SectionContent>
      </Section>

      <Section id="values">
        <ImageCard src="bg4.jpg" alt="Core Values" />
        <SectionTitle>Our Core Values</SectionTitle>
        <SectionContent>
          <ValuesList>
            <li><strong>Sustainability:</strong> We prioritize eco-friendly practices and ethical sourcing to protect our planet.</li>
            <li><strong>Quality:</strong> Our cardamom is handpicked and carefully processed to maintain its purity and flavor.</li>
            <li><strong>Wellness:</strong> We believe in the health benefits of our products, from digestive health to overall well-being.</li>
            <li><strong>Empowerment:</strong> By supporting local farmers, we empower communities and ensure fair trade practices.</li>
            <li><strong>Transparency:</strong> We are dedicated to full transparency in every step of our production process, from farm to table.</li>
          </ValuesList>
        </SectionContent>
      </Section>

      <Section id="team">
        <ImageCard src="g1.jpg" alt="Our Team" />
        <SectionTitle>Meet Our Team</SectionTitle>
        <TeamContent>
          <TeamMember>
            <img src="m1.jpg" alt="Founder - Ravi Kumar" />
            <h3>Ravi Kumar</h3>
            <p>Founder & CEO</p>
            <p>Ravi is the visionary behind The Green Capsule, dedicated to bringing pure, organic cardamom to the world.</p>
          </TeamMember>
          <TeamMember>
            <img src="w1.jpg" alt="Farm Relations - Priya Nair" />
            <h3>Priya Nair</h3>
            <p>Farm Relations Manager</p>
            <p>Priya ensures that our farmers are well-supported and that sustainable practices are followed at every stage.</p>
          </TeamMember>
          <TeamMember>
            <img src="m2.jpg" alt="Product Specialist - Akhil Menon" />
            <h3>Akhil Menon</h3>
            <p>Product Specialist</p>
            <p>Akhil oversees the quality and processing of our cardamom, ensuring that only the best makes it to our customers.</p>
          </TeamMember>
        </TeamContent>
      </Section>

      <FooterSection>
        <FooterContent>
          <p>&copy; 2025 The Green Capsule | All Rights Reserved</p>
        </FooterContent>
      </FooterSection>
    </AboutUsContainer>
  );
};

export default Aboutus;

const AboutUsContainer = styled.div`
  font-family: 'Arial', sans-serif;
  margin-top: 80px; /* Added margin-top to prevent content from being hidden behind navbar */
  background-color: #f0f5f1;
`;

const HeroSection = styled.section`
  background: linear-gradient(135deg, #4caf50, #388e3c);
  padding: 70px 20px;
  color: white;
  text-align: center;
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  margin: 20px auto;
  max-width: 1200px;
`;

const HeroContent = styled.div`
  h1 {
    font-size: 3.5em;
    font-weight: bold;
    margin-bottom: 20px;
  }

  p {
    font-size: 1.25em;
    line-height: 1.6;
    margin-bottom: 30px;
  }
`;

const LearnMoreButton = styled.a`
  background-color: #ffffff;
  color: #4caf50;
  padding: 15px 35px;
  text-decoration: none;
  font-size: 1.2em;
  font-weight: bold;
  border-radius: 30px;
  transition: all 0.3s ease;

  &:hover {
    background-color: #388e3c;
    color: white;
    transform: translateY(-5px);
  }
`;

const Section = styled.section`
  padding: 60px 20px;
  background-color: #fff;
  color: #333;
  text-align: center;
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
  margin-bottom: 40px;
  border-radius: 10px;
`;

const SectionTitle = styled.h2`
  font-size: 2.8em;
  font-weight: bold;
  margin-bottom: 20px;
  color: #388e3c;
`;

const SectionContent = styled.div`
  max-width: 900px;
  margin: 0 auto;
  font-size: 1.15em;
  line-height: 1.6;
`;

const ValuesList = styled.ul`
  list-style-type: none;
  padding: 0;
  font-size: 1.1em;

  li {
    margin-bottom: 15px;
    text-align: left;
    padding-left: 30px;
    position: relative;
    font-weight: 500;
  }

  li::before {
    content: "✔";
    position: absolute;
    left: 0;
    color: #388e3c;
    font-size: 1.5em;
  }
`;

const TeamContent = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 20px;
  padding-top: 20px;
`;

const TeamMember = styled.div`
  text-align: center;
  width: 30%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  padding: 20px;
  border-radius: 10px;
  background-color: #fff;
  transition: transform 0.3s ease;
  position: relative;  /* For positioning the image within the div */
  overflow: hidden;  /* Prevents image from overflowing */
  
  &:hover {
    transform: translateY(-10px);
  }

  img {
    width: 80%;
    height: auto;
    border-radius: 50%;
    margin-bottom: 15px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;  /* Smooth transition for scaling */
    
    &:hover {
      transform: scale(1.1);  /* Scales the image up when hovered */
    }
  }

  h3 {
    font-size: 1.6em;
    margin-bottom: 10px;
    color: #388e3c;
  }

  p {
    font-size: 1.1em;
  }
`;

const FooterSection = styled.section`
  background-color: #388e3c;
  padding: 20px;
  color: white;
  text-align: center;
  border-radius: 5px;
`;

const FooterContent = styled.div`
  font-size: 1.1em;
  font-weight: 500;
`;

const ImageCard = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 50%;
  margin-bottom: 20px;
  border: 5px solid #4caf50;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;
