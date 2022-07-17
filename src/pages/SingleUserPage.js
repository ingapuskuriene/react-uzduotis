import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import SingleUser from '../components/SingleUser';
import { deleteUser } from '../features/user';

const SingleUserPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userState = useSelector((state) => state.user.value);
  const getUser = userState.allUsers[id];
  const isAdmin = userState.currentUser.role === 'Admin';
  const isMe = userState.currentUser.email === getUser.email;

  function removeUser() {
    dispatch(deleteUser(getUser.email));
    navigate('/all-users');
  }

  function openConversation() {
    navigate('/conversation/' + id);
  }

  return (
    <div>
      {!isMe && <button onClick={openConversation}>SEND MESSAGE</button>}
      <SingleUser user={getUser} />
      {isAdmin && <button onClick={removeUser}>DELETE USER</button>}
    </div>
  );
};

export default SingleUserPage;
