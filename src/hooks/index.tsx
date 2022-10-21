import React, { ReactNode } from "react";
import { AuthProvider } from "./cards";
import { AuthProviderDespesas } from "./despesas";

interface AppProviderProps {
  children: ReactNode;
}

function AppProvider({ children }: AppProviderProps) {
  return (
    <AuthProvider>
      <AuthProviderDespesas>{children}</AuthProviderDespesas>
    </AuthProvider>
  );
}

export { AppProvider };
