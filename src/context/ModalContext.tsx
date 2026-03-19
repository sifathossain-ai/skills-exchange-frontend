"use client";

import React, { createContext, useContext, useState } from "react";

interface ModalContextType {
  isCreatePostOpen: boolean;
  openCreatePost: () => void;
  closeCreatePost: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);

  return (
    <ModalContext.Provider
      value={{
        isCreatePostOpen,
        openCreatePost: () => setIsCreatePostOpen(true),
        closeCreatePost: () => setIsCreatePostOpen(false),
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
}
