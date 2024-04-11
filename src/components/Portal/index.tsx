import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import { createWrapperAndAppendToBody } from "./util";

export interface ReactPortalProps extends React.PropsWithChildren {
  wrapperId?: string;
  className?: string;
}

export const ReactPortal: React.FC<ReactPortalProps> = ({
  className,
  children,
  wrapperId = "react-portal-wrapper",
}) => {
  const [element, setElement] = useState<HTMLElement>();

  useEffect(() => {
    const elem = document.getElementById(wrapperId);
    if (elem) elem.className = className ?? "";

    if (!elem) {
      setElement(createWrapperAndAppendToBody(wrapperId));
    } else {
      setElement(elem);
    }
  }, [wrapperId, className]);

  if (element) return createPortal(children, element);
  return null;
};
