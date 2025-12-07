"use client";

import { PropsWithChildren } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";

const client = new QueryClient();

const Providers = ({ children }: PropsWithChildren) => {
  return (
    <QueryClientProvider client={client}>
      <ThemeProvider
       attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default Providers;
