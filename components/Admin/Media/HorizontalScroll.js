import React, { Fragment } from "react";
import { ScrollMenu } from "react-horizontal-scrolling-menu";
import useDrag from "./useDrag";

const HorizontalScroll = (props) => {
  const { children } = props;

  const { dragStart, dragStop, dragMove, dragging } = useDrag();
  const handleDrag =
    ({ scrollContainer }) =>
    (ev) =>
      dragMove(ev, (posDiff) => {
        if (scrollContainer.current) {
          scrollContainer.current.scrollLeft += posDiff;
        }
      });

  return (
    <Fragment>
      <ScrollMenu
        onMouseDown={() => dragStart}
        onMouseUp={() => dragStop}
        onMouseMove={handleDrag}
      >
        {children}
      </ScrollMenu>
    </Fragment>
  );
};

export default HorizontalScroll;
