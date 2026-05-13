import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Extract token from URL: http://localhost:5173/login-success?token=...
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');

    if (token) {
      // 1. Save the token so ProtectedRoute allows access
      localStorage.setItem('token', token);
      
      // 2. Navigate to your root dashboard route ('/') to match App.jsx
      navigate('/'); 
    } else {
      // 3. If no token, go back to the login page ('/login')
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh' 
    }}>
      <h2>Authenticating...</h2>
      <p>Redirecting you to your dashboard.</p>
    </div>
  );
};

export default LoginSuccess;