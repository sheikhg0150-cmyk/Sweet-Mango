import React from 'react';

const AboutUs = () => {
  return (
    <div className="container" style={{ padding: '4rem 2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ color: '#ff8c00', textAlign: 'center', marginBottom: '2rem' }}>About Sweet Mangoes</h1>
      <div style={{ background: 'rgba(255, 255, 255, 0.4)', backdropFilter: 'blur(10px)', padding: '2rem', borderRadius: '15px', lineHeight: '1.8' }}>
        <p>
          Welcome to <strong>Sweet Mangoes</strong>, your number one source for the freshest and most premium mangoes in Pakistan. 
          We are dedicated to giving you the very best of nature's candy, with a focus on quality, freshness, and customer service.
        </p>
        <p>
          Founded with a passion for bringing the authentic taste of Multan and Sindh orchards directly to your doorstep in Rawalpindi and Islamabad, 
          Sweet Mangoes has come a long way from its beginnings. When we first started out, our passion for "Farm-to-Table" freshness drove us to 
          bypass the traditional supply chains so that Sweet Mangoes can offer you export-quality mangoes at competitive rates.
        </p>
        <p>
          We now serve customers all over the twin cities, and are thrilled that we're able to turn our passion into our own website. 
          We hope you enjoy our products as much as we enjoy offering them to you.
        </p>
        <p style={{ marginTop: '2rem', fontStyle: 'italic', textAlign: 'center' }}>
          Sincerely,<br/>
          The Sweet Mangoes Team
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
