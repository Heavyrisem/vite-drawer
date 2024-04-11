import { ReactPortal } from "../../Portal";
import { useDrawerContext } from "../hooks/useDrawerContext";

interface PopoverProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Popover({ children, ...rest }: PopoverProps) {
  const { visibility } = useDrawerContext();

  if (visibility === false) return null;

  return (
    <ReactPortal key="react-drawer-portal" {...rest}>
      {children}
    </ReactPortal>
  );
}
