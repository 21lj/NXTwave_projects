import './index.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-newsletter">
        <h3>BE THE FIRST TO KNOW</h3>
        <p className="large-only">Sign up for updates from Product Listing App.</p>
        <p className="small-only">
          oh just a random website build by Lijo. Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
          this is simply dummy text.
        </p>
        <div className="newsletter-form">
          <input type="email" placeholder="Enter your e-mail..." />
          <button>SUBSCRIBE</button>
        </div>
      </div>

      <div className="footer-content">
        <div className="footer-grid large-only">
          <div className="footer-column">
            <h4>Product Listing App</h4>
            <ul>
              <li>About Us</li>
              <li>Stories</li>
              <li>Artisans</li>
              <li>Boutiques</li>
              <li>Contact Us</li>
              <li>EU Compliances Docs</li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>QUICK LINKS</h4>
            <ul>
              <li>Orders & Shipping</li>
              <li>Join/Login as a Seller</li>
              <li>Payment & Pricing</li>
              <li>Return & Refunds</li>
              <li>FAQs</li>
              <li>Privacy Policy</li>
              <li>Terms & Conditions</li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>CONTACT US</h4>
            <p>+44 221 193 5980</p>
            <p>customercare@nxtwave.com</p>
          </div>

          <div className="footer-column">
            <h4>CURRENCY</h4>
            <p><strong>USD</strong></p>
            <p>Transactions will be completed in Euros and a currency reference is available on home.</p>
          </div>
        </div>

        <div className="small-only">
          <div className="footer-contact">
            <h4>CALL US</h4>
            <p>+44 221 133 5360 • customercare@mettamuse.com</p>
            
            <h4>CURRENCY</h4>
            <p>USD</p>
          </div>

          <div className="footer-links">
            <h4>Product Listing App</h4>
            <h4>QUICK LINKS</h4>
            <h4>FOLLOW US</h4>
          </div>
        </div>

        <div className="footer-social">
          <h4 className="large-only">FOLLOW US</h4>
          <h4 className="large-only">Product Listing App ACCEPTS</h4>
          
          <div className="payment-methods">
            <div className="payment-icon">1 Pay</div>
            <div className="payment-icon">2 Pay</div>
            <div className="payment-icon">3 Pay</div>
            <div className="payment-icon">4 Pay</div>
            <div className="payment-icon">8 Pay</div>
          </div>
        </div>
      </div>

      <div className="footer-copyright">
        <p>Copyright © 2025 Product Listing App. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;