
"use client";

import {
  LayoutDashboard,
  BarChart3,
  FileText,
  Settings,
  Brain,
  ShieldCheck,
} from "lucide-react";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      className="
        fixed left-0 top-0
        w-[280px] h-screen
        theme-sidebar theme-text
        border-r theme-border
        flex flex-col
        z-50
        transition-colors duration-300
      "
    >
      {/* Logo */}
      <div className="p-6 border-b theme-border">
        <div className="flex gap-3 items-center">
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-3 rounded-xl">
            <Brain size={25} className="text-white" />
          </div>

          <div>
            <h1 className="text-xl font-bold theme-text">
              NeuroScan
              <span className="text-indigo-400"> AI</span>
            </h1>

            <p className="text-xs theme-muted">
              Clinical Diagnostic v2.4
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-5 space-y-3 flex-1">
        <Menu
          href="/"
          icon={<LayoutDashboard size={20} />}
          text="Dashboard"
          active={pathname === "/"}
        />

        <Menu
          href="/analytics"
          icon={<BarChart3 size={20} />}
          text="Analytics"
          active={pathname.startsWith("/analytics")}
        />

        <Menu
          href="/reports"
          icon={<FileText size={20} />}
          text="Reports"
          active={pathname.startsWith("/reports")}
        />

        <Menu
          href="/settings"
          icon={<Settings size={20} />}
          text="Settings"
          active={pathname.startsWith("/settings")}
        />
      </nav>

      {/* Backend Status */}
      <div className="p-5">
        <div className="card p-4">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-green-400 rounded-full" />

            <div>
              <p className="font-semibold text-sm theme-text">
                AI Model Active
              </p>

              <p className="text-xs theme-muted">
                Custom Backend Ready
              </p>
            </div>

            <ShieldCheck className="ml-auto text-indigo-400" />
          </div>
        </div>
      </div>
    </aside>
  );
}

function Menu({
  href,
  icon,
  text,
  active,
}: {
  href: string;
  icon: React.ReactNode;
  text: string;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      className={`
        flex gap-3 items-center p-3 rounded-xl
        border transition-colors duration-200
        ${
          active
            ? "bg-indigo-600 text-white border-indigo-500"
            : "theme-muted theme-border hover:bg-indigo-500/10 hover:text-indigo-500"
        }
      `}
    >
      {icon}
      <span className="font-medium">{text}</span>
    </Link>
  );
}
