// src/components/Footer.jsx
import React, { useState } from 'react';
import Icon from './Icon';
import Modal from './Modal';
import PrivacyPolicy from './PrivacyPolicy';
import TermsOfService from './TermsOfService';
import './Layout.css';

const CONTACT_EMAIL = 'abhayraj3051@gmail.com';
const CONTACT_PHONE = '+91 907-690-6408';
const CONTACT_PHONE_HREF = 'tel:+919076906408';

const Footer = () => {
    const [openModal, setOpenModal] = useState(null);
    const close = () => setOpenModal(null);

    return (
        <footer className="app-footer">
            <div className="app-footer-inner">
                <div className="app-footer-brand">
                    <span className="app-brand-mark app-brand-mark--sm">
                        <Icon name="logo" size={16} strokeWidth={2.2} />
                    </span>
                    <span>&copy; {new Date().getFullYear()} Smart Resume Builder</span>
                </div>

                <nav className="app-footer-links" aria-label="Footer">
                    <button type="button" onClick={() => setOpenModal('privacy')}>Privacy</button>
                    <button type="button" onClick={() => setOpenModal('terms')}>Terms</button>
                    <button type="button" onClick={() => setOpenModal('contact')}>Contact</button>
                </nav>

                <div className="app-footer-contact">
                    <a href={`mailto:${CONTACT_EMAIL}`}>
                        <Icon name="mail" size={15} />
                        {CONTACT_EMAIL}
                    </a>
                    <a href={CONTACT_PHONE_HREF}>
                        <Icon name="phone" size={15} />
                        {CONTACT_PHONE}
                    </a>
                </div>
            </div>

            {openModal === 'privacy' && <PrivacyPolicy onClose={close} />}
            {openModal === 'terms' && <TermsOfService onClose={close} />}
            {openModal === 'contact' && (
                <Modal title="Contact us" onClose={close} size="sm">
                    <div className="contact-grid">
                        <a className="contact-tile" href={`mailto:${CONTACT_EMAIL}`}>
                            <span className="contact-tile-icon"><Icon name="mail" size={18} /></span>
                            <span>
                                <strong>Email</strong>
                                <span>{CONTACT_EMAIL}</span>
                            </span>
                        </a>
                        <a className="contact-tile" href={CONTACT_PHONE_HREF}>
                            <span className="contact-tile-icon"><Icon name="phone" size={18} /></span>
                            <span>
                                <strong>Phone</strong>
                                <span>{CONTACT_PHONE}</span>
                            </span>
                        </a>
                        <div className="contact-tile">
                            <span className="contact-tile-icon"><Icon name="clock" size={18} /></span>
                            <span>
                                <strong>Working hours</strong>
                                <span>Monday – Friday, 9:00 AM – 6:00 PM (IST)</span>
                            </span>
                        </div>
                    </div>
                </Modal>
            )}
        </footer>
    );
};

export default Footer;
