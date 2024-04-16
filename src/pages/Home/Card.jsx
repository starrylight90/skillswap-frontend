import React from 'react';

const Card = ({ user }) => {

  const hasPhotos = user.photos && user.photos.length > 0;

  // Display the uploaded photos or random images
  const photoUrls = hasPhotos ? user.photos.map(photo => photo.url) : [];
  const avatarImage = require('../images/img_avatar.png');
  const imagesContext = require.context('../images', false, /\.(png|jpe?g|svg)$/);
  const images = imagesContext.keys().map(imagesContext);
  const skillsString = user.skills.join(', ');
  // Scenario 1: MongoDB has one image link
  if (photoUrls.length === 1) {
    return (
      <div style={styles.card}>
        <div style={styles.carousel}>
          <img src={photoUrls[0]} alt={user.name} style={styles.image} />
          <img src={avatarImage} alt="Avatar" style={styles.image} />
        </div>
        <div style={styles.container}>
        <div style={styles.container}>
        <h4 style={styles.title}><b>{user.name}</b></h4>
        <p><b>Age:</b> {user.age}, <b>Gender:</b> {user.gender}</p>
        <p><b>Skills:</b> <span style={styles.skills}>{skillsString}</span></p>
        <p>{user.description}</p>
      </div>
        </div>
      </div>
    );
  }

  // Scenario 2: MongoDB has no image link
  if (photoUrls.length === 0) {
    const randomImage = images[Math.floor(Math.random() * images.length)];
    return (
      <div style={styles.card}>
        <div style={styles.carousel}>
          <img src={randomImage} alt={user.name} style={styles.image} />
          <img src={avatarImage} alt="Avatar" style={styles.image} />
        </div>
        <div style={styles.container}>
        <div style={styles.container}>
        <h4 style={styles.title}><b>{user.name}</b></h4>
        <p><b>Age:</b> {user.age}, <b>Gender:</b> {user.gender}</p>
        <p><b>Skills:</b> <span style={styles.skills}>{skillsString}</span></p>
        <p>{user.description}</p>
      </div>
        </div>
      </div>
    );
  }

  // Scenario 3: MongoDB has two image links
  if (photoUrls.length === 2) {
    return (
      <div style={styles.card}>
        <div style={styles.carousel}>
          <img src={photoUrls[0]} alt={user.name} style={styles.image} />
          <img src={photoUrls[1]} alt={user.name} style={styles.image} />
        </div>
        <div style={styles.container}>
        <div style={styles.container}>
        <h4 style={styles.title}><b>{user.name}</b></h4>
        <p><b>Age:</b> {user.age}, <b>Gender:</b> {user.gender}</p>
        <p><b>Skills:</b> <span style={styles.skills}>{skillsString}</span></p>
        <p>{user.description}</p>
      </div>
        </div>
      </div>
    );
  }
}



const styles = {
  card: {
    boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
    transition: '0.3s',
    width: '40%',
    margin: 'auto',
    marginTop: '20px',
    overflow: 'hidden',
    background: "white" // Ensure the card doesn't expand based on image size
  },
  carousel: {
    display: 'flex',
    overflowX: 'scroll',
  },
  image: {
    flex: '0 0 auto',
    width: '100%',
    height: '400px', // Set a fixed height for all images
    objectFit: 'cover', // Maintain the aspect ratio and cover the entire space
  },
  container: {
    padding: '2px 16px',
  },
  title: {
    margin: '0',
  },
  skills: {
    fontWeight: 'bold',
  },
};

export default Card;