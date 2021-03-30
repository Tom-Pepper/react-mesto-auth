import React from 'react';

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__copyright">&copy; 2020 — {new Date().getFullYear()}. Mesto Russia</p>
    </footer>
  );
}

export default Footer;
