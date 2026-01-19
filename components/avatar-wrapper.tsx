"use client";

import { useUser } from "@/app/context/user";
import { Avatar } from "@heroui/avatar";
import { Tooltip } from "@heroui/tooltip";

export default function AvatarWrapper() {
  const { user } = useUser();

  if (!user) return null;

  return (
    <div className="flex gap-3 items-center">
      <Tooltip content={user.email || "User Avatar"}>
        <Avatar src={`https://api.dicebear.com/9.x/initials/svg?seed=${user.email}&backgroundType=solid&scale=50`} alt={user.email || "User Avatar"} />
      </Tooltip>
    </div>
  );
}
