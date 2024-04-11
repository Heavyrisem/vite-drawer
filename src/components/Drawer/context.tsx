import React, { useCallback, useEffect, useState } from "react";
import { useControlled } from "../../hooks/useControlled";

interface DrawerContextState {
  direction: "top" | "left" | "right" | "bottom";
  dragDelta: number;
  setDragDelta: React.Dispatch<React.SetStateAction<number>>;
  visibility: boolean;
  setVisibility: (visibility: boolean) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const DrawerContext = React.createContext<DrawerContextState>({
  direction: "bottom",
  dragDelta: 0,
  setDragDelta: () => {},
  visibility: false,
  setVisibility: () => {},
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
  const [visibility, setVisibility] = useState(open);

  useEffect(() => console.log({ visibility }), [visibility]);

  useEffect(() => {
    if (open) setVisibility(open);
  }, [open]);

  const handleOpen = useCallback(
    (value: boolean) => {
      setOpen(value);
      onOpen?.(value);
    },
    [setOpen, onOpen],
  );

  return (
    <DrawerContext.Provider
      value={{
        visibility,
        setVisibility,
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
