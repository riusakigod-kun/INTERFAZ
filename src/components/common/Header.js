import React from 'react';

const Header = ({ title }) => (
  <header style={{ background: '#222', color: '#fff', padding: '16px', fontSize: '24px', fontWeight: 'bold' }}>
    {title}
  </header>
);

export default Header;
