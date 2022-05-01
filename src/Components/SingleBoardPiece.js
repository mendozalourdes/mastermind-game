import React from "react";

const SingleBoardPiece = () => {
  let circles = [1, 2, 3, 4];
  let allCircles = circles.map((circle, i) => {
    return (
      <div key={i} className={"one-row circle" + " " + circle}>
        {" "}
      </div>
    );
  });

  return <div className="rows">{allCircles}</div>;
};

export default SingleBoardPiece;
