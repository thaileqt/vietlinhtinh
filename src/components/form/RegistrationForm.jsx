import { useState } from 'react';
import { TextField, Button, FormControlLabel, Checkbox, Link, Box } from '@mui/material';

export default function RegistrationForm({ setRegistrationForm, registrationFormRef }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegistration = (e) => {
    e.preventDefault();
    // Add logic for registration here
    console.log('Username:', username);
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Confirm Password:', confirmPassword);
  };

  return (
    <Box
      className="registration-form"
      sx={{
        position: 'absolute',
        marginTop: '15px',
        top: 'calc(100% + 10px)',
        right: -20,
        backgroundColor: 'rgba(100, 0, 50, 1)', // Transparent background color
        // border: '1px solid #8e005f',
        padding: '10px 20px',
        zIndex: 999,
        borderRadius: '3px',
        color: 'white',
        fontFamily: 'Arial, sans-serif',
        width: '220px', // Width of the form
      }}
      ref={registrationFormRef}
    >
      {/* Registration form */}
      <form onSubmit={handleRegistration}>
        {/* Username Input */}
        <TextField
          label="Username"
          variant="standard"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          sx={{
            backgroundColor: 'transparent', // Transparent background
            borderBottom: '1px solid #fff',
            width: '100%',
            '& .MuiInputLabel-root': {
              color: 'rgba(255, 255, 255, 0.9)', // Slightly darker white
            },
            '& .MuiInputBase-input': {
              color: 'white',
            },
          }}
        />

        {/* Email Input */}
        <TextField
          label="Email"
          type="email"
          variant="standard"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{
            backgroundColor: 'transparent', // Transparent background
            borderBottom: '1px solid #fff',
            width: '100%',
            '& .MuiInputLabel-root': {
              color: 'rgba(255, 255, 255, 0.9)', // Slightly darker white
            },
            '& .MuiInputBase-input': {
              color: 'white',
            },
          }}
        />

        {/* Password Input */}
        <TextField
          label="Password"
          type="password"
          variant="standard"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{
            backgroundColor: 'transparent', // Transparent background
            borderBottom: '1px solid #fff',
            width: '100%',
            '& .MuiInputLabel-root': {
              color: 'rgba(255, 255, 255, 0.9)', // Slightly darker white
            },
            '& .MuiInputBase-input': {
              color: 'white',
            },
          }}
        />

        {/* Confirm Password Input */}
        <TextField
          label="Confirm Password"
          type="password"
          variant="standard"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          sx={{
            backgroundColor: 'transparent', // Transparent background
            borderBottom: '1px solid #fff',
            width: '100%',
            '& .MuiInputLabel-root': {
              color: 'rgba(255, 255, 255, 0.9)', // Slightly darker white
            },
            '& .MuiInputBase-input': {
              color: 'white',
            },
          }}
        />

        {/* Checkbox for Terms */}
        <FormControlLabel
          control={<Checkbox color="primary" />}
          label="I agree to the terms and conditions"
          sx={{ color: 'white', fontSize: '14px', marginBottom: '15px' }}
        />

        {/* Registration Button */}
        <div style={{ //center the button
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: '#8e005f',
              borderRadius: '4px',
              marginTop: '10px',
              color: 'white',
              fontSize: '16px',
              fontWeight: 'bold',
              '&:hover': {
                backgroundColor: '#6e004f',
              },
            }}
          >
            Register
          </Button>
        </div>
      </form>
    </Box>
  );
}
