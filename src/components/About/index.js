import './index.css';

const About = () => {
  return (
    <div className="about-container">
      <header className="about-header">
        <h1>About Our Product Listing App</h1>
        <p>Your gateway to seamless product discovery</p>
      </header>

      <section className="about-content">
        <div className="about-section">
          <h2>Our Story</h2>
          <p>
            Founded in 2023, the Product Listing App was created to simplify the way users browse and discover products.
            We believe in providing a clean, intuitive interface that makes online shopping effortless and enjoyable.
          </p>
        </div>

        <div className="about-section">
          <h2>Key Features</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🔍</div>
              <h3>Intuitive Search</h3>
              <p>Find exactly what you're looking for with our powerful search functionality</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📱</div>
              <h3>Mobile Friendly</h3>
              <p>Shop seamlessly on any device with our responsive design</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Fast Loading</h3>
              <p>Quick product displays with optimized performance</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📋</div>
              <h3>Detailed Listings</h3>
              <p>Comprehensive product information at your fingertips</p>
            </div>
          </div>
        </div>

        <div className="about-section">
          <h2>Technology Stack</h2>
          <div className="tech-stack">
            <div className="tech-item">React</div>
            <div className="tech-item">React Router</div>
            <div className="tech-item">CSS3</div>
            <div className="tech-item">FakeStore API</div>
          </div>
        </div>
      </section>

      <section className="about-team">
        <h2>Meet the Team</h2>
        <div className="team-grid">
          <div className="team-member">
            <div className="member-avatar">👨‍💻</div>
            <h3>Lijo Joseph</h3>
            <p>React Developer Intern</p>
          </div>
          <div className="team-member">
            <div className="member-avatar">👩‍🎨</div>
            <h3>Mimi Z. B</h3>
            <p>UI/UX Designer</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About