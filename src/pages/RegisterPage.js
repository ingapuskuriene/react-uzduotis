import { useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addUser } from '../features/user';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const emailRef = useRef(null);
  const passOneRef = useRef(null);
  const passTwoRef = useRef(null);
  const roleRef = useRef(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userState = useSelector((state) => state.user.value);
  const userExists =
    emailRef.current &&
    userState.allUsers.findIndex((x) => x.email === emailRef.current.value);

  const [error, setError] = useState(null);

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const validPasswordFormat = (password) => {
    return String(password).match(
      /^(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[!@#$%^&*_+]).{4,20}$/
    );
  };

  function registerUser() {
    let invalid = false;

    const user = {
      email: emailRef.current.value,
      passOne: passOneRef.current.value,
      passTwo: passTwoRef.current.value,
      role: roleRef.current.value,
    };

    if (!validateEmail(user.email)) invalid = 'Incorrect email format';
    if (userExists === true) invalid = 'Email already registered';
    if (!validPasswordFormat(user.passOne))
      invalid = 'Incorrect password format';
    if (user.passOne !== user.passTwo) invalid = 'Passwords do not match';
    if (invalid) return setError(invalid);

    dispatch(addUser(user));
    navigate('/');
  }

  return (
    <div className="d-flex flex-column">
      {error && <h3 className="text-red">{error}</h3>}
      <p>Username:</p>
      <input ref={emailRef} type="text" placeholder="Email" />
      <p>Password:</p>
      <input ref={passOneRef} type="password" placeholder="Password" />
      <input ref={passTwoRef} type="password" placeholder="Repeat password" />
      <p>Role:</p>
      <select ref={roleRef}>
        <option value="regular">Regular</option>
        <option value="Admin">Admin</option>
      </select>
      <button onClick={registerUser}>Register</button>
    </div>
  );
};

export default RegisterPage;
