import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Truck } from 'lucide-react';
import { Button } from '../ui/Button';
import styles from './PublicLayout.module.css';

export function PublicLayout() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className={styles.layout}>
      {/* Navbar */}
      <header className={styles.header}>
        <div className={styles.headerContainer}>
          <Link to="/" className={styles.logo}>
            <Truck size={28} />
            <span>TransitOps</span>
          </Link>
          
          <nav className={styles.nav}>
            <Link to="/features" className={isActive('/features') ? styles.active : ''}>Features</Link>
            <Link to="/solutions" className={isActive('/solutions') ? styles.active : ''}>Solutions</Link>
            <Link to="/about" className={isActive('/about') ? styles.active : ''}>About</Link>
            <Link to="/contact" className={isActive('/contact') ? styles.active : ''}>Contact</Link>
          </nav>
          
          <div className={styles.actions}>
            <Link to="/login">
              <Button variant="ghost">Log In</Button>
            </Link>
            <Link to="/login">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className={styles.main}>
        <Outlet />
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContainer}>
          <div className={styles.footerBrand}>
            <div className={styles.logo}>
              <Truck size={24} />
              <span>TransitOps</span>
            </div>
            <p className={styles.footerDesc}>
              The enterprise-grade platform for modern logistics and fleet management.
            </p>
          </div>
          
          <div className={styles.footerLinks}>
            <div className={styles.linkGroup}>
              <h4>Product</h4>
              <Link to="/features">Features</Link>
              <Link to="/solutions">Solutions</Link>
              <Link to="#">Pricing</Link>
            </div>
            <div className={styles.linkGroup}>
              <h4>Company</h4>
              <Link to="/about">About Us</Link>
              <Link to="/contact">Contact</Link>
              <Link to="#">Careers</Link>
            </div>
            <div className={styles.linkGroup}>
              <h4>Legal</h4>
              <Link to="#">Privacy Policy</Link>
              <Link to="#">Terms of Service</Link>
            </div>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <p>&copy; {new Date().getFullYear()} TransitOps. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
