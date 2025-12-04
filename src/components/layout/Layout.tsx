import { Navbar } from "./Navbar";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <footer className="border-t py-8 bg-muted/30">
        <div className="container text-center text-sm text-muted-foreground">
          <p>© 2024 HealthWell. All rights reserved.</p>
          <p className="mt-2 text-xs">
            This is not emergency medical advice. For emergencies, call 911.
          </p>
        </div>
      </footer>
    </div>
  );
};
