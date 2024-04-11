import React, { useCallback, useMemo } from "react";
import { cn } from "../../../utils/classUtil";
import { useDrawerContext } from "../hooks/useDrawerContext";
import { getAxis } from "../utils";

export interface BodyProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Body({ className, children, ...rest }: BodyProps) {
  const { open, direction, dragDelta } = useDrawerContext();

  const getTransform = useMemo(() => {
    const axis = getAxis(direction);
    let xTransform = "";
    let yTransform = "";

    if (axis === "x") yTransform = `translateY(-50%)`;
    else xTransform = `translateX(-50%)`;

    if (open) {
      if (axis === "x") xTransform = `translateX(${dragDelta}px)`;
      else yTransform = `translateY(${dragDelta}px)`;
    }

    if (open === false) {
      // if (axis === 'x')
    }

    return [xTransform, yTransform].join(" ");
  }, [direction, dragDelta, open]);

  return (
    <div
      className={cn(
        "absolute bg-white rounded-xl p-4",
        {
          "left-1/2 bottom-0": direction === "bottom",
          "left-1/2 top-0": direction === "top",
          "top-1/2 left-0": direction === "left",
          "top-1/2 right-0": direction === "right",
        },
        className,
      )}
      style={{
        transform:
          getAxis(direction) === "x"
            ? `translateX(${dragDelta}px) translateY(-50%)`
            : `translateY(${dragDelta}px) translateX(-50%)`,
        transition: `transform ${dragDelta ? 0 : 150}ms ease-in-out 0s`,
      }}
      onTransitionEnd={() => console.log("end")}
      {...rest}
    >
      {children}
    </div>
  );
}
