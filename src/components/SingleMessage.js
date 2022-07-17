const SingleMessage = ({ image, sender, alignRight, text }) => {
  return (
    <div className={alignRight ? 'd-flex justify-end' : ''}>
      <div className="d-flex flex-column">
        <div className="d-flex">
          <div className="d-flex message-sender">
            <img src={image} height={20} alt="" />
            &nbsp;
            {sender}
          </div>
        </div>
        <p>{text}</p>
      </div>
    </div>
  );
};

export default SingleMessage;
