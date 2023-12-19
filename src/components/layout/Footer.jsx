
import { rgbToHex } from '@mui/material';
import React from 'react';

const Footer = () => {
  return (
    <footer style={{
        textAlign: "center",
        // paddingTop: "3rem",
    }}>
        <br />
        <br />
        <div style={{
            backgroundColor: "rgb(100, 0, 50)",        
            color: "rgb(233, 233, 233)",
            padding: "0.5rem",
        }}>
            <div>Help Center | Privacy Policy | Terms of Service | About Us | Contact Us<a href=""></a></div>
            <div>© 2023 VietLinhTinh</div>
      </div>
    </footer>
  );
};

export default Footer;
