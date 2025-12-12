import {
    Bell,
    ChevronLeft,
    ChevronRight,
    LayoutDashboard,
    MessageSquare,
    Settings,
    Sparkles,
    Users,
} from "lucide-react";
import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { cn } from "../../lib/utils";

const navItems = [
    { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
    { title: "People", url: "/people", icon: Users },
    { title: "Reminders", url: "/reminders", icon: Bell },
    { title: "AI Generator", url: "/ai-generator", icon: Sparkles },
    { title: "WhatsApp", url: "/whatsapp", icon: MessageSquare },
    { title: "Settings", url: "/settings", icon: Settings },
];

export function AppSidebar() {
    const [collapsed, setCollapsed] = useState(false);
    const location = useLocation();

    return (
        <aside
            className={cn(
                "h-screen sticky top-0 flex flex-col border-r border-white/[0.06] bg-card/50 backdrop-blur-xl transition-all duration-300",
                collapsed ? "w-[72px]" : "w-[260px]"
            )}
        >
            {/* Logo */}
            <div className="flex items-center gap-3 p-4 border-b border-white/[0.06]">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-pink to-accent-violet flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-white" />
                </div>
                {!collapsed && (
                    <span className="font-bold text-lg text-foreground">SoulSync AI</span>
                )}
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-3 space-y-1">
                {navItems.map((item) => {
                    const isActive = location.pathname === item.url;
                    return (
                        <NavLink
                            key={item.url}
                            to={item.url}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group",
                                isActive
                                    ? "bg-accent-pink/10 text-accent-pink"
                                    : "text-muted-foreground hover:text-foreground hover:bg-white/[0.04]"
                            )}
                        >
                            <item.icon
                                className={cn(
                                    "w-5 h-5 transition-all",
                                    isActive && "drop-shadow-[0_0_8px_rgba(236,72,153,0.5)]"
                                )}
                            />
                            {!collapsed && (
                                <span className="font-medium text-sm">{item.title}</span>
                            )}
                            {isActive && !collapsed && (
                                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-accent-pink shadow-[0_0_8px_rgba(236,72,153,0.8)]" />
                            )}
                        </NavLink>
                    );
                })}
            </nav>

            {/* Collapse Toggle */}
            <div className="p-3 border-t border-white/[0.06]">
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-white/[0.04] transition-all"
                >
                    {collapsed ? (
                        <ChevronRight className="w-5 h-5" />
                    ) : (
                        <>
                            <ChevronLeft className="w-5 h-5" />
                            <span className="text-sm">Collapse</span>
                        </>
                    )}
                </button>
            </div>
        </aside>
    );
}
