import React, { useCallback, useMemo, useRef } from "react";
import { cn } from "../../../utils/classUtil";
import { useDrawerContext } from "../hooks/useDrawerContext";
import { getAxis } from "../utils";

export interface BodyProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Body({ className, children, ...rest }: BodyProps) {
  const { open, direction, dragDelta, setVisibility } = useDrawerContext();
  const prevState = useRef(false);
  const bodyRef = useRef<HTMLDivElement>(null);

  const transform = useMemo(() => {
    // if (!bodyRef.current) return;
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
      if (direction === "bottom") yTransform = `translateY(100%)`;
      if (direction === "top") yTransform = `translateY(-100%)`;
      if (direction === "left") xTransform = `translateX(-100%)`;
      if (direction === "right") xTransform = `translateX(100%)`;
    }

    return [xTransform, yTransform].join(" ");
  }, [direction, dragDelta, open]);

  return (
    <div
      ref={bodyRef}
      className={cn(
        "absolute bg-white rounded-xl p-4",
        {
          "left-1/2 bottom-0 translate-y-full": direction === "bottom",
          "left-1/2 top-0": direction === "top",
          "top-1/2 left-0": direction === "left",
          "top-1/2 right-0": direction === "right",
        },
        className,
      )}
      style={{
        transform,
        transition: `transform ${dragDelta ? 0 : 150}ms ease-in-out 0s`,
      }}
      onTransitionEnd={() => open === false && setVisibility(false)}
      {...rest}
    >
      {children}
    </div>
  );
}
