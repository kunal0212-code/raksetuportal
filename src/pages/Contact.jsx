import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Clock, CheckCircle } from 'lucide-react';
import Button from '../components/Button';
import './Contact.css';

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
    const [errors, setErrors] = useState({});
    const [submitState, setSubmitState] = useState('idle'); // idle, submitting, success

    const validate = () => {
        const err = {};
        if (!formData.name.trim()) err.name = 'Name is required';
        if (!formData.email.trim()) err.email = 'Email is required';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) err.email = 'Invalid email format';
        if (!formData.subject.trim()) err.subject = 'Subject is required';
        if (!formData.message.trim()) err.message = 'Message is required';
        else if (formData.message.trim().length < 10) err.message = 'Message must be at least 10 characters';
        return err;
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (errors[e.target.name]) {
            setErrors({ ...errors, [e.target.name]: '' });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        setSubmitState('submitting');
        // Simulate API call
        await new Promise(r => setTimeout(r, 1500));
        setSubmitState('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setSubmitState('idle'), 4000);
    };

    return (
        <div className="contact-page">
            <section className="contact-hero">
                <div className="container">
                    <h1>Contact Us</h1>
                    <p>Have questions? We'd love to hear from you.</p>
                </div>
            </section>

            <section className="section">
                <div className="container contact-grid">
                    <div className="contact-info-col">
                        <h2>Get in Touch</h2>
                        <p>Reach out to us for inquiries, partnership opportunities, or support.</p>

                        <div className="contact-info-items">
                            <div className="contact-info-item">
                                <div className="ci-icon"><Mail size={20} /></div>
                                <div>
                                    <strong>Email</strong>
                                    <span>support@raktsetu.com</span>
                                </div>
                            </div>
                            <div className="contact-info-item">
                                <div className="ci-icon"><Phone size={20} /></div>
                                <div>
                                    <strong>Phone</strong>
                                    <span>+91 98765 43210</span>
                                </div>
                            </div>
                            <div className="contact-info-item">
                                <div className="ci-icon"><MapPin size={20} /></div>
                                <div>
                                    <strong>Address</strong>
                                    <span>Mumbai, Maharashtra, India</span>
                                </div>
                            </div>
                            <div className="contact-info-item">
                                <div className="ci-icon"><Clock size={20} /></div>
                                <div>
                                    <strong>Working Hours</strong>
                                    <span>Mon – Sat, 9:00 AM – 6:00 PM IST</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <form className="contact-form" onSubmit={handleSubmit} noValidate>
                        <h2>Send a Message</h2>

                        {submitState === 'success' && (
                            <div className="form-success">
                                <CheckCircle size={18} />
                                Thank you! We'll get back to you soon.
                            </div>
                        )}

                        <div className="form-group">
                            <label htmlFor="contact-name">Full Name *</label>
                            <input
                                id="contact-name"
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className={errors.name ? 'error' : ''}
                                placeholder="Enter your name"
                            />
                            {errors.name && <span className="field-error">{errors.name}</span>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="contact-email">Email Address *</label>
                            <input
                                id="contact-email"
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className={errors.email ? 'error' : ''}
                                placeholder="Enter your email"
                            />
                            {errors.email && <span className="field-error">{errors.email}</span>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="contact-subject">Subject *</label>
                            <input
                                id="contact-subject"
                                type="text"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                className={errors.subject ? 'error' : ''}
                                placeholder="e.g. Partnership Inquiry"
                            />
                            {errors.subject && <span className="field-error">{errors.subject}</span>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="contact-message">Message *</label>
                            <textarea
                                id="contact-message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                className={errors.message ? 'error' : ''}
                                rows="5"
                                placeholder="Describe your query..."
                            ></textarea>
                            {errors.message && <span className="field-error">{errors.message}</span>}
                        </div>

                        <Button
                            type="submit"
                            variant="primary"
                            className="btn-full-width"
                            disabled={submitState === 'submitting'}
                        >
                            {submitState === 'submitting' ? 'Sending...' : <><Send size={16} /> Send Message</>}
                        </Button>
                    </form>
                </div>
            </section>
        </div>
    );
};

export default Contact;
