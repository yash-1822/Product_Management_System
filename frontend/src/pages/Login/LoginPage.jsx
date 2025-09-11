import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, User, Lock, Shield, AlertCircle } from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';
import styles from './LoginPage.module.css';
import { useModal } from '../../Context/ModalContext';

const LoginPage = () => {
  const {verifyToken} = useModal();
  const navigate = useNavigate();

  useEffect(() => {
    const verify = async () => {
      const valid = await verifyToken();
      if (valid) {
        navigate('/products');
      }
    };
    verify();
  }, [verifyToken, navigate]);


  const [formData, setFormData] = useState({
    username: 'admin',
    password: 'password'
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:8000/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user: formData.username,
          password: formData.password
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Store token and user info
      localStorage.setItem('authToken', data.token);

      toast.success(data.message || 'Login successful');
      navigate('/products');
    } catch (error) {
      console.error("Login error:", error);
      setErrors({ general: error.message });
      toast.error(error.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={styles.loginContainer}>
      <ToastContainer />
      <div className={styles.backgroundOverlay}></div>
      
      <div className={styles.loginCard}>
        <div className={styles.logoContainer}>
          <div className={styles.logo}>
            <Shield size={24} strokeWidth={1.5} />
          </div>
          <h1 className={styles.title}>Welcome Back</h1>
          <p className={styles.subtitle}>Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.loginForm}>
          {errors.general && (
            <div className={styles.errorMessage}>
              <AlertCircle size={16} />
              {errors.general}
            </div>
          )}

          <div className={styles.inputGroup}>
            <div className={styles.inputWrapper}>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className={`${styles.input} ${errors.username ? styles.inputError : ''}`}
                placeholder=" "
                autoComplete="username"
              />
              <label htmlFor="username" className={styles.label}>
                Username
              </label>
              <div className={styles.inputIcon}>
                <User size={18} strokeWidth={1.5} />
              </div>
            </div>
            {errors.username && (
              <span className={styles.fieldError}>
                <AlertCircle size={14} />
                {errors.username}
              </span>
            )}
          </div>

          <div className={styles.inputGroup}>
            <div className={styles.inputWrapper}>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className={`${styles.input} ${errors.password ? styles.inputError : ''}`}
                placeholder=" "
                autoComplete="current-password"
              />
              <label htmlFor="password" className={styles.label}>
                Password
              </label>
              <div className={styles.inputIcon}>
                <Lock size={18} strokeWidth={1.5} />
              </div>
              <button
                type="button"
                className={styles.passwordToggle}
                onClick={togglePasswordVisibility}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={18} strokeWidth={1.5} /> : <Eye size={18} strokeWidth={1.5} />}
              </button>
            </div>
            {errors.password && (
              <span className={styles.fieldError}>
                <AlertCircle size={14} />
                {errors.password}
              </span>
            )}
          </div>

          <button
            type="submit"
            className={styles.loginButton}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className={styles.spinner}></div>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        <div className={styles.credentialsInfo}>
          <div className={styles.credentialsHeader}>Credentials</div>
          <div className={styles.credentialsContent}>
            <span><strong>Username:</strong> admin</span>
            <span><strong>Password:</strong> password</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
