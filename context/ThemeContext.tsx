"use client";
import React, { ReactNode } from "react";
import { ThemeProvider } from "next-themes";

export const ThemeContext = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeProvider defaultTheme="system" attribute="class">
      {children}
    </ThemeProvider>
  );
};
