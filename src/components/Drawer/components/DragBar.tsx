import React from "react";
import { cn } from "../../../utils/classUtil";
import { getAxis, registDragEvent } from "../utils";
import { useDrawerContext } from "../hooks/useDrawerContext";

export interface DragBarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function DragBar({ className, children, ...rest }: DragBarProps) {
  const { direction, setDragDelta } = useDrawerContext();

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
        },
      })}
    >
      {children}
    </div>
  );
}
