import React from 'react';

const Button = ({ children, ...props }) => (
  <button style={{ background: '#1976d2', color: '#fff', border: 'none', borderRadius: '8px', padding: '10px 24px', fontSize: '16px', cursor: 'pointer', fontWeight: 'bold' }} {...props}>
    {children}
  </button>
);

export default Button;
