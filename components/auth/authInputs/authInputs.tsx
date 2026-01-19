import { GoogleLogo } from "@/components/icons";
import { IconSvgProps } from "@/types";
import { Button } from "@heroui/button";
import { FC, ReactElement } from "react";
import { text } from "stream/consumers";

type Props = {
  authHandler: () => Promise<void>;
  text: string;
  icon: ReactElement;
};

export default function AuthInput({ authHandler, text, icon }: Props) {
  return (
    <div className="w-full">
      <Button startContent={icon} onPress={authHandler} className="text-xs font-light">
        {text}
      </Button>
    </div>
  );
}
