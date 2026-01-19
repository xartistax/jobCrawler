// app/context/ui-context.tsx
"use client";

import React, { createContext, useContext } from "react";
import { useDisclosure } from "@heroui/modal";

type UIContextType = {
  isOpen: boolean;
  onOpen: () => void;
  onOpenChange: (isOpen: boolean) => void;
  onClose: () => void;
};

const UIContext = createContext<UIContextType | null>(null);

export function UIProvider({ children }: { children: React.ReactNode }) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  return <UIContext.Provider value={{ isOpen, onOpen, onOpenChange, onClose }}>{children}</UIContext.Provider>;
}

export function useUI() {
  const ctx = useContext(UIContext);

  if (!ctx) throw new Error("useUI must be used within UIProvider");

  return ctx;
}
