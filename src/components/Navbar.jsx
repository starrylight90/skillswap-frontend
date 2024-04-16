import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLoggedInUser } from './context';

const Navbar = () => {
  const { loggedInUser, updateLoggedInUser } = useLoggedInUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear loggedInUser state
    updateLoggedInUser(null);
    // Clear data from sessionStorage
    sessionStorage.removeItem('loggedInUser');
    // Redirect to the login page and prevent navigation back
    navigate('/login', { replace: true });
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.left}>
        <Link to="/home" style={styles.link}>SkillSwap</Link>
      </div>
      <div style={styles.right}>
      <Link to="/home" style={styles.button}>Swipe</Link>
        <Link to="/match" style={{ ...styles.button, marginLeft: '10px' }}>Matched</Link>
        <Link to="/user" style={{ ...styles.button, marginLeft: '10px', marginRight:'10px' }}>Profile</Link>
        <span onClick={handleLogout} style={styles.logout}>Logout</span>
      </div>
    </nav>
  );
};


const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#333',
    color: '#fff',
    padding: '10px 20px',
  },
  left: {
    flex: 1,
  },
  right: {
    display: 'flex',
  },
  link: {
    textDecoration: 'none',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: '1.2rem',
  },
  button: {
    marginLeft: '10px',
    textDecoration: 'none',
    color: '#fff',
  },
  logout: {
    cursor: 'pointer',
    color: '#fff',
  },
};

export default Navbar;