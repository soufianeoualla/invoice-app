"use client";
import React, { ReactNode, Suspense, useEffect, useState } from "react";
import { ThemeProvider } from "next-themes";

export const ThemeContext = ({ children }: { children: ReactNode }) => {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  useEffect(() => {
    setIsMounted(true);
  }, [isMounted]);
  if (isMounted)
    return (
      <ThemeProvider defaultTheme="system" attribute="class">
        {children}
      </ThemeProvider>
    );
};
