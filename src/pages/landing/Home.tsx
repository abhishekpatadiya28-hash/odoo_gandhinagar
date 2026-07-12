import React from 'react';
import { Link } from 'react-router-dom';
import { Truck, Map, Wrench, BarChart3, ShieldAlert, ArrowRight } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import styles from './Home.module.css';

const features = [
  {
    icon: Truck,
    title: 'Fleet Management',
    desc: 'Real-time visibility into all your vehicles, driver assignments, and availability.'
  },
  {
    icon: Map,
    title: 'Trip Dispatching',
    desc: 'Seamlessly assign drivers to routes, track progress, and manage fuel logs.'
  },
  {
    icon: Wrench,
    title: 'Maintenance Tracking',
    desc: 'Automated reminders and history logs to keep your fleet in top condition.'
  },
  {
    icon: ShieldAlert,
    title: 'Safety & Compliance',
    desc: 'Monitor license expirations, safety scores, and ensure regulatory compliance.'
  },
  {
    icon: BarChart3,
    title: 'Advanced Analytics',
    desc: 'Track operational costs, fuel efficiency, and ROI per vehicle.'
  }
];

export function Home() {
  return (
    <div className={styles.container}>
      <section className={styles.hero}>
        <div className={styles.heroBadge}>TransitOps v2.0 is Live</div>
        <h1 className={styles.heroTitle}>
          Optimize Every Mile with <span>TransitOps</span>
        </h1>
        <p className={styles.heroDesc}>
          The enterprise-grade platform for modern logistics and fleet management. 
          Reduce costs, improve safety, and gain real-time visibility into your entire operation.
        </p>
        <div className={styles.heroActions}>
          <Link to="/login">
            <Button size="lg" rightIcon={<ArrowRight size={20} />}>Request Demo</Button>
          </Link>
          <Link to="/features">
            <Button variant="secondary" size="lg">Explore Features</Button>
          </Link>
        </div>
        
        {/* Mockup Dashboard Image placeholder */}
        <div className={styles.heroImageContainer}>
          <div className={styles.heroImagePlaceholder}>
            <div className={styles.mockupHeader}>
              <div className={styles.dots}>
                <span></span><span></span><span></span>
              </div>
            </div>
            <div className={styles.mockupBody}>
              <div className={styles.mockupSidebar} style={{ padding: 'var(--space-4)', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                <div style={{ height: '24px', width: '80%', backgroundColor: 'rgba(37, 99, 235, 0.15)', borderRadius: 'var(--radius-sm)' }}></div>
                <div style={{ height: '24px', width: '60%', backgroundColor: 'var(--color-border)', borderRadius: 'var(--radius-sm)' }}></div>
                <div style={{ height: '24px', width: '70%', backgroundColor: 'var(--color-border)', borderRadius: 'var(--radius-sm)' }}></div>
                <div style={{ height: '24px', width: '50%', backgroundColor: 'var(--color-border)', borderRadius: 'var(--radius-sm)' }}></div>
              </div>
              <div className={styles.mockupContent} style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', width: '100%' }}>
                {/* Stats row */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-4)' }}>
                  <div style={{ padding: 'var(--space-4)', backgroundColor: 'var(--color-bg)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', display: 'flex', flexDirection: 'column', gap: '4px', textAlign: 'left' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', fontWeight: 500 }}>Active Vehicles</span>
                    <span style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-primary)' }}>32 / 36</span>
                  </div>
                  <div style={{ padding: 'var(--space-4)', backgroundColor: 'var(--color-bg)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', display: 'flex', flexDirection: 'column', gap: '4px', textAlign: 'left' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', fontWeight: 500 }}>Active Trips</span>
                    <span style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-success)' }}>18</span>
                  </div>
                  <div style={{ padding: 'var(--space-4)', backgroundColor: 'var(--color-bg)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', display: 'flex', flexDirection: 'column', gap: '4px', textAlign: 'left' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', fontWeight: 500 }}>Fleet Efficiency</span>
                    <span style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-warning)' }}>94.2%</span>
                  </div>
                </div>
                {/* Table / List row */}
                <div style={{ flex: 1, padding: 'var(--space-4)', backgroundColor: 'var(--color-bg)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--color-border)', paddingBottom: 'var(--space-2)' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-text-main)' }}>Active Trip Tracking</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-primary)', fontWeight: 500 }}>Live View</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', textAlign: 'left' }}>
                      <span style={{ fontSize: '0.8125rem', fontWeight: 600 }}>Freightliner Cascadia (Trip #1024)</span>
                      <span style={{ fontSize: '0.6875rem', color: 'var(--color-text-secondary)' }}>Los Angeles, CA ➔ Phoenix, AZ</span>
                    </div>
                    <span style={{ fontSize: '0.6875rem', padding: '2px 8px', backgroundColor: 'rgba(16, 185, 129, 0.1)', color: 'var(--color-success)', borderRadius: '9999px', fontWeight: 600 }}>ON TIME</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', textAlign: 'left' }}>
                      <span style={{ fontSize: '0.8125rem', fontWeight: 600 }}>Volvo VNL 860 (Trip #1025)</span>
                      <span style={{ fontSize: '0.6875rem', color: 'var(--color-text-secondary)' }}>Chicago, IL ➔ Detroit, MI</span>
                    </div>
                    <span style={{ fontSize: '0.6875rem', padding: '2px 8px', backgroundColor: 'rgba(37, 99, 235, 0.1)', color: 'var(--color-primary)', borderRadius: '9999px', fontWeight: 600 }}>DISPATCHED</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.features}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Everything you need to run your fleet</h2>
          <p className={styles.sectionDesc}>
            Purpose-built tools for fleet managers, safety officers, financial analysts, and drivers all in one unified platform.
          </p>
        </div>
        
        <div className={styles.featuresGrid}>
          {features.map((feature, i) => (
            <div key={i} className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <feature.icon size={24} />
              </div>
              <h3 className={styles.featureTitle}>{feature.title}</h3>
              <p className={styles.featureDesc}>{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>
      
      <section className={styles.workflow}>
         <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>A connected workflow</h2>
          <p className={styles.sectionDesc}>
            From vehicle registration to trip completion, everything flows seamlessly.
          </p>
        </div>
        
        <div className={styles.timeline}>
          {['Register Vehicle', 'Assign Driver', 'Dispatch Trip', 'Complete Trip', 'Analyze Reports'].map((step, i) => (
             <div key={i} className={styles.timelineStep}>
                <div className={styles.stepNumber}>{i + 1}</div>
                <div className={styles.stepText}>{step}</div>
             </div>
          ))}
        </div>
      </section>
      
      <section className={styles.cta}>
        <h2 className={styles.ctaTitle}>Ready to modernize your fleet?</h2>
        <p className={styles.ctaDesc}>Join hundreds of logistics companies using TransitOps today.</p>
        <Link to="/login">
          <Button size="lg">Get Started Now</Button>
        </Link>
      </section>
    </div>
  );
}
