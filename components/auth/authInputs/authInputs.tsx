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
        className="flex w-full text-xs items-center justify-center gap-2.5 rounded-lg border border-gray-4 p-3.5 bg-transparent text-dark duration-200 ease-in hover:border-gray-5 hover:bg-gray"
        startContent={icon}
        onPress={authHandler}
      >
        {text}
      </Button>
    </div>
  );
}
