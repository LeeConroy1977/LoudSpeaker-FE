import React, { useContext, useEffect, useState } from "react";
import { TbArrowBigDown } from "react-icons/tb";
import { TbArrowBigUp } from "react-icons/tb";
import { useParams } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { useModal } from "../contexts/ModalContext";
import SignIn from "../components/SignIn";

const VotesContainer = ({
  votesStyle,
  votesNumStyle,
  votesIconStyle,
  initialVotes,
  handleClick,
  handleId,
  article,
  handleShouldSignIn,
}) => {
  const { user } = useContext(UserContext);
  const { showModal } = useModal();
  const [voteStatus, setVoteStatus] = useState(null);
  const [voteCount, setVoteCount] = useState(initialVotes);
  const [shouldSignIn, setShouldSignIn] = useState(handleShouldSignIn);
  const article_id = article?.article_id;

  useEffect(() => {
    if (article_id) {
      const storedVote = localStorage.getItem(`voteStatus-${article_id}`);
      if (storedVote) {
        setVoteStatus(storedVote);
      }
    }
  }, [article_id]);

  useEffect(() => {
    setVoteCount(initialVotes);
  }, [initialVotes]);

  const handleUpVote = () => {
    if (!user.username && shouldSignIn) {
      showModal(<SignIn />);
      return;
    }
    if (voteStatus === "up") {
      setVoteStatus(null);
      handleClick(-1);
      setVoteCount(voteCount - 1);
      localStorage.setItem(`voteStatus-${article_id}`, "null");
    } else if (voteStatus === "down") {
      setVoteStatus("up");
      handleClick(2);
      setVoteCount(voteCount + 2);
      localStorage.setItem(`voteStatus-${article_id}`, "up");
    } else {
      setVoteStatus("up");
      handleClick(1);
      setVoteCount(voteCount + 1);
      localStorage.setItem(`voteStatus-${article_id}`, "up");
    }
  };

  const handleDownVote = () => {
    if (!user.username && shouldSignIn) {
      showModal(<SignIn />);
      return;
    }

    if (voteStatus === "down") {
      setVoteStatus(null);
      handleClick(1);
      setVoteCount(voteCount + 1);
      localStorage.setItem(`voteStatus-${article_id}`, "null");
    } else if (voteStatus === "up") {
      setVoteStatus("down");
      handleClick(-2);
      setVoteCount(voteCount - 2);
      localStorage.setItem(`voteStatus-${article_id}`, "down");
    } else {
      setVoteStatus("down");
      handleClick(-1);
      setVoteCount(voteCount - 1);
      localStorage.setItem(`voteStatus-${article_id}`, "down");
    }
  };

  return (
    <div
      className={`${votesStyle} flex items-center  rounded-xl`}
      onClick={handleId}
    >
      <span>
        <TbArrowBigDown
          className={`${votesIconStyle} font-bold text-black fill-red-600`}
          onClick={() => {
            handleDownVote();
            handleId();
          }}
        />
      </span>
      <p className={`${votesNumStyle}  `}>{initialVotes}</p>
      <span>
        <TbArrowBigUp
          className={`${votesIconStyle}  font-bold text-black fill-green-600`}
          onClick={() => {
            handleUpVote();
            handleId();
          }}
        />
      </span>
    </div>
  );
};

export default VotesContainer;
