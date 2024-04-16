import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import withAuthRedirect from '../../components/withAuthRedirect';
import Card from './Card';
import { useLoggedInUser } from '../../components/context'; // Import the context hook
import Navbar from '../../components/Navbar';
import Footer from '../../Footer';



export const Home = () => {
  const [users, setUsers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  // const location = useLocation();
  // const loggedInUser = location.state?.loggedInUser;
  const { loggedInUser } = useLoggedInUser(); // Destructure loggedInUser from context

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        if (loggedInUser && loggedInUser._id) {
          const response = await axios.get('https://skillswap-backend-429j.onrender.com:3011/api/getAllUsers', {
            headers: {
              'Authorization': `Bearer ${loggedInUser.token}`,
            },
          });
          const filteredUsers = response.data.filter(user => user._id !== loggedInUser._id);
          console.log(loggedInUser);
          setUsers(filteredUsers);
        } else {
          console.error('Invalid or undefined loggedInUser');
          navigate('/login');
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, [loggedInUser, navigate]);

  useEffect(() => {
    const fetchActiveUserData = async () => {
      try {
        if (users.length > 0) {
          const activeUserId = users[currentIndex]._id;
          const response = await axios.get(`https://skillswap-backend-429j.onrender.com:3011/api/getAllUsers/${activeUserId}`, {
            headers: {
              'Authorization': `Bearer ${loggedInUser.token}`,
            },
          });
          console.log('Active User Data:', response.data);
        }
      } catch (error) {
        console.error('Error fetching active user data:', error);
      }
    };

    fetchActiveUserData();
  }, [currentIndex, loggedInUser, users]);

  const handleNext = async () => {
    try {
      // Get the swiped user's ID
      const swipedUserId = users[currentIndex]._id;

      // Send a request to the backend to swipe right
      const response = await axios.post(
        `https://skillswap-backend-429j.onrender.com:3011/api/swipeRight/${swipedUserId}`,
        {},
        {
          headers: {
            'Authorization': `Bearer ${loggedInUser.token}`,
          },
        }
      );
        // Check if the chat has been initiated between the users
      if (response.data && response.data.chatInitiated) {
        // Redirect to the chat page with necessary data including the token
        navigate('/match',{ state: { loggedInUser } });
      }
      else {
        // Move to the next user
        setCurrentIndex((prevIndex) => (prevIndex + 1) % users.length);
      }
    } catch (error) {
      console.error('Error swiping right:', error);
    }
  };

  const handlePrevious = async () => {
    try {
      // Get the swiped user's ID
      const swipedUserId = users[currentIndex]._id;
  
      // Send a request to the backend to swipe left
      await axios.post(
        `https://skillswap-backend-429j.onrender.com:3011/api/swipeLeft/${swipedUserId}`,
        {},
        {
          headers: {
            'Authorization': `Bearer ${loggedInUser.token}`,
          },
        }
      );
  
      // Move to the previous user
      setCurrentIndex((prevIndex) => (prevIndex + 1) % users.length);
    } catch (error) {
      console.error('Error swiping left:', error);
    }
  };

  const handleRight = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % users.length);
  };

  const handleLeft = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + users.length) % users.length);
  };
 

  return (  
    <div>
      <Navbar/>
      {users.length > 0 && (
        <Card key={users[currentIndex]._id} user={users[currentIndex]} />
      )}
      <div style={styles.buttonContainer}>
        <button onClick={handlePrevious} style={styles.button}>Left Swipe</button>
        <button onClick={handleLeft} style={styles.button}>Previous</button>
        <button onClick={handleRight} style={styles.button}>Next</button>
        <button onClick={handleNext} style={styles.button}>Right Swipe</button>
      </div>
      <Footer/>
      </div>
  );
};

const styles = {
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '10px',
  },
  
  button: {
    margin: '5px 5px', // Add margin to create space between buttons
  }
};

export default withAuthRedirect(Home);
