import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { authenticate } from '../../app/store';

/**
  The AuthForm component can be used for Login or Sign Up.
  Props for Login: name="login", displayName="Login"
  Props for Sign up: name="signup", displayName="Sign Up"
**/

const SignUp = ({ name, displayName }) => {
  const { error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const formName = evt.target.name;
    const username = evt.target.username.value;
    const password = evt.target.password.value;
    const email = evt.target.email.value;
    const address = evt.target.address.value;
    dispatch(authenticate({ username, password, email, address, method: formName }));
  };

  return (
    <div>
    <form className="Login" onSubmit={handleSubmit} name={name}>
      <div>
        <label htmlFor="username">
          <small>Username</small>
        </label>
        <input name="username" type="text" required/>
      </div>
      <div>
        <label htmlFor="password">
          <small>Password</small>
        </label>
        <input name="password" type="password" required/>
      </div>
      <div>
        <label htmlFor="email">
          <small>Email</small>
        </label>
        <input name="email" type="email" required/>
      </div>
      <div>
        <label htmlFor="address">
          <small>Address</small>
        </label>
        <input name="address" type="text" required/>
      </div>
      <div>
        <button type="submit">{displayName}</button>
      </div>
      {error && <div>{error}</div>}
    </form>
</div>
  );
};

export default SignUp;