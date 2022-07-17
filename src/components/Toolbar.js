import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentUser } from '../features/user';

const Toolbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user.value.currentUser);
  const conversationsState = useSelector(
    (state) => state.conversations.value.conversations
  );
  const conversations =
    currentUser &&
    conversationsState.filter((x) => x.users.includes(currentUser.email));
  function logout() {
    dispatch(setCurrentUser(null));
    navigate('/');
  }

  return (
    <div className="toolbar d-flex space-btw">
      <div></div>

      {!currentUser ? (
        <div>
          <Link to="/">Login</Link>
          <Link to="/register">Register</Link>
        </div>
      ) : (
        <div>
          <Link to="/profile">Profile</Link>
          <Link to="/all-users">All users</Link>
          <Link to="/conversations">
            Conversations{' '}
            {conversations && <strong>({conversations.length})</strong>}
          </Link>
          <button onClick={logout}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default Toolbar;
