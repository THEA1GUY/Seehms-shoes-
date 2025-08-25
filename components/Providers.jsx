"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { StyleSheetManager } from "styled-components";

export function Providers({ children }) {
  return (
    <StyleSheetManager shouldForwardProp={(prop) => prop !== 'className'}>
      <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
        {children}
      </NextThemesProvider>
    </StyleSheetManager>
  );
}
