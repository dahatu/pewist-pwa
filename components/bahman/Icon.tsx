import { cn } from "@/lib/utils";
import { RemixIconName } from "@/remixicons";
import { HTMLAttributes } from "react";
type Props = {
  name: RemixIconName;
  className?: string | undefined
} & HTMLAttributes<HTMLSpanElement>;

const Icon = ({ name, className, ...props }: Props) => {
  return <span {...props} className={cn(`ri-${name}`, 'text-lg', className)} />;
};

export default Icon;
