import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLoggedInUser } from '../../components/context'; // Import the context hook
import withAuthRedirect from '../../components/withAuthRedirect';
import Navbar from '../../components/Navbar';
import Footer from '../../Footer';

const Match = () => {
  const { loggedInUser } = useLoggedInUser(); // Destructure loggedInUser from context
  const [chattedUsers, setChattedUsers] = useState([]);

  useEffect(() => {
    const fetchChattedUsers = async () => {
      try {
        if (!loggedInUser || !loggedInUser._id) return;

        const response = await axios.get(`https://skillswap-backend-429j.onrender.com:3011/api/getUsersInChat/${loggedInUser._id}`, {
          headers: {
            'Authorization': `Bearer ${loggedInUser.token}`,
          },
        });

        console.log('Fetched chatted users:', response.data); // Log the fetched data
        setChattedUsers(response.data);
      } catch (error) {
        console.error('Error fetching chatted users:', error);
      }
    };

    fetchChattedUsers();
  }, [loggedInUser]);

  return (
    <div className="match-page">
    <Navbar />
    <h2 style={{ color: 'white' }}>People you have Matched With</h2>
    <ul>
      {chattedUsers.map((user) => (
        <li key={user._id} style={{ color: 'white' }}>
          {user.name}
          {user.linkedin && (
            <span>
              &nbsp;|&nbsp;
              <a href={user.linkedin} target="_blank" rel="noopener noreferrer" style={{ color: 'white' }}>LinkedIn</a>
            </span>
          )}
        </li>
      ))}
    </ul>
    <Footer />
  </div>
  );
};

export default withAuthRedirect(Match);
