import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { cn } from "../../../utils/classUtil";
import { useDrawerContext } from "../hooks/useDrawerContext";
import { getAxis } from "../utils";

export interface BodyProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Body({ className, children, ...rest }: BodyProps) {
  const { open, direction, dragDelta } = useDrawerContext();
  // const [safeToDetach, setSafeToDetach] = useState(true);

  const centerTransform = useMemo(() => {
    const axis = getAxis(direction);

    if (axis === "x") return `translateY(-50%)`;
    else return `translateX(-50%)`;
  }, [direction]);

  const transform = useMemo(() => {
    const axis = getAxis(direction);
    let xTransform = "";
    let yTransform = "";

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

  const handleTransitionEnd = useCallback(() => {
    // if (open === false) setSafeToDetach(true);
  }, []);

  return (
    <div
      className={cn(
        "absolute bg-white rounded-xl p-4 duration-0",
        {
          "left-1/2 bottom-0": direction === "bottom",
          "left-1/2 top-0": direction === "top",
          "top-1/2 left-0": direction === "left",
          "top-1/2 right-0": direction === "right",
          // hidden: safeToDetach === true,
        },
        className
      )}
      style={{
        transform: [centerTransform, transform].join(" "),
        transition: `transform ${dragDelta ? 0 : 1000}ms ease-in-out 0s`,
      }}
      onTransitionEnd={handleTransitionEnd}
      {...rest}
    >
      {children}
    </div>
  );
}
