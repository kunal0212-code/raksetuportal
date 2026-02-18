import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Heart, User, Mail, Phone, MapPin, Calendar, Droplets,
    CheckCircle, ArrowLeft, ShieldCheck
} from 'lucide-react';
import Button from '../components/Button';
import { registerDonor } from '../data/storage';
import './DonorRegistration.css';

const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

const DonorRegistration = () => {
    const [formData, setFormData] = useState({
        fullName: '', email: '', phone: '', dob: '', gender: '',
        bloodGroup: '', state: '', district: '', address: '',
        weight: '', lastDonation: '', medicalConditions: '',
        agreeTerms: false
    });
    const [errors, setErrors] = useState({});
    const [submitState, setSubmitState] = useState('idle');
    const [registeredDonor, setRegisteredDonor] = useState(null);

    const validate = () => {
        const err = {};
        if (!formData.fullName.trim()) err.fullName = 'Full name is required';
        if (!formData.email.trim()) err.email = 'Email is required';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) err.email = 'Invalid email format';
        if (!formData.phone.trim()) err.phone = 'Phone number is required';
        else if (!/^[6-9]\d{9}$/.test(formData.phone.replace(/\s/g, '')))
            err.phone = 'Enter a valid 10-digit Indian phone number';
        if (!formData.dob) err.dob = 'Date of birth is required';
        else {
            const age = (new Date() - new Date(formData.dob)) / (365.25 * 24 * 60 * 60 * 1000);
            if (age < 18) err.dob = 'You must be at least 18 years old to donate';
            if (age > 65) err.dob = 'Donors must be under 65 years of age';
        }
        if (!formData.gender) err.gender = 'Please select gender';
        if (!formData.bloodGroup) err.bloodGroup = 'Please select blood group';
        if (!formData.state.trim()) err.state = 'State is required';
        if (!formData.weight) err.weight = 'Weight is required';
        else if (Number(formData.weight) < 45) err.weight = 'Minimum weight for donors is 45 kg';
        if (!formData.agreeTerms) err.agreeTerms = 'You must agree to the terms';
        return err;
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            window.scrollTo({ top: 300, behavior: 'smooth' });
            return;
        }
        setSubmitState('submitting');
        await new Promise(r => setTimeout(r, 1500));

        const donor = registerDonor({
            fullName: formData.fullName,
            email: formData.email,
            phone: formData.phone,
            dob: formData.dob,
            gender: formData.gender,
            bloodGroup: formData.bloodGroup,
            state: formData.state,
            district: formData.district,
            address: formData.address,
            weight: formData.weight,
            lastDonation: formData.lastDonation,
            medicalConditions: formData.medicalConditions,
        });

        setRegisteredDonor(donor);
        setSubmitState('success');
    };

    if (submitState === 'success' && registeredDonor) {
        return (
            <div className="dr-page">
                <section className="dr-hero">
                    <div className="container">
                        <h1>Donor Registration</h1>
                        <p>Thank you for choosing to save lives!</p>
                    </div>
                </section>
                <section className="section">
                    <div className="container">
                        <div className="dr-success-card">
                            <div className="dr-success-icon">
                                <CheckCircle size={56} />
                            </div>
                            <h2>Registration Successful! 🎉</h2>
                            <p>Welcome to the RaktSetu family, <strong>{registeredDonor.fullName}</strong>!</p>
                            <div className="dr-success-details">
                                <div className="dr-detail">
                                    <span>Donor ID</span>
                                    <strong>{registeredDonor.id}</strong>
                                </div>
                                <div className="dr-detail">
                                    <span>Blood Group</span>
                                    <strong>{registeredDonor.bloodGroup}</strong>
                                </div>
                                <div className="dr-detail">
                                    <span>Status</span>
                                    <strong className="status-active">Active ✓</strong>
                                </div>
                            </div>
                            <p className="dr-success-note">You'll be notified when there's a blood request matching your blood group in your area.</p>
                            <div className="dr-success-actions">
                                <Link to="/"><Button variant="primary">Go to Home</Button></Link>
                                <Link to="/blood-availability"><Button variant="secondary">Search Blood</Button></Link>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }

    return (
        <div className="dr-page">
            <section className="dr-hero">
                <div className="container">
                    <h1><Heart size={24} /> Donor Registration</h1>
                    <p>Register as a blood donor and help save lives across India.</p>
                </div>
            </section>

            <section className="section">
                <div className="container dr-grid">
                    <form className="dr-form" onSubmit={handleSubmit} noValidate>
                        <div className="dr-form-section">
                            <h3><User size={18} /> Personal Information</h3>
                            <div className="dr-fields-grid">
                                <div className="form-group">
                                    <label htmlFor="dr-name">Full Name *</label>
                                    <input id="dr-name" type="text" name="fullName" value={formData.fullName} onChange={handleChange} className={errors.fullName ? 'error' : ''} placeholder="Enter your full name" />
                                    {errors.fullName && <span className="field-error">{errors.fullName}</span>}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="dr-email">Email Address *</label>
                                    <input id="dr-email" type="email" name="email" value={formData.email} onChange={handleChange} className={errors.email ? 'error' : ''} placeholder="your@email.com" />
                                    {errors.email && <span className="field-error">{errors.email}</span>}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="dr-phone">Phone Number *</label>
                                    <input id="dr-phone" type="tel" name="phone" value={formData.phone} onChange={handleChange} className={errors.phone ? 'error' : ''} placeholder="10-digit mobile number" />
                                    {errors.phone && <span className="field-error">{errors.phone}</span>}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="dr-dob">Date of Birth *</label>
                                    <input id="dr-dob" type="date" name="dob" value={formData.dob} onChange={handleChange} className={errors.dob ? 'error' : ''} />
                                    {errors.dob && <span className="field-error">{errors.dob}</span>}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="dr-gender">Gender *</label>
                                    <select id="dr-gender" name="gender" value={formData.gender} onChange={handleChange} className={errors.gender ? 'error' : ''}>
                                        <option value="">Select Gender</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="other">Other</option>
                                    </select>
                                    {errors.gender && <span className="field-error">{errors.gender}</span>}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="dr-weight">Weight (kg) *</label>
                                    <input id="dr-weight" type="number" name="weight" value={formData.weight} onChange={handleChange} className={errors.weight ? 'error' : ''} placeholder="Min 45 kg" min="30" max="200" />
                                    {errors.weight && <span className="field-error">{errors.weight}</span>}
                                </div>
                            </div>
                        </div>

                        <div className="dr-form-section">
                            <h3><Droplets size={18} /> Blood & Medical</h3>
                            <div className="dr-fields-grid">
                                <div className="form-group">
                                    <label htmlFor="dr-blood">Blood Group *</label>
                                    <select id="dr-blood" name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} className={errors.bloodGroup ? 'error' : ''}>
                                        <option value="">Select Blood Group</option>
                                        {bloodGroups.map(g => <option key={g} value={g}>{g}</option>)}
                                    </select>
                                    {errors.bloodGroup && <span className="field-error">{errors.bloodGroup}</span>}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="dr-lastdonation">Last Donation Date</label>
                                    <input id="dr-lastdonation" type="date" name="lastDonation" value={formData.lastDonation} onChange={handleChange} />
                                </div>
                                <div className="form-group full-width">
                                    <label htmlFor="dr-medical">Medical Conditions (if any)</label>
                                    <textarea id="dr-medical" name="medicalConditions" value={formData.medicalConditions} onChange={handleChange} rows="3" placeholder="E.g., diabetes, heart disease, recent surgery..."></textarea>
                                </div>
                            </div>
                        </div>

                        <div className="dr-form-section">
                            <h3><MapPin size={18} /> Location</h3>
                            <div className="dr-fields-grid">
                                <div className="form-group">
                                    <label htmlFor="dr-state">State *</label>
                                    <input id="dr-state" type="text" name="state" value={formData.state} onChange={handleChange} className={errors.state ? 'error' : ''} placeholder="Enter your state" />
                                    {errors.state && <span className="field-error">{errors.state}</span>}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="dr-district">District</label>
                                    <input id="dr-district" type="text" name="district" value={formData.district} onChange={handleChange} placeholder="Enter your district" />
                                </div>
                                <div className="form-group full-width">
                                    <label htmlFor="dr-address">Full Address</label>
                                    <textarea id="dr-address" name="address" value={formData.address} onChange={handleChange} rows="2" placeholder="Street, landmark, pin code..."></textarea>
                                </div>
                            </div>
                        </div>

                        <div className="dr-terms">
                            <label className="dr-checkbox-label">
                                <input type="checkbox" name="agreeTerms" checked={formData.agreeTerms} onChange={handleChange} />
                                <span>I confirm that the information provided is accurate and I agree to the <Link to="/terms">Terms of Service</Link> and <Link to="/privacy">Privacy Policy</Link>.</span>
                            </label>
                            {errors.agreeTerms && <span className="field-error">{errors.agreeTerms}</span>}
                        </div>

                        <Button type="submit" variant="primary" className="btn-full-width btn-lg" disabled={submitState === 'submitting'}>
                            {submitState === 'submitting' ? 'Registering...' : <><Heart size={18} /> Register as Donor</>}
                        </Button>
                    </form>

                    <div className="dr-sidebar">
                        <div className="dr-info-card">
                            <ShieldCheck size={28} className="dr-info-icon" />
                            <h4>Your Data is Safe</h4>
                            <p>We follow strict data protection guidelines. Your personal information is encrypted and never shared without consent.</p>
                        </div>
                        <div className="dr-info-card">
                            <Heart size={28} className="dr-info-icon" />
                            <h4>Why Donate?</h4>
                            <ul>
                                <li>1 donation can save up to 3 lives</li>
                                <li>India needs 12M units / year</li>
                                <li>Deficit is ~4M units annually</li>
                                <li>Only 1% of population donates</li>
                            </ul>
                        </div>
                        <div className="dr-info-card">
                            <Calendar size={28} className="dr-info-icon" />
                            <h4>After Registration</h4>
                            <p>You'll be matched with nearby blood centers and notified when your blood group is needed in your area.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default DonorRegistration;
