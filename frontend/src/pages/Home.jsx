
import { useState } from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import Register from './Register';
import { api, handleApiError } from '../utils/api';
import './Home.css';

function Home({ onLogin }) {
  const [showForm, setShowForm] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = await api.login({ email, password });
      onLogin(data.data.user, data.data.token);
    } catch (err) {
      handleApiError(err, setError);
    } finally {
      setLoading(false);
    }
  };

  const openForm = (register = false) => {
    setShowForm(true);
    setShowRegister(register);
    setEmail('');
    setPassword('');
    setError('');
  };

  return (
    <div className="lf-page">
      <header className="lf-navbar">
        <a href="/" className="lf-brand">
          <span className="lf-brand-icon">L</span>
          <span>LendFlow</span>
        </a>

        <nav className="lf-nav-actions">
          <button className="lf-login-nav" onClick={() => openForm(false)}>
            Sign In
          </button>
          <button className="lf-primary-btn lf-nav-cta" onClick={() => openForm(true)}>
            Get Started
          </button>
        </nav>
      </header>

      <main className="lf-main">
        <section className="lf-hero">
          <div className="lf-hero-copy">
            <span className="lf-eyebrow">
              SMARTER LOAN MANAGEMENT
            </span>

            <h1>
              Your financial journey,
              <span> made simpler.</span>
            </h1>

            <p className="lf-description">
              Manage loan applications, track repayments and streamline
              recovery operations through one simple, secure platform.
            </p>

            <div className="lf-features">
              <div>
                <span className="lf-feature-check">✓</span>
                Simplified loan management
              </div>
              <div>
                <span className="lf-feature-check">✓</span>
                Transparent EMI tracking
              </div>
              <div>
                <span className="lf-feature-check">✓</span>
                Organized recovery workflows
              </div>
            </div>

            <div className="lf-hero-actions">
              <button className="lf-primary-btn" onClick={() => openForm(true)}>
                Create an Account <span>→</span>
              </button>
              <button className="lf-secondary-btn" onClick={() => openForm(false)}>
                Sign In
              </button>
            </div>

            <div className="lf-trust-note">
              Secure access · Role-based workflows · Simple experience
            </div>
          </div>

          <div className="lf-hero-visual">
            <div className="lf-visual-glow" />
            <div className="lf-animation-card">
              <DotLottieReact
                src="https://lottie.host/78c055e7-95cd-4efd-947b-8e774940ab1b/ESmbq1TYQD.lottie"
                loop
                autoplay
                style={{ width: '100%', maxWidth: '540px' }}
              />
            </div>
            <div className="lf-floating-card">
              <span className="lf-floating-icon">↗</span>
              <div>
                <strong>Everything in one place</strong>
                <small>Loans · Payments · Recovery</small>
              </div>
            </div>
          </div>
        </section>

        {showForm && (
          <div className="lf-modal-overlay" onClick={() => setShowForm(false)}>
            <section
              className="lf-auth-card"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="lf-close-btn"
                onClick={() => setShowForm(false)}
                aria-label="Close"
              >
                ×
              </button>

              {showRegister ? (
                <Register
                  onRegister={() => {
                    setShowForm(false);
                    setShowRegister(false);
                  }}
                  onLogin={onLogin}
                />
              ) : (
                <>
                  <div className="lf-auth-heading">
                    <span className="lf-auth-mark">L</span>
                    <h2>Welcome back</h2>
                    <p>Sign in to continue to your LendFlow account.</p>
                  </div>

                  <form onSubmit={handleLogin} className="lf-form">
                    <label htmlFor="lf-email">Email address</label>
                    <input
                      id="lf-email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      disabled={loading}
                    />

                    <label htmlFor="lf-password">Password</label>
                    <input
                      id="lf-password"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      disabled={loading}
                    />

                    {error && <div className="lf-error">{error}</div>}

                    <button
                      className="lf-primary-btn lf-submit-btn"
                      type="submit"
                      disabled={loading}
                    >
                      {loading ? 'Signing in...' : 'Sign In to LendFlow'}
                    </button>
                  </form>

                  <div className="lf-auth-footer">
                    Don't have an account?
                    <button onClick={() => openForm(true)}>
                      Create Account
                    </button>
                  </div>
                </>
              )}
            </section>
          </div>
        )}
      </main>

      <footer className="lf-footer">
        <span>© {new Date().getFullYear()} LendFlow</span>
        <span>Smarter lending. Simpler management.</span>
      </footer>
    </div>
  );
}

export default Home;
