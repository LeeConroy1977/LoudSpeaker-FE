import React from "react";
import { TbArrowBigDown } from "react-icons/tb";
import { TbArrowBigUp } from "react-icons/tb";

const VotesContainer = ({
  votesStyle,
  votesNumStyle,
  votesIconStyle,
  votes,
}) => {
  return (
    <div className={`${votesStyle} flex items-center  rounded-xl`}>
      <span>
        <TbArrowBigDown
          className={`${votesIconStyle} font-bold text-black fill-red-600`}
        />
      </span>
      <p className={`${votesNumStyle}  `}>{votes ? votes : "621"}</p>
      <span>
        <TbArrowBigUp
          className={`${votesIconStyle}  font-bold text-black fill-green-600`}
        />
      </span>
    </div>
  );
};

export default VotesContainer;
