import { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updatePhoto, updatePassword } from '../features/user';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const photoRef = useRef();
  const passRef = useRef();
  const userState = useSelector((state) => state.user.value);

  function changePhoto() {
    const email = userState.currentUser.email;
    const imageUrl = photoRef.current.value;

    const userIndex = userState.allUsers.findIndex((x) => x.email === email);

    let userUpdated = { ...userState.currentUser };
    userUpdated.image = imageUrl;

    dispatch(
      updatePhoto({
        index: userIndex,
        current: userUpdated,
      })
    );
  }

  function changePassword() {
    const email = userState.currentUser.email;

    const userIndex = userState.allUsers.findIndex((x) => x.email === email);

    let userUpdated = { ...userState.currentUser };
    userUpdated.password = passRef.current.value;

    dispatch(
      updatePassword({
        index: userIndex,
        current: userUpdated,
      })
    );
  }

  return (
    <div className="d-flex flex-column">
      <img src={userState.currentUser.image} width="200" alt="" />
      <h3>
        {userState.currentUser.email} ({userState.currentUser.role})
      </h3>
      <input ref={photoRef} type="text" placeholder="Profile photo url" />
      <button onClick={changePhoto}>Change photo</button>
      <p>Change password:</p>
      <input ref={passRef} type="password" placeholder="New password" />
      <button onClick={changePassword}>Change password</button>
    </div>
  );
};

export default ProfilePage;
