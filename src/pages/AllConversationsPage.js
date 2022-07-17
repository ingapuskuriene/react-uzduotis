import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import SingleUser from '../components/SingleUser';

const AllConversationsPage = () => {
  const navigate = useNavigate();
  const usersState = useSelector((state) => state.user.value);
  const conversationsState = useSelector(
    (state) => state.conversations.value.conversations
  );
  const conversations = conversationsState.filter((x) =>
    x.users.includes(usersState.currentUser.email)
  );
  return (
    <div className="d-flex flex-column">
      {conversations.map((conversation) => {
        const otherUserIndex = usersState.allUsers.findIndex((x) =>
          conversation.users.includes(x.email)
        );

        const otherUser = usersState.allUsers[otherUserIndex];
        function navigateToConversation() {
          navigate('/conversation/' + conversation.id);
        }
        return (
          <div key={otherUser.email}>
            <SingleUser user={otherUser} />
            <button onClick={navigateToConversation}>SEE MESSAGES</button>
          </div>
        );
      })}
    </div>
  );
};

export default AllConversationsPage;
