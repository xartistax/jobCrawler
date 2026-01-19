"use client";

import { Avatar } from "@heroui/avatar";
import { Tooltip } from "@heroui/tooltip";

import { useUser } from "@/app/context/user";

export default function AvatarWrapper() {
  const { user } = useUser();

  if (!user) return null;

  return (
    <div className="flex gap-3 items-center">
      <Tooltip content={user.email || "User Avatar"}>
        <Avatar
          alt={user.email || "User Avatar"}
          src={`https://api.dicebear.com/9.x/initials/svg?seed=${user.email}&backgroundType=solid&scale=50`}
        />
      </Tooltip>
    </div>
  );
}
