import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import SingleUser from '../components/SingleUser';

const AllUsersPage = () => {
  const navigate = useNavigate();
  const usersState = useSelector((state) => state.user.value);
  return (
    <div className="d-flex flex-column">
      {usersState.allUsers.map((user, id) => {
        function navigateToUser() {
          navigate('/user/' + id);
        }
        return (
          <button onClick={navigateToUser} key={user.email}>
            <SingleUser id={id} user={user} />
          </button>
        );
      })}
    </div>
  );
};

export default AllUsersPage;
