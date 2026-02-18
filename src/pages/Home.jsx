import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Search, Heart, Calendar, Activity, ArrowRight, Users, Clock, ShieldCheck,
    Building2, UserCheck, MapPin, Droplets, ClipboardCheck, Stethoscope,
    HeartHandshake, Map, CheckCircle, ChevronRight, AlertTriangle, Zap,
    Package, Phone, Truck, CircleDot
} from 'lucide-react';
import Button from '../components/Button';
import { getStats } from '../data/bloodBanks';
import { getDonorCount } from '../data/storage';
import './Home.css';

const Home = () => {
    const [stats, setStats] = useState(null);
    const [donorCount, setDonorCount] = useState(0);

    useEffect(() => {
        setStats(getStats());
        setDonorCount(getDonorCount());
    }, []);

    return (
        <div className="home-page">
            {/* ==========================================
               IMMERSIVE HERO — FLUID ART
               ========================================== */}
            <section className="hero-immersive">
                {/* Fluid background blobs */}
                <div className="fluid-bg">
                    <div className="blob blob-1"></div>
                    <div className="blob blob-2"></div>
                    <div className="blob blob-3"></div>
                    <div className="blob blob-4"></div>
                    <div className="fluid-noise"></div>
                </div>

                {/* Floating particles */}
                <div className="particles">
                    {[...Array(12)].map((_, i) => (
                        <span key={i} className={`particle p-${i}`}></span>
                    ))}
                </div>

                {/* Blood drop animation */}
                <div className="hero-blood-drop">
                    <svg viewBox="0 0 100 140" className="drop-svg">
                        <defs>
                            <radialGradient id="dropGrad" cx="40%" cy="40%">
                                <stop offset="0%" stopColor="#FF4444" />
                                <stop offset="50%" stopColor="#CC0000" />
                                <stop offset="100%" stopColor="#8B0000" />
                            </radialGradient>
                            <filter id="dropGlow">
                                <feGaussianBlur stdDeviation="4" result="blur" />
                                <feMerge>
                                    <feMergeNode in="blur" />
                                    <feMergeNode in="SourceGraphic" />
                                </feMerge>
                            </filter>
                        </defs>
                        <path
                            d="M50 10 C50 10 15 55 15 80 C15 100 30 130 50 130 C70 130 85 100 85 80 C85 55 50 10 50 10Z"
                            fill="url(#dropGrad)"
                            filter="url(#dropGlow)"
                            className="drop-path"
                        />
                        <ellipse cx="35" cy="65" rx="8" ry="12" fill="rgba(255,255,255,0.15)" transform="rotate(-20, 35, 65)" />
                    </svg>
                </div>

                <div className="container hero-grid">
                    <div className="hero-text">
                        <div className="hero-badge">
                            <CircleDot size={14} />
                            <span>India's Trusted Blood Network</span>
                        </div>
                        <h1 className="hero-headline">
                            Every Drop<br />
                            <span className="hero-accent">Saves a Life.</span>
                        </h1>
                        <p className="hero-sub">
                            Real-time blood availability. Instant donor matching.
                            Emergency alerts across India. Join the movement that's
                            saving thousands of lives.
                        </p>
                        <div className="hero-actions">
                            <Link to="/blood-availability">
                                <Button variant="primary" className="btn-lg hero-btn-glow">
                                    <Search size={18} /> Search Blood Now
                                </Button>
                            </Link>
                            <Link to="/register-donor">
                                <Button variant="secondary" className="btn-lg hero-btn-outline">
                                    <Heart size={18} /> Become a Donor
                                </Button>
                            </Link>
                        </div>

                        {/* Live stats ticker */}
                        <div className="hero-live-stats">
                            <div className="live-stat">
                                <span className="live-num">{stats ? stats.totalBanks : 40}+</span>
                                <span className="live-label">Blood Banks</span>
                            </div>
                            <div className="live-divider"></div>
                            <div className="live-stat">
                                <span className="live-num">{stats ? stats.totalUnits.toLocaleString() : '0'}</span>
                                <span className="live-label">Units Available</span>
                            </div>
                            <div className="live-divider"></div>
                            <div className="live-stat">
                                <span className="live-num">{stats ? stats.totalStates : 15}+</span>
                                <span className="live-label">States Covered</span>
                            </div>
                            <div className="live-divider"></div>
                            <div className="live-stat">
                                <span className="live-num">{10000 + donorCount}</span>
                                <span className="live-label">Donors</span>
                            </div>
                        </div>
                    </div>

                    {/* Glass cards stack */}
                    <div className="hero-cards-area">
                        <div className="glass-card gc-1">
                            <div className="gc-icon gc-red"><Droplets size={22} /></div>
                            <div className="gc-body">
                                <strong>A+ Available</strong>
                                <span>City Hospital, Mumbai — 12 units</span>
                            </div>
                            <div className="gc-badge available">Live</div>
                        </div>
                        <div className="glass-card gc-2">
                            <div className="gc-icon gc-orange"><AlertTriangle size={22} /></div>
                            <div className="gc-body">
                                <strong>Emergency Request</strong>
                                <span>O- needed urgently — AIIMS Delhi</span>
                            </div>
                            <div className="gc-badge urgent">Urgent</div>
                        </div>
                        <div className="glass-card gc-3">
                            <div className="gc-icon gc-green"><CheckCircle size={22} /></div>
                            <div className="gc-body">
                                <strong>Donor Matched!</strong>
                                <span>Response in 8 minutes ❤️</span>
                            </div>
                            <div className="gc-badge matched">Done</div>
                        </div>
                        <div className="glass-card gc-4">
                            <div className="gc-icon gc-blue"><Calendar size={22} /></div>
                            <div className="gc-body">
                                <strong>Donation Scheduled</strong>
                                <span>Feb 22 at Red Cross, Delhi</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ==========================================
               BLOOD GROUP AVAILABILITY BAR
               ========================================== */}
            {stats && (
                <section className="blood-group-bar">
                    <div className="container">
                        <div className="bg-bar-inner">
                            <h3 className="bg-bar-title">Real-Time Blood Stock</h3>
                            <div className="bg-group-grid">
                                {Object.entries(stats.groupTotals).map(([group, count]) => (
                                    <div key={group} className="bg-group-item">
                                        <div className={`bg-circle ${count < 50 ? 'low' : count < 100 ? 'medium' : 'high'}`}>
                                            <span className="bg-label">{group}</span>
                                        </div>
                                        <span className="bg-count">{count} units</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* ==========================================
               HOW IT WORKS — 3 WORKFLOWS
               ========================================== */}
            <section className="section workflows-section">
                <div className="container">
                    <div className="section-header text-center">
                        <span className="section-tag">How It Works</span>
                        <h2 className="section-title">Choose Your Path</h2>
                        <p className="section-subtitle">Whether you need blood, want to donate, or face an emergency — we've got you covered.</p>
                    </div>

                    <div className="workflows-grid">
                        {/* Workflow 1: Order Blood */}
                        <div className="workflow-card wf-order">
                            <div className="wf-header">
                                <div className="wf-icon-wrap wf-red"><Search size={28} /></div>
                                <h3>Need Blood?</h3>
                                <p>Find and order the right blood type from verified centers near you.</p>
                            </div>
                            <div className="wf-steps">
                                <div className="wf-step">
                                    <div className="wf-step-num">1</div>
                                    <div className="wf-step-content">
                                        <strong>Search Availability</strong>
                                        <span>Select blood group, component & location</span>
                                    </div>
                                </div>
                                <div className="wf-connector"></div>
                                <div className="wf-step">
                                    <div className="wf-step-num">2</div>
                                    <div className="wf-step-content">
                                        <strong>Choose Blood Center</strong>
                                        <span>Compare centers by stock & distance</span>
                                    </div>
                                </div>
                                <div className="wf-connector"></div>
                                <div className="wf-step">
                                    <div className="wf-step-num">3</div>
                                    <div className="wf-step-content">
                                        <strong>Request & Collect</strong>
                                        <span>Place request and coordinate pickup</span>
                                    </div>
                                </div>
                            </div>
                            <Link to="/blood-availability" className="wf-action">
                                <Button variant="primary" className="btn-full-width">
                                    Search Blood Now <ArrowRight size={16} />
                                </Button>
                            </Link>
                        </div>

                        {/* Workflow 2: Schedule Donation */}
                        <div className="workflow-card wf-donate">
                            <div className="wf-header">
                                <div className="wf-icon-wrap wf-green"><HeartHandshake size={28} /></div>
                                <h3>Want to Donate?</h3>
                                <p>Register as a donor and schedule your first life-saving donation.</p>
                            </div>
                            <div className="wf-steps">
                                <div className="wf-step">
                                    <div className="wf-step-num">1</div>
                                    <div className="wf-step-content">
                                        <strong>Register Online</strong>
                                        <span>Quick 2-minute registration form</span>
                                    </div>
                                </div>
                                <div className="wf-connector"></div>
                                <div className="wf-step">
                                    <div className="wf-step-num">2</div>
                                    <div className="wf-step-content">
                                        <strong>Schedule Appointment</strong>
                                        <span>Pick a date, time & nearby center</span>
                                    </div>
                                </div>
                                <div className="wf-connector"></div>
                                <div className="wf-step">
                                    <div className="wf-step-num">3</div>
                                    <div className="wf-step-content">
                                        <strong>Donate & Save Lives</strong>
                                        <span>Complete donation with professional staff</span>
                                    </div>
                                </div>
                            </div>
                            <Link to="/register-donor" className="wf-action">
                                <Button variant="primary" className="btn-full-width">
                                    Register as Donor <ArrowRight size={16} />
                                </Button>
                            </Link>
                        </div>

                        {/* Workflow 3: Emergency Blood */}
                        <div className="workflow-card wf-emergency">
                            <div className="wf-header">
                                <div className="wf-icon-wrap wf-amber"><Zap size={28} /></div>
                                <h3>Emergency?</h3>
                                <p>Critical blood need? We alert all nearby compatible donors instantly.</p>
                            </div>
                            <div className="wf-steps">
                                <div className="wf-step">
                                    <div className="wf-step-num">1</div>
                                    <div className="wf-step-content">
                                        <strong>Raise Emergency Alert</strong>
                                        <span>Submit patient details & blood needed</span>
                                    </div>
                                </div>
                                <div className="wf-connector"></div>
                                <div className="wf-step">
                                    <div className="wf-step-num">2</div>
                                    <div className="wf-step-content">
                                        <strong>Donors Notified</strong>
                                        <span>All compatible donors within 10km alerted</span>
                                    </div>
                                </div>
                                <div className="wf-connector"></div>
                                <div className="wf-step">
                                    <div className="wf-step-num">3</div>
                                    <div className="wf-step-content">
                                        <strong>Blood Delivered</strong>
                                        <span>Fastest responder matched & dispatched</span>
                                    </div>
                                </div>
                            </div>
                            <Link to="/emergency" className="wf-action">
                                <Button variant="primary" className="btn-full-width wf-emergency-btn">
                                    <AlertTriangle size={16} /> Emergency Request
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* ==========================================
               OUR SERVICES
               ========================================== */}
            <section className="section services-section">
                <div className="container">
                    <div className="section-header text-center">
                        <span className="section-tag">Services</span>
                        <h2 className="section-title">Everything You Need</h2>
                    </div>
                    <div className="services-grid">
                        <Link to="/blood-availability" className="service-card active-card">
                            <div className="svc-icon"><Search size={28} /></div>
                            <span>Blood Availability Search</span>
                        </Link>
                        <Link to="/blood-availability" className="service-card">
                            <div className="svc-icon"><Building2 size={28} /></div>
                            <span>Blood Center Directory</span>
                        </Link>
                        <Link to="/register-donor" className="service-card">
                            <div className="svc-icon"><HeartHandshake size={28} /></div>
                            <span>Donor Registration</span>
                        </Link>
                        <Link to="/emergency" className="service-card">
                            <div className="svc-icon"><Zap size={28} /></div>
                            <span>Emergency Requests</span>
                        </Link>
                        <Link to="/blood-banks" className="service-card">
                            <div className="svc-icon"><ClipboardCheck size={28} /></div>
                            <span>Blood Bank Registration</span>
                        </Link>
                    </div>
                </div>
            </section>

            {/* ==========================================
               WHO CAN DONATE
               ========================================== */}
            <section className="section donate-section">
                <div className="container donate-grid">
                    <div className="donate-content">
                        <span className="section-tag">Eligibility</span>
                        <h2 className="section-title">Who Can Donate</h2>
                        <p className="donate-text">
                            Donating blood is a simple, safe and life-saving act. To ensure safety of
                            both donors and recipients, certain health criteria must be met.
                        </p>
                        <ul className="eligibility-list">
                            <li><CheckCircle size={18} className="check-green" /> Age between 18–65 years</li>
                            <li><CheckCircle size={18} className="check-green" /> Weight above 45 kg</li>
                            <li><CheckCircle size={18} className="check-green" /> Hemoglobin level of 12.5 g/dL minimum</li>
                            <li><CheckCircle size={18} className="check-green" /> Pulse 50–100, no irregularities</li>
                            <li><CheckCircle size={18} className="check-green" /> BP: Systolic 100–180, Diastolic 50–100</li>
                            <li><CheckCircle size={18} className="check-green" /> No major surgery in the last 6 months</li>
                        </ul>
                        <div className="donate-cta-group">
                            <Link to="/register-donor">
                                <Button variant="primary">Register Now</Button>
                            </Link>
                        </div>
                    </div>
                    <div className="donate-visual">
                        <div className="donate-illustration">
                            <div className="donor-figure">
                                <Heart size={64} className="donor-heart" fill="currentColor" />
                                <div className="iv-line"></div>
                                <div className="blood-bag">
                                    <Droplets size={32} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ==========================================
               TESTIMONIALS / RECENTLY SAVED
               ========================================== */}
            <section className="section testimonials-section">
                <div className="container">
                    <div className="section-header text-center">
                        <span className="section-tag">Impact</span>
                        <h2 className="section-title">Lives We've Touched</h2>
                    </div>
                    <div className="testimonials-grid">
                        <div className="testimonial-card">
                            <div className="t-quote">"RaktSetu found O- blood for my mother within 15 minutes during her surgery. This platform literally saved her life."</div>
                            <div className="t-author">
                                <div className="t-avatar">RP</div>
                                <div>
                                    <strong>Rahul Patel</strong>
                                    <span>Mumbai, Maharashtra</span>
                                </div>
                            </div>
                        </div>
                        <div className="testimonial-card">
                            <div className="t-quote">"As a regular donor, I love how easy it is to schedule appointments and track my donation history. Wonderful initiative."</div>
                            <div className="t-author">
                                <div className="t-avatar">AS</div>
                                <div>
                                    <strong>Ananya Sharma</strong>
                                    <span>New Delhi</span>
                                </div>
                            </div>
                        </div>
                        <div className="testimonial-card">
                            <div className="t-quote">"Our blood bank's efficiency improved 40% after joining RaktSetu. The inventory management tools are exceptional."</div>
                            <div className="t-author">
                                <div className="t-avatar">DK</div>
                                <div>
                                    <strong>Dr. Kumar</strong>
                                    <span>Red Cross, Chennai</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ==========================================
               IMPACT STATS BAR
               ========================================== */}
            <section className="impact-bar">
                <div className="container impact-grid">
                    <div className="impact-item">
                        <span className="impact-number">5,000+</span>
                        <span className="impact-label">Lives Saved</span>
                    </div>
                    <div className="impact-item">
                        <span className="impact-number">{stats ? stats.totalBanks : 40}+</span>
                        <span className="impact-label">Partner Blood Banks</span>
                    </div>
                    <div className="impact-item">
                        <span className="impact-number">15 min</span>
                        <span className="impact-label">Avg Response Time</span>
                    </div>
                    <div className="impact-item">
                        <span className="impact-number">{(10000 + donorCount).toLocaleString()}</span>
                        <span className="impact-label">Active Donors</span>
                    </div>
                </div>
            </section>

            {/* ==========================================
               CTA SECTION
               ========================================== */}
            <section className="cta-banner">
                <div className="container cta-inner text-center">
                    <h2>Ready to Make a Difference?</h2>
                    <p>Join the RaktSetu community today. Every donor is a hero.</p>
                    <div className="cta-buttons">
                        <Link to="/blood-availability">
                            <Button variant="secondary">Find Blood</Button>
                        </Link>
                        <Link to="/register-donor">
                            <Button variant="primary" className="btn-white-border">Register as Donor</Button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
