import { useState } from 'react';
import { TextField, Button, FormControlLabel, Checkbox, Link, Box } from '@mui/material';
import AuthService from '../../services/auth.service';

export default function RegistrationForm({ setRegistrationForm, registrationFormRef }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegistration = (e) => {
    e.preventDefault();
    // assert 
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    AuthService.register(username, email, password)
      .then(() => {
        AuthService.login(username, password)
          .then(() => {
            window.location.reload();
          })
          .catch((error) => {
            console.error('Error logging in:', error);
          });
      })
      .catch((error) => {
        console.error('Error sending review:', error);
      });
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
        width: '260px', // Width of the form
      }}
      ref={registrationFormRef}
    >
      {/* Registration form */}
      <form>
        {/* Username Input */}
        <TextField
          label="Tên đăng nhập"
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
          label="Mật khẩu"
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
          label="Nhập lại mật khẩu"
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
          label="Tôi đồng ý với các điều khoản của VietLinhTinh"
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
            onClick={handleRegistration}
          >
            Đăng ký
          </Button>
        </div>
      </form>
    </Box>
  );
}
