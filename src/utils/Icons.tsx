import { createContext, useContext } from "react";
import * as Icon from "phosphor-react";

interface IconBaseProps {
  name: keyof typeof Icon;
  size?: number;
  color?: string;
  className?: string;
}

export const IconContext = createContext(Icon as { [key: string]: any });

export const IconBase = ({ name, ...props }: IconBaseProps) => {
  const Icon = useContext(IconContext)[name];
  return <Icon {...props} />;
};
