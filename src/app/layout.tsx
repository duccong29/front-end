// layout.tsx
"use client";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import { AuthProvider } from "@/utils/AuthContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <AuthProvider>
          <main>{children}</main>
          <Toaster /> 
        </AuthProvider>
      </body>
    </html>
  );
}
