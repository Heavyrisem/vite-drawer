import React from "react";
import { getAxis, registDragEvent } from "../utils";
import { useDrawerContext } from "../hooks/useDrawerContext";

export interface DragBarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function DragBar({ className, children, ...rest }: DragBarProps) {
  const { direction, setDragDelta, setOpen } = useDrawerContext();

  return (
    <div
      className={className}
      {...rest}
      {...registDragEvent({
        onDragChange: (deltaX, deltaY) => {
          if (getAxis(direction) === "x") setDragDelta(deltaX);
          else setDragDelta(deltaY);
        },
        onDragEnd: (deltaX, deltaY) => {
          setDragDelta(0);

          let dragDelta;
          if (getAxis(direction) === "x") dragDelta = deltaX;
          else dragDelta = deltaY;
          console.log({ dragDelta, setOpen });
          if (dragDelta >= 50) setOpen(false);
        },
      })}
    >
      {children}
    </div>
  );
}
