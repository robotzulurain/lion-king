import React, { useState, useEffect } from 'react';
import { authService } from '../services/authService';

const Login = ({ onLoginSuccess }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    facility: 'Main Hospital'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const facilities = [
    'Main Hospital',
    'Clinic A', 
    'Clinic B',
    'Health Center',
    'Laboratory'
  ];

  useEffect(() => {
    // Add CSS animations to the document head
    const style = document.createElement('style');
    style.textContent = `
      @keyframes float {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        50% { transform: translateY(-20px) rotate(180deg); }
      }
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      .login-input:focus {
        border-color: #4f46e5 !important;
        box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1) !important;
      }
      .login-button:hover:not(:disabled) {
        transform: translateY(-2px);
        box-shadow: 0 10px 25px rgba(79, 70, 229, 0.3);
      }
    `;
    document.head.appendChild(style);

    return () => {
      // Clean up the style element when component unmounts
      document.head.removeChild(style);
    };
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Try real backend first
      const result = await authService.login(
        formData.email,
        formData.password,
        formData.facility
      );

      if (result.success) {
        onLoginSuccess();
      } else {
        // Fallback to demo mode
        localStorage.setItem('token', 'demo-token');
        localStorage.setItem('user', JSON.stringify({
          email: formData.email,
          facility: formData.facility,
          role: formData.facility === 'Laboratory' ? 'lab_technician' : 'data_entry'
        }));
        localStorage.setItem('facility', formData.facility);
        onLoginSuccess();
      }
    } catch (error) {
      // Demo mode fallback
      localStorage.setItem('token', 'demo-token');
      localStorage.setItem('user', JSON.stringify({
        email: formData.email,
        facility: formData.facility,
        role: formData.facility === 'Laboratory' ? 'lab_technician' : 'data_entry'
      }));
      localStorage.setItem('facility', formData.facility);
      onLoginSuccess();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      {/* Animated Background */}
      <div style={styles.background}>
        <div style={{...styles.circle, ...styles.circle1}}></div>
        <div style={{...styles.circle, ...styles.circle2}}></div>
        <div style={{...styles.circle, ...styles.circle3}}></div>
      </div>

      {/* Login Card */}
      <div style={styles.card}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.logo}>
            <div style={styles.logoIcon}>
              <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 15.5c-3.2 0-5.8-2.6-5.8-5.8S8.8 7 12 7s5.8 2.6 5.8 5.8-2.6 5.7-5.8 5.7z"/>
                <path d="M12 15.5c1.7 0 3-1.3 3-3s-1.3-3-3-3-3 1.3-3 3 1.3 3 3 3z"/>
              </svg>
            </div>
            <h1 style={styles.title}>AMR Surveillance System</h1>
          </div>
          <p style={styles.subtitle}>Secure Antimicrobial Resistance Monitoring Platform</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} style={styles.form}>
          {error && (
            <div style={styles.error}>
              <svg style={styles.errorIcon} viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
              </svg>
              {error}
            </div>
          )}

          {/* Facility Selection */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>
              <svg style={styles.inputIcon} viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
              Facility
            </label>
            <select
              name="facility"
              value={formData.facility}
              onChange={handleChange}
              style={styles.select}
              className="login-input"
              required
            >
              {facilities.map(facility => (
                <option key={facility} value={facility}>
                  {facility}
                </option>
              ))}
            </select>
          </div>

          {/* Email Input */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>
              <svg style={styles.inputIcon} viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email address"
              style={styles.input}
              className="login-input"
              required
            />
          </div>

          {/* Password Input */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>
              <svg style={styles.inputIcon} viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM12 17c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
              </svg>
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              style={styles.input}
              className="login-input"
              required
            />
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            disabled={loading}
            style={{
              ...styles.button,
              ...(loading ? styles.buttonLoading : {})
            }}
            className="login-button"
          >
            {loading ? (
              <>
                <svg style={styles.spinner} viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
                  <path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"/>
                </svg>
                Signing In...
              </>
            ) : (
              <>
                <svg style={styles.buttonIcon} viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                  <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
                </svg>
                Access Dashboard
              </>
            )}
          </button>

          {/* Demo Notice */}
          <div style={styles.demoNotice}>
            <div style={styles.demoIcon}>💡</div>
            <div>
              <strong>Demo Mode:</strong> Any email and password will work for testing
            </div>
          </div>
        </form>

        {/* Footer */}
        <div style={styles.footer}>
          <div style={styles.footerText}>
            Master's Project • Antimicrobial Resistance Surveillance
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    position: 'relative',
    overflow: 'hidden',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    padding: '20px'
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 0
  },
  circle: {
    position: 'absolute',
    borderRadius: '50%',
  },
  circle1: {
    top: '10%',
    left: '10%',
    width: '300px',
    height: '300px',
    background: 'rgba(255,255,255,0.1)',
    animation: 'float 6s ease-in-out infinite'
  },
  circle2: {
    top: '60%',
    right: '10%',
    width: '200px',
    height: '200px',
    background: 'rgba(255,255,255,0.05)',
    animation: 'float 8s ease-in-out infinite'
  },
  circle3: {
    bottom: '20%',
    left: '20%',
    width: '150px',
    height: '150px',
    background: 'rgba(255,255,255,0.08)',
    animation: 'float 10s ease-in-out infinite'
  },
  card: {
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(10px)',
    borderRadius: '20px',
    padding: '40px',
    width: '100%',
    maxWidth: '440px',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    zIndex: 1,
    position: 'relative'
  },
  header: {
    textAlign: 'center',
    marginBottom: '32px'
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    marginBottom: '8px'
  },
  logoIcon: {
    color: '#4f46e5',
    background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
    borderRadius: '12px',
    padding: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: '24px',
    fontWeight: '700',
    background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    margin: 0
  },
  subtitle: {
    color: '#6b7280',
    fontSize: '14px',
    margin: 0,
    fontWeight: '500'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  error: {
    background: '#fee2e2',
    border: '1px solid #fecaca',
    color: '#dc2626',
    padding: '12px 16px',
    borderRadius: '12px',
    fontSize: '14px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  errorIcon: {
    color: '#dc2626'
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  label: {
    color: '#374151',
    fontSize: '14px',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  inputIcon: {
    color: '#9ca3af'
  },
  select: {
    padding: '12px 16px',
    border: '2px solid #e5e7eb',
    borderRadius: '12px',
    fontSize: '16px',
    background: 'white',
    transition: 'all 0.2s',
    outline: 'none',
    color: '#374151'
  },
  input: {
    padding: '12px 16px',
    border: '2px solid #e5e7eb',
    borderRadius: '12px',
    fontSize: '16px',
    background: 'white',
    transition: 'all 0.2s',
    outline: 'none',
    color: '#374151'
  },
  button: {
    background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
    color: 'white',
    border: 'none',
    padding: '14px 24px',
    borderRadius: '12px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    marginTop: '8px'
  },
  buttonLoading: {
    opacity: 0.7,
    cursor: 'not-allowed'
  },
  buttonIcon: {
    color: 'white'
  },
  spinner: {
    animation: 'spin 1s linear infinite'
  },
  demoNotice: {
    background: 'linear-gradient(135deg, #fef3c7, #fde68a)',
    border: '1px solid #fcd34d',
    color: '#92400e',
    padding: '12px 16px',
    borderRadius: '12px',
    fontSize: '14px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  demoIcon: {
    fontSize: '16px'
  },
  footer: {
    marginTop: '24px',
    textAlign: 'center',
    paddingTop: '20px',
    borderTop: '1px solid #f3f4f6'
  },
  footerText: {
    color: '#9ca3af',
    fontSize: '12px',
    fontWeight: '500'
  }
};

export default Login;
