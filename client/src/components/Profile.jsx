import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Typography, TextField, Button, CircularProgress, Container } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Profile() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [pincode, setPincode] = useState('');
  const [image, setImage] = useState('');
  const [updating, setUpdating] = useState(false);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8000/api/user/profile', {
          headers: {
            'token': token,
          },
        });
        setUserData(response.data);
        setName(response.data.name);
        setPhone(response.data.phone);
        setAddress(response.data.address);
        setPincode(response.data.pincode);
        setImage(response.data.image);
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
        'http://localhost:8000/api/user/profile',
        { name, phone, address, pincode, image },
        {
          headers: {
            'token': token,
          },
        }
      );
      setUserData(response.data);
      toast.success('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile.');
    } finally {
      setUpdating(false);
      setEditMode(false);
    }
  };

  const handleEditClick = () => {
    setEditMode(true);
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
    return <div>Error fetching data.</div>;
  }

  return (
    <Container maxWidth="md" style={{ padding: '20px', marginBottom: '20px', borderRadius: '10px' }}>
      <ToastContainer />
      <Typography variant="h3" align="center" gutterBottom>Profile</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom>User Information</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1" style={{ textAlign: 'left' }}>Name:</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Name"
                variant="outlined"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={!editMode}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1" style={{ textAlign: 'left' }}>Email:</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                value={userData.email}
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1" style={{ textAlign: 'left' }}>Phone:</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Phone"
                variant="outlined"
                fullWidth
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                disabled={!editMode}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1" style={{ textAlign: 'left' }}>Address:</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Address"
                variant="outlined"
                fullWidth
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                disabled={!editMode}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1" style={{ textAlign: 'left' }}>Pincode:</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Pincode"
                variant="outlined"
                fullWidth
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                disabled={!editMode}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1" style={{ textAlign: 'left' }}>Image URL:</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Image URL"
                variant="outlined"
                fullWidth
                value={image}
                onChange={(e) => setImage(e.target.value)}
                disabled={!editMode}
              />
            </Grid>
          </Grid>
          <hr style={{ margin: '10px 0' }} />
        </Grid>
        <Grid item xs={12}>
          {editMode ? (
            <Button
              variant="contained"
              color="primary"
              onClick={handleUpdateProfile}
              disabled={updating}
              startIcon={updating ? <CircularProgress size={20} /> : <EditIcon />}
            >
              {updating ? 'Saving...' : 'Save Changes'}
            </Button>
          ) : (
            <Button
              variant="outlined"
              color="primary"
              onClick={handleEditClick}
              startIcon={<EditIcon />}
            >
              Edit Profile
            </Button>
          )}
        </Grid>
      </Grid>
    </Container>
  );
}

export default Profile;
