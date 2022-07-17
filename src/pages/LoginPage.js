import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentUser } from '../features/user';

const LoginPage = () => {
  const emailRef = useRef();
  const passRef = useRef();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const allUsers = useSelector((state) => state.user.value.allUsers);

  const [error, setError] = useState(null);

  function loginUser() {
    const user = {
      email: emailRef.current.value,
      password: passRef.current.value,
    };

    const userExists = allUsers.find((x) => x.email === user.email);

    const userLoggedIn = allUsers.find(
      (x) => x.email === user.email && x.password === user.password
    );
    if (!userExists) return setError('User does not exist');
    if (!userLoggedIn) return setError('Incorrect credentials');

    dispatch(setCurrentUser(userLoggedIn));

    navigate('/profile');
  }

  return (
    <div className="d-flex flex-column">
      {error && <h3 className="text-red">{error}</h3>}
      <input ref={emailRef} type="text" placeholder="email" />
      <input ref={passRef} type="password" placeholder="password" />
      <button onClick={loginUser}>Login</button>
    </div>
  );
};

export default LoginPage;
