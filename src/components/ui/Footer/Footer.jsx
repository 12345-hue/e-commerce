import styles from "./Footer.module.css";
import amazon_pay from "../../../assets/images/footer/2560px-Amazon_Pay_logo.svg.png";
import american_express from "../../../assets/images/footer/American-Express-Logo-PNG-File.png";
import master_card from "../../../assets/images/footer/purepng.com-mastercard-logologobrand-logoiconslogos-251519938372dnf77.png";
import paypal from "../../../assets/images/footer/PayPal.svg.png";
import downloadAppStore from "../../../assets/images/footer/th1.png";
import downloadGooglePlay from "../../../assets/images/footer/th2.png";
import Button from "../Button/Button";
import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import logo from "../../../assets/images/freshcart-logo.svg";

function Footer() {
  return (
    <footer className={styles.footer}>
      <section className="container">
        {/* IMPROVEMENT: app download section */}
        <div className="row g-4 mb-3">
          <div className="col-12 col-md-6">
            <h2>Get the FreshCart app</h2>
            <p className="text-secondary">We'll send you a link, open it on your phone to download the app.</p>
            <div className="d-flex gap-2 flex-wrap flex-sm-nowrap">
              <input type="email" placeholder="Email" aria-label="Email" className="form-control" />
              <Button moreStyles={{ minWidth: "10rem" }}>Share App Link</Button>
            </div>
          </div>
          {/* IMPROVEMENT: quick links in footer */}
          <div className="col-6 col-md-3">
            <h6 className="fw-bold mb-3">Quick Links</h6>
            <ul className="list-unstyled d-flex flex-column gap-2">
              <li><Link to="/" className="text-secondary text-decoration-none">Home</Link></li>
              <li><Link to="/products" className="text-secondary text-decoration-none">Products</Link></li>
              <li><Link to="/categories" className="text-secondary text-decoration-none">Categories</Link></li>
              <li><Link to="/brands" className="text-secondary text-decoration-none">Brands</Link></li>
            </ul>
          </div>
          <div className="col-6 col-md-3">
            <h6 className="fw-bold mb-3">My Account</h6>
            <ul className="list-unstyled d-flex flex-column gap-2">
              <li><Link to="/login" className="text-secondary text-decoration-none">Login</Link></li>
              <li><Link to="/register" className="text-secondary text-decoration-none">Register</Link></li>
              <li><Link to="/cart" className="text-secondary text-decoration-none">Cart</Link></li>
              <li><Link to="/wishlist" className="text-secondary text-decoration-none">Wishlist</Link></li>
            </ul>
          </div>
        </div>

        <hr />

        <div className="links d-flex gap-5 gap-md-3 justify-content-between flex-wrap align-items-center">
          <div className="partners d-flex gap-3 align-items-center flex-wrap">
            <h5 className="mb-0">Payment Partners:</h5>
            <ul className="list-unstyled d-flex gap-1 gap-sm-3 align-items-center flex-wrap mb-0">
              <li><img src={amazon_pay} alt="Amazon Pay" width="70px" /></li>
              <li><img src={american_express} alt="American Express" width="70px" /></li>
              <li><img src={master_card} alt="Master Card" width="70px" /></li>
              <li><img src={paypal} alt="PayPal" width="70px" /></li>
            </ul>
          </div>
          <div className="download d-flex gap-1 align-items-center gap-sm-3 flex-wrap">
            <h5 className="mb-0">Get Deliveries with FreshCart</h5>
            <div>
              <img src={downloadAppStore} alt="Download on App Store" style={{ width: "50%", maxWidth: "12rem" }} />
              <img src={downloadGooglePlay} alt="Get it on Google Play" style={{ width: "50%", maxWidth: "12rem" }} />
            </div>
          </div>
        </div>

        <hr />

        {/* IMPROVEMENT: bottom bar with social links + copyright */}
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
          <img src={logo} alt="FreshCart" style={{ height: "30px" }} />
          <ul className="list-unstyled d-flex gap-3 fs-5 mb-0">
            <li><a href="https://www.instagram.com" aria-label="Instagram" className="text-secondary"><FaInstagram /></a></li>
            <li><a href="https://www.facebook.com" aria-label="Facebook" className="text-secondary"><FaFacebook /></a></li>
            <li><a href="https://www.twitter.com" aria-label="Twitter" className="text-secondary"><FaTwitter /></a></li>
            <li><a href="https://www.linkedin.com" aria-label="LinkedIn" className="text-secondary"><FaLinkedin /></a></li>
          </ul>
          <p className="text-secondary mb-0 small">© {new Date().getFullYear()} FreshCart. All rights reserved.</p>
        </div>
      </section>
    </footer>
  );
}

export default Footer;
