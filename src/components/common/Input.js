import React from 'react';

const Input = ({ ...props }) => (
  <input style={{ padding: '10px', fontSize: '16px', borderRadius: '8px', border: '1px solid #ccc', marginBottom: '10px', outline: 'none' }} {...props} />
);

export default Input;
