import React, { useCallback, useEffect, useRef, useState } from "react";
import { useControlled } from "../../hooks/useControlled";
import usePrevious from "../../hooks/usePrevious";

interface DrawerContextState {
  direction: "top" | "left" | "right" | "bottom";
  dragDelta: number;
  setDragDelta: React.Dispatch<React.SetStateAction<number>>;
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const DrawerContext = React.createContext<DrawerContextState>({
  direction: "bottom",
  dragDelta: 0,
  setDragDelta: () => {},
  open: false,
  setOpen: () => {},
});

export interface DrawerContextProviderProps {
  defaultOpen?: boolean;
  open?: boolean;
  direction?: DrawerContextState["direction"];
  onOpen?: (open: boolean) => void;
  children?: React.ReactNode;
}

export function DrawerContextProvider({
  open: openProps,
  defaultOpen = false,
  direction = "bottom",
  onOpen,
  children,
}: DrawerContextProviderProps) {
  const [open, setOpen] = useControlled(defaultOpen, openProps);
  const [dragDelta, setDragDelta] = useState(0);

  const handleOpen = useCallback(
    (value: boolean) => {
      setOpen(value);
      onOpen?.(value);
    },
    [setOpen, onOpen]
  );

  return (
    <DrawerContext.Provider
      value={{
        open,
        setOpen: handleOpen,
        direction,
        dragDelta,
        setDragDelta,
      }}
    >
      {children}
    </DrawerContext.Provider>
  );
}
