import React from 'react';
import { Container } from 'react-bootstrap';

const AboutUs = () => {
  return (
    <div className="about-us-page about">
      <Container className="text-center">
        <h1 className="display-3">ABOUT US</h1>
        <p className="lead">
          Welcome to Tex Decorization, where we transform spaces with our exquisite range of textiles and decorative solutions. Our passion lies in enhancing interiors, providing high-quality fabrics, and delivering exceptional services to our clients.
        </p>
        <p>
          At Tex Decorization, we believe in the power of design to elevate environments. Whether you're seeking luxurious drapery, stylish upholstery, or unique decorative elements, our team of experts is dedicated to helping you achieve your vision.
        </p>
        <p>
          With years of experience and a commitment to excellence, we collaborate with homeowners, interior designers, and businesses to curate stunning spaces that reflect individual tastes and exceed expectations.
        </p>
        <p>
          Explore our collection, and let us inspire you to create captivating interiors that harmonize style, comfort, and functionality.
        </p>
      </Container>
    </div>
  );
};

export default AboutUs;
