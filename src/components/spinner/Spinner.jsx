import React from "react";
import SpinnerImg from "../../assets/img/spinner.gif";

const Spinner = () => {
  return (
    <div>
      <img
        src={SpinnerImg}
        alt=""
        className="d-block m-auto"
        style={{ width: "200px" }}
      />
    </div>
  );
};

export default Spinner;
