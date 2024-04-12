import { cn } from "../../../utils/classUtil";
import { useDrawerContext } from "../hooks/useDrawerContext";

export interface BackdropProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Backdrop({ className, ...rest }: BackdropProps) {
  const { open } = useDrawerContext();

  if (open === false) return null;

  return (
    <div
      className={cn(
        "absolute top-0 w-full h-full bg-black bg-opacity-20 overflow-hidden",
        className,
      )}
      {...rest}
    />
  );
}
