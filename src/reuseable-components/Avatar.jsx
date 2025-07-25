
const Avatar = ({ avatarStyle, avatarURL, handleClick }) => {
  return (
    <img src={avatarURL} className={`${avatarStyle}`} onClick={handleClick} />
  );
};

export default Avatar;
