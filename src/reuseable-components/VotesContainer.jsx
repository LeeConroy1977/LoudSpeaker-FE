import React, { useContext, useEffect, useState } from "react";
import { TbArrowBigDown, TbArrowBigUp } from "react-icons/tb";
import { UserContext } from "../contexts/UserContext";
import { useModal } from "../contexts/ModalContext";
import SignIn from "../components/SignIn";

const VotesContainer = ({
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
      setVoteStatus(storedVote === "null" ? null : storedVote);
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

    setIsVoting(true);
    const previousVoteCount = voteCount;
    const previousVoteStatus = voteStatus;

    const newVoteCount =
      voteStatus === voteType ? voteCount - voteChange : voteCount + voteChange;
    setVoteCount(newVoteCount);
    setVoteStatus(voteStatus === voteType ? null : voteType);

    try {
      const response = await handleClick(
        voteStatus === voteType ? -voteChange : voteChange
      );
      if (!response || typeof response.votes !== "number") {
        throw new Error("Invalid response from server: missing votes");
      }
      setVoteCount(response.votes);
      setVoteStatus(voteStatus === voteType ? null : voteType);
      if (voteStatus === voteType) {
        localStorage.removeItem(`voteStatus-${entity_id}-${user.username}`);
      } else {
        localStorage.setItem(
          `voteStatus-${entity_id}-${user.username}`,
          voteType
        );
      }
    } catch (error) {
      console.error(`Error ${voteType} voting:`, error);
      setVoteCount(previousVoteCount);
      setVoteStatus(previousVoteStatus);
    } finally {
      setIsVoting(false);
    }
  };

  return (
    <div
      className={`w-[60px] tablet-portrait:w-[68px] tablet:w-[63px] desktop:w-[66px] xl-screen:w-[75px] py-1.5 tablet-portrait:py-2 tablet:py-1.5 flex justify-center items-center rounded-full mobile:gap-0.5 tablet-portrait:gap-1 tablet:gap-1 desktop:gap-0.9 xl-screen:gap-1 bg-[#f3f4f6] dark:bg-secondaryBg`}>
      <TbArrowBigDown
        className={`size-[14px] tablet-portrait:size-[15px] desktop:size-[17px] xl-screen:size-[18px] text-red-500 cursor-pointer ${
          isVoting ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={() => handleVote("down", -1)}
        disabled={isVoting}
      />
      <p className="text-[10px] tablet-portrait:text-[11px] xl-screen:text-[14px] text-[#456990] dark:text-darkTextPrimary font-semibold">
        {voteCount}
      </p>
      <TbArrowBigUp
        className={`size-[14px] tablet-portrait:size-[15px] desktop:size-[17px] xl-screen:size-[18px] text-green-500 cursor-pointer ${
          isVoting ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={() => handleVote("up", 1)}
        disabled={isVoting}
      />
    </div>
  );
};

export default VotesContainer;
