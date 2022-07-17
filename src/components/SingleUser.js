const SingleUser = ({ user }) => {
  return (
    <div>
      <img src={user.image} width="200" alt="" />
      <h3>
        {user.email} ({user.role})
      </h3>
    </div>
  );
};

export default SingleUser;
