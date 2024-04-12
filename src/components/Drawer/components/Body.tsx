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
import { motion } from "framer-motion";

type Transform = {
  x?: string;
  y?: string;
};

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
    let x = "";
    let y = "";

    if (axis === "x") y = `-50%`;
    else x = `-50%`;

    if (open) {
      if (axis === "x") x = `${dragDelta}px`;
      else y = `${dragDelta}px`;
    }

    if (open === false) {
      if (direction === "bottom") y = `100%`;
      if (direction === "top") y = `-100%`;
      if (direction === "left") x = `-100%`;
      if (direction === "right") x = `100%`;
    }

    return { x: x || undefined, y: y || undefined };
  }, [direction, dragDelta, open]);

  // const handleTransitionEnd = useCallback(() => {
  // if (open === false) setSafeToDetach(true);
  // }, []);

  console.log(transform);

  return (
    <motion.div
      className={cn(
        "absolute bg-white rounded-xl p-4",
        {
          // "left-1/2 bottom-0": direction === "bottom",
          // "left-1/2 top-0": direction === "top",
          // "top-1/2 left-0": direction === "left",
          // "top-1/2 right-0": direction === "right",
          // hidden: safeToDetach === true,
        },
        className
      )}
      initial={[direction]}
      // initial={{ x: "-50%", y: "-50%" }}
      custom={transform}
      variants={{
        bottom: {
          left: "50%",
          bottom: 0,
        },
        top: {
          left: "50%",
          top: 0,
        },
        left: {
          top: "50%",
          left: 0,
        },
        right: {
          top: "50%",
          right: 0,
        },
        open: (transform: Transform) => ({
          background: "blue",
          // opacity: 1,
          // display: "block",
          ...transform,
        }),
        close: {
          background: "red",
          // opacity: 0,
          // display: "none",
          display: "none",
        },
      }}
      animate={[direction, open ? "open" : "close"]}
      transition={{
        // type: "spring",
        // damping: 100,
        // stiffness: 300,
        duration: dragDelta ? 0 : 1,
      }}
      // style={{
      //   transition: `transform ${dragDelta ? 0 : 1000}ms ease-in-out 0s`,
      // }}
      // onTransitionEnd={handleTransitionEnd}
    >
      {children}
    </motion.div>
  );
}
