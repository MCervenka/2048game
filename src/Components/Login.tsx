import React from 'react';

interface LoginProps {
  toggle: () => void;
}

export default (props: LoginProps) => {
  return (
    <div>
      <h3>Login</h3>
      <div className="row">
        <input placeholder="email" type="email" className="input" />
        <input placeholder="password" type="password" className="input" />
      </div>
      <div className="button-container">
        <button className="button-black">Login</button>
      </div>
    </div>
  );
};
