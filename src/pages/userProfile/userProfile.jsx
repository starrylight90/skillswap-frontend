import React from 'react';
import { useLoggedInUser } from '../../components/context'; // Import the context hook
import "./userProfile.css";
import Navbar from '../../components/Navbar';
import Footer from '../../Footer';
import withAuthRedirect from '../../components/withAuthRedirect';

const UserProfile = () => {
  const { loggedInUser } = useLoggedInUser(); // Destructure loggedInUser from context

  // Function to render each key-value pair, excluding 'token' and '_id'
  const renderUserDetails = () => {
    if (!loggedInUser) return null; // If loggedInUser is not available, return null

    // Array of fields to exclude
    const excludeFields = ['token', '_id'];
    console.log(loggedInUser.photos[0]);
    return (
      <div className="user-card">
        <div className="user-details-container">
          <div className="user-photo-container">
            {loggedInUser.photos.map((photo) => (
              <img
                key={photo._id}
                src={photo.url}
                alt="User Photo"
                className="user-photo"
              />
            ))}
          </div>
          <div className="user-info-container">
            {Object.keys(loggedInUser).map((key) => {
              // Check if the current key is not in the excludeFields array and the value is not an object
              if (!excludeFields.includes(key) && typeof loggedInUser[key] !== 'object') {
                // If the key is 'linkedin', render it as a clickable link
                if (key === 'linkedin') {
                  return (
                    <div key={key} className="user-info-item">
                      <strong>{key}:</strong> <a href={loggedInUser[key]} target="_blank" rel="noopener noreferrer">{loggedInUser[key]}</a>
                    </div>
                  );
                }
                // Otherwise, render the key-value pair
                return (
                  <div key={key} className="user-info-item">
                    <strong>{key}:</strong> {loggedInUser[key]}
                  </div>
                );
              }
              return null; // Exclude the field from rendering
            })}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <Navbar/>
      {renderUserDetails()}
      <Footer />
    </div>
  );
};

export default withAuthRedirect(UserProfile);
