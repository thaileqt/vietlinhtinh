import { useState } from 'react';
import { TextField, Button, FormControlLabel, Checkbox, Link, Box, FormGroup } from '@mui/material';
import AuthService from '../../services/auth.service';


export default function LoginForm({ setShowLoginForm, loginFormRef }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    AuthService.login(username, password)
        .then((response) => {
            console.log(response.data);
            // reload the page
            window.location.reload();
        })
        .catch((error) => {
            console.error('Error logging in:', error);
        });
    setShowLoginForm(false);
  };

  return (
    <Box
      className="login-form"
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
        width: '220px', // Reduced width
      }}
      ref={loginFormRef}
    >
     

      {/* Login form */}
      <FormGroup onSubmit={handleLogin}>
        {/* Username Input */}
        <TextField
          label="Tên đăng nhập"
          variant="standard"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          sx={{
            backgroundColor: 'transparent',
            borderBottom: '1px solid #fff',
            width: '100%',
            '& .MuiInputLabel-root': {
              color: 'rgba(255, 255, 255, 0.9)', 
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

        {/* Checkbox and Forgot Password */}
        <FormControlLabel
          control={
            <Checkbox
              value="remember"
              color="primary"
            />
          }
          label="Nhớ tài khoản"
          sx={{ color: 'rgb(233, 233, 233)', fontSize: '14px' }}
        />



        <Link href="#" variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '14px', textDecoration: 'none'}}>
            Quên mật khẩu?
        </Link>

        {/* Login Button */}
        <div style={{ //center the button
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
          <Button
            type="submit"
            variant="contained"
            sx={{
                // width: '100%',
                backgroundColor: '#8e005f',
                borderRadius: '4px',
                // padding: '12px',
                marginTop: '10px',
                color: 'white',
                fontSize: '16px',
                fontWeight: 'bold',
                '&:hover': {
                backgroundColor: '#6e004f',
                },
            }}
            onClick={handleLogin}
          >
            Đăng nhập
          </Button>
        </div>
      </FormGroup>
    </Box>
  );
}
