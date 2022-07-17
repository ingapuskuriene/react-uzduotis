import { useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  addMessage,
  blockUser,
  deleteConversation,
} from '../features/conversations';
import SingleMessage from '../components/SingleMessage';

const SingleConversationPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const messageRef = useRef();

  const userState = useSelector((state) => state.user.value);
  const conversationsState = useSelector(
    (state) => state.conversations.value.conversations
  );
  const getReceiver = userState.allUsers[id];

  const conversation = conversationsState.find((x) => x.id == id);

  function removeConversation() {
    dispatch(deleteConversation(id));
    navigate('/conversations');
  }
  function blockTheUser() {
    dispatch(blockUser({ id, blockedBy: getReceiver.email }));
  }

  function sendMessage() {
    const text = messageRef.current.value;
    if (text.length > 0) {
      dispatch(
        addMessage({
          sender: userState.currentUser.email,
          receiver: getReceiver.email,
          id,
          text,
        })
      );
    }
  }

  return (
    <div className="d-flex flex-column">
      {conversation &&
        conversation.blockedBy &&
        getReceiver.email === userState.currentUser.email && (
          <h3 className="text-red">
            You are blocked by {conversation.blockedBy}
          </h3>
        )}
      {conversation &&
        conversation.messages.map((message) => {
          const sender = userState.allUsers.find(
            (x) => x.email === message.sender
          );
          return (
            <SingleMessage
              key={message.text}
              text={message.text}
              sender={sender.email}
              image={sender.image}
              alignRight={userState.currentUser.email === sender.email}
            />
          );
        })}
      {conversation && conversation.blockedBy ? (
        <h3 className="text-red">Receiver is blocked.</h3>
      ) : (
        <div className="d-flex space-btw">
          <textarea className="grow1 mr-10" ref={messageRef}></textarea>
          <button onClick={sendMessage}>SEND</button>
        </div>
      )}
      <p></p>
      <button onClick={removeConversation}>DELETE CONVERSATION</button>
      <button onClick={blockTheUser}>BLOCK USER</button>
    </div>
  );
};

export default SingleConversationPage;
