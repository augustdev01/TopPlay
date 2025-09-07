"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Trophy,
  Users,
  CreditCard,
  Settings,
  Menu,
  LogOut,
  BarChart3,
  Plus,
} from "lucide-react";
// import { motion } from 'framer-motion';

const navigation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Compétitions", href: "/admin/competitions", icon: Trophy },
  { name: "Joueurs", href: "/admin/players", icon: Users },
  { name: "Transactions", href: "/admin/transactions", icon: CreditCard },
  { name: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  { name: "Paramètres", href: "/admin/settings", icon: Settings },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar - Desktop only */}
      <div className="w-64 bg-gray-900 text-white flex flex-col h-screen scrollbar-hide">
        {/* Header */}
        <div className="p-6 border-b border-gray-800">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="font-bold text-lg">VoteSport</h2>
              <p className="text-sm text-gray-400">Administration</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive(item.href)
                    ? "bg-indigo-600 text-white shadow-lg"
                    : "text-gray-300 hover:text-white hover:bg-gray-800"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Quick Actions */}
        <div className="p-4 border-t border-gray-800 space-y-2">
          <Button
            asChild
            className="w-full justify-start bg-indigo-600 hover:bg-indigo-700 rounded-xl"
          >
            <Link href="/admin/competitions/create">
              <Plus className="w-4 h-4 mr-2" />
              Nouvelle compétition
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="w-full justify-start text-gray-300 border-gray-700 hover:bg-gray-800 rounded-xl"
          >
            <Link href="/admin/players/create">
              <Plus className="w-4 h-4 mr-2" />
              Nouveau joueur
            </Link>
          </Button>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-800">
          <Button
            variant="ghost"
            className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800 rounded-xl"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Déconnexion
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen">
        {/* Page Content */}
        <main className="flex-1 p-8 overflow-y-auto scrollbar-hide">
          {children}
        </main>
      </div>
    </div>
  );
}
