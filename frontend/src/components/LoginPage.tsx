import React, { useState, FormEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import VerificationCodePage from './VerificationCodePage';
import Footer from './Footer';
import './LoginPage.css';

interface User {
    id: number;
    email: string;
    role: string;
    first_name: string;
}

const BACKGROUND_IMAGE = '/login/login_background.jpg';
const BOAT_IMAGE = '/login/boat.jpg';
const LOGO = '/login/Regal_logo.png';

const MailIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="16" x="2" y="4" rx="2"></rect>
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
    </svg>
);

const LockIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
    </svg>
);

const LoginPage: React.FC = () => {
    const { login, isAuthenticated, user } = useAuth();
    const navigate = useNavigate();

    const [loginStep, setLoginStep] = useState<'login' | 'verify_2fa'>('login');
    const [tempToken, setTempToken] = useState<string>('');
    const [userEmailFor2FA, setUserEmailFor2FA] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        if (isAuthenticated && user) {
            switch (user.role) {
                case 'admin':
                    navigate('/admin/dashboard');
                    break;
                case 'advisor':
                    navigate('/advisor/dashboard');
                    break;
                case 'client':
                    navigate('/client/fact-finder');
                    break;
                default:
                    navigate('/');
            }
        }
    }, [isAuthenticated, user, navigate]);

    const handleLoginSuccess = (finalToken: string, user: User) => {
        login(finalToken, user);
    };

    const handleLoginSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'An error occurred.');
            }

            if (data.requires_2fa) {
                setUserEmailFor2FA(data.email);
                setTempToken(data.temp_token);
                setLoginStep('verify_2fa');
            } else {
                handleLoginSuccess(data.token, data.user);
            }
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const renderLoginForm = () => (
        <div className="right-form-box">
            <div className="logo-box">
                <img src={LOGO} alt="Regal Wealth Advisors Logo" className="logo-pic" />
            </div>
            <h2 className="form-main-heading">Good Evening</h2>
            <p className="form-small-heading">Welcome Back!</p>
            {error && <p className="error-text">{error}</p>}
            <form onSubmit={handleLoginSubmit} className="form-login">
                <div className="box-input">
                    <span className="input-icon-box"><MailIcon /></span>
                    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="box-input">
                    <span className="input-icon-box"><LockIcon /></span>
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="submit" disabled={isLoading} className="btn-login">
                    {isLoading ? 'Logging In...' : 'Log In'}
                </button>
            </form>
        </div>
    );

    return (
        <div className="page-login">
            <div className="bg-blur" style={{ backgroundImage: `url(${BACKGROUND_IMAGE})` }}></div>
            <div className="box-login">
                <div className="left-image-box">
                    <img src={BOAT_IMAGE} alt="Yacht in a city harbor" className="left-image" />
                    <div className="text-on-image">
                        <div className="small-text-box">
                            <p className="small-heading">Trusted Guidance for Life's Big Moments</p>
                        </div>
                        <div className="big-text-box">
                            <h1 className="big-heading">Plan the Life You Deserve</h1>
                            <p>From retirement to rebuilding after divorce, we help you craft a secure and confident financial future, one step at a time.</p>
                        </div>
                    </div>
                </div>
                {loginStep === 'login' ? (
                    renderLoginForm()
                ) : (
                    <div className="right-form-box">
                        <VerificationCodePage
                            email={userEmailFor2FA}
                            tempToken={tempToken}
                            onVerificationSuccess={handleLoginSuccess}
                        />
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default LoginPage;
