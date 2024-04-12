import { ReactPortal } from "../../Portal";

interface PopoverProps extends React.PropsWithChildren {}

export function Popover({ children }: PopoverProps) {
  return <ReactPortal key="react-drawer-portal">{children}</ReactPortal>;
}
