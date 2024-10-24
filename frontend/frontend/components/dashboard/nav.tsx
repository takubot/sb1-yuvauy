"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Bot,
  Calendar,
  FileText,
  LayoutDashboard,
  Settings,
  Users,
} from "lucide-react";

const navigation = [
  { name: "ダッシュボード", href: "/dashboard", icon: LayoutDashboard },
  { name: "モデル管理", href: "/models", icon: Bot },
  { name: "ドキュメント", href: "/documents", icon: FileText },
  { name: "予約管理", href: "/calendar", icon: Calendar },
  { name: "メンバー", href: "/members", icon: Users },
  { name: "設定", href: "/settings", icon: Settings },
];

export function DashboardNav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col w-64 border-r bg-card">
      <div className="p-6">
        <h1 className="text-2xl font-bold">DOPPEL</h1>
      </div>
      <div className="flex-1 px-4">
        {navigation.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium",
                pathname === item.href
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-accent"
              )}
            >
              <Icon className="h-4 w-4" />
              {item.name}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
