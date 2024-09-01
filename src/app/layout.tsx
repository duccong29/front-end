// layout.tsx
import './globals.css';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { AuthProvider } from '@/utils/AuthContext';


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
     
      <body suppressHydrationWarning={true}>
      <AuthProvider>
        <Header />
        <main>{children}</main>
        <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}

