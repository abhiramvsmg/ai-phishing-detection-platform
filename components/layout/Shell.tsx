import { Sidebar } from "./Sidebar";
import { Navbar } from "./Navbar";
import { AuthGate } from "./AuthGate";

export const Shell = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthGate>
      <div className="flex min-h-screen bg-gradient-dark text-slate-900">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <Navbar />
          <main className="flex-1 overflow-y-auto p-6 md:p-8">
            {children}
          </main>
        </div>
      </div>
    </AuthGate>
  );
};
export default Shell;
