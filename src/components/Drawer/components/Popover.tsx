import { ReactPortal } from "../../Portal";
import { useDrawerContext } from "../hooks/useDrawerContext";

interface PopoverProps extends React.PropsWithChildren {}

export function Popover({ children }: PopoverProps) {
  const { visibility } = useDrawerContext();

  return (
    <ReactPortal key="react-drawer-portal">
      {visibility === true && children}
    </ReactPortal>
  );
}
