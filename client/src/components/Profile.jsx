import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Grid,Typography,TextField,Button,CircularProgress,Container} from '@mui/material';

function ProfilePage() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [pincode, setPincode] = useState('');
  const [image, setImage] = useState('');
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8000/user/profile', {
          headers: {
            'token': token,
          },
        });
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleUpdateProfile = async () => {
    try {
      setUpdating(true);
      const token = localStorage.getItem('token');
      const response = await axios.put(
        'http://localhost:8000/user/profile',
        { name, phone, address, pincode, image },
        {
          headers: {
            'token': token,
          },
        }
      );
      setUserData(response.data);
      setName(response.data.name);
      setPhone(response.data.phone);
      setAddress(response.data.address);
      setPincode(response.data.pincode);
      setImage(response.data.image);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile.');
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <Container maxWidth="sm">
        <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
          <CircularProgress />
        </Grid>
      </Container>
    );
  }

  if (!userData) {
    return <div>Error fetching user profile data.</div>;
  }

  return (
    <Container maxWidth="md">
      <Typography variant="h3" gutterBottom>Profile Page</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom>User Information</Typography>
          <Typography variant="body1">Name: {userData.name}</Typography>
          <Typography variant="body1">Email: {userData.email}</Typography>
          <Typography variant="body1">Phone: {userData.phone}</Typography>
          <Typography variant="body1">Address: {userData.address}</Typography>
          <hr />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom>Update Profile</Typography>
          <form onSubmit={(e) => { e.preventDefault(); handleUpdateProfile(); }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Name"
                  variant="outlined"
                  fullWidth
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Phone"
                  variant="outlined"
                  fullWidth
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Address"
                  variant="outlined"
                  fullWidth
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Pincode"
                  variant="outlined"
                  fullWidth
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Image URL"
                  variant="outlined"
                  fullWidth
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={updating}
                >
                  {updating ? <CircularProgress size={24} /> : 'Update Profile'}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ProfilePage;
