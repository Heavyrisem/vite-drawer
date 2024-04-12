import { useEffect, useRef } from "react";

export default function usePrevious<T>(value: T): T {
  // Source: https://reactjs.org/docs/hooks-faq.html#how-to-get-the-previous-props-or-state
  const ref = useRef<T>(value);
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}
