import React from "react";
import Button from "./../Forms/Button";

const LoadMore = ({ onLoadMoreEvent = () => {} }) => {
  return (
    <div onClick={() => onLoadMoreEvent()} className='loadMore'>
      <Button>View More</Button>
    </div>
  );
};

export default LoadMore;
