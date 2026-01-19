import { Button } from "@heroui/button";
import { ReactElement } from "react";

type Props = {
  authHandler: () => Promise<void>;
  text: string;
  icon: ReactElement;
};

export default function AuthInput({ authHandler, text, icon }: Props) {
  return (
    <div className="w-full">
      <Button
        className="text-xs font-light"
        startContent={icon}
        onPress={authHandler}
      >
        {text}
      </Button>
    </div>
  );
}
