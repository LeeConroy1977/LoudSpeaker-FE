import React, { useContext, useEffect, useState } from "react";
import { TbArrowBigDown, TbArrowBigUp } from "react-icons/tb";
import { UserContext } from "../contexts/UserContext";
import { useModal } from "../contexts/ModalContext";
import SignIn from "../components/SignIn";

const VotesContainer = ({
  votesStyle,
  votesNumStyle,
  votesIconStyle,
  initialVotes,
  handleClick,
  entity_id,
  handleShouldSignIn,
}) => {
  const { user } = useContext(UserContext);
  const { showModal } = useModal();
  const [voteStatus, setVoteStatus] = useState(null);
  const [voteCount, setVoteCount] = useState(initialVotes);
  const [isVoting, setIsVoting] = useState(false); 

  useEffect(() => {
    if (entity_id && user.username) {
      const storedVote = localStorage.getItem(
        `voteStatus-${entity_id}-${user.username}`
      );
      setVoteStatus(storedVote || null);
      setVoteCount(initialVotes);
    } else {
      setVoteStatus(null);
      setVoteCount(initialVotes);
    }
  }, [entity_id, user.username, initialVotes]);

  const handleVote = async (voteType, voteChange) => {
    if (!user.username && handleShouldSignIn) {
      showModal(<SignIn />);
      return;
    }
    if (isVoting) return; 

    if (voteStatus === voteType) {
      setIsVoting(true);
      try {
        const response = await handleClick(voteType === "up" ? -1 : 1); 
        setVoteStatus(null);
        setVoteCount(response.votes);
        localStorage.setItem(
          `voteStatus-${entity_id}-${user.username}`,
          "null"
        );
      } catch (error) {
        console.error(`Error undoing ${voteType} vote:`, error);
      } finally {
        setIsVoting(false);
      }
    } else if (!voteStatus) {
      setIsVoting(true);
      try {
        const response = await handleClick(voteChange);
        setVoteStatus(voteType);
        setVoteCount(response.votes);
        localStorage.setItem(
          `voteStatus-${entity_id}-${user.username}`,
          voteType
        );
      } catch (error) {
        console.error(`Error adding ${voteType} vote:`, error);
      } finally {
        setIsVoting(false);
      }
    }
  };

  return (
    <div className={`${votesStyle} flex items-center rounded-xl`}>
      <TbArrowBigDown
        className={`${votesIconStyle} ${
          voteStatus === "down"
            ? "fill-red-600"
            : isVoting || voteStatus === "up"
            ? "text-gray-400 cursor-not-allowed"
            : "text-black cursor-pointer"
        }`}
        onClick={() => handleVote("down", -1)}
      />
      <p className={`${votesNumStyle}`}>{voteCount}</p>
      <TbArrowBigUp
        className={`${votesIconStyle} ${
          voteStatus === "up"
            ? "fill-green-600"
            : isVoting || voteStatus === "down"
            ? "text-gray-400 cursor-not-allowed"
            : "text-black cursor-pointer"
        }`}
        onClick={() => handleVote("up", 1)}
      />
    </div>
  );
};

export default VotesContainer;
