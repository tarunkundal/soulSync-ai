import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import {
    Plus,
    Bell,
    Sparkles,
    Calendar,
    Gift,
    Heart,
    Clock,
    Send,
    ChevronRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "../lib/utils";

const upcomingEvents = [
    {
        id: 1,
        name: "Mom",
        event: "Birthday",
        date: "Dec 8",
        daysLeft: 4,
        relationship: "parent",
        avatar: "👩",
    },
    {
        id: 2,
        name: "John",
        event: "Work Anniversary",
        date: "Dec 12",
        daysLeft: 8,
        relationship: "colleague",
        avatar: "👨",
    },
    {
        id: 3,
        name: "Sarah",
        event: "Birthday",
        date: "Dec 15",
        daysLeft: 11,
        relationship: "friend",
        avatar: "👧",
    },
];

const readyMessages = [
    {
        id: 1,
        recipient: "Mom",
        event: "Birthday",
        preview: "Happy Birthday, Mom! 🎂 Your love and support mean the world...",
        style: "emotional",
    },
    {
        id: 2,
        recipient: "John",
        event: "Work Anniversary",
        preview: "Congratulations on another year of amazing work! Your dedication...",
        style: "professional",
    },
];

const quickActions = [
    { label: "Add Person", icon: Plus, color: "accent-pink", href: "/people" },
    { label: "Create Reminder", icon: Bell, color: "accent-teal", href: "/reminders" },
    { label: "Generate Message", icon: Sparkles, color: "accent-violet", href: "/ai-generator" },
];

export default function Dashboard() {
    const navigate = useNavigate();

    return (
        <div className="p-6 lg:p-8 max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Good morning! 👋</h1>
                <p className="text-muted-foreground">
                    You have <span className="text-accent-pink font-medium">3 upcoming events</span> this week
                </p>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                {quickActions.map((action) => (
                    <button
                        key={action.label}
                        onClick={() => navigate(action.href)}
                        className={cn(
                            "glass-card p-4 rounded-xl border border-white/[0.08] flex items-center gap-4 transition-all hover:scale-[1.02] hover:border-white/[0.12] group"
                        )}
                    >
                        <div
                            className={cn(
                                "w-12 h-12 rounded-xl flex items-center justify-center transition-all",
                                `bg-${action.color}/10 group-hover:bg-${action.color}/20`
                            )}
                        >
                            <action.icon className={cn("w-6 h-6", `text-${action.color}`)} />
                        </div>
                        <span className="font-medium">{action.label}</span>
                        <ChevronRight className="w-5 h-5 ml-auto text-muted-foreground group-hover:text-foreground transition-colors" />
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Upcoming Events */}
                <Card className="lg:col-span-2 glass-card border-white/[0.08]">
                    <CardHeader className="flex flex-row items-center justify-between pb-4">
                        <CardTitle className="text-lg flex items-center gap-2">
                            <Calendar className="w-5 h-5 text-accent-teal" />
                            Upcoming Events
                        </CardTitle>
                        <Button variant="ghost" size="sm" className="text-muted-foreground">
                            View all
                        </Button>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {upcomingEvents.map((event) => (
                            <div
                                key={event.id}
                                onClick={() => navigate(`/people/${event.id}`)}
                                className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.04] hover:border-white/[0.1] transition-all cursor-pointer group"
                            >
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent-pink/20 to-accent-violet/20 flex items-center justify-center text-2xl">
                                    {event.avatar}
                                </div>
                                <div className="flex-1">
                                    <p className="font-medium">{event.name}</p>
                                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                                        {event.event === "Birthday" ? (
                                            <Gift className="w-3.5 h-3.5" />
                                        ) : (
                                            <Heart className="w-3.5 h-3.5" />
                                        )}
                                        {event.event} • {event.date}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <div
                                        className={cn(
                                            "inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium",
                                            event.daysLeft <= 3
                                                ? "bg-accent-pink/10 text-accent-pink"
                                                : event.daysLeft <= 7
                                                    ? "bg-accent-teal/10 text-accent-teal"
                                                    : "bg-white/[0.06] text-muted-foreground"
                                        )}
                                    >
                                        <Clock className="w-3.5 h-3.5" />
                                        {event.daysLeft} days
                                    </div>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                {/* Ready Messages */}
                <Card className="glass-card border-white/[0.08]">
                    <CardHeader className="flex flex-row items-center justify-between pb-4">
                        <CardTitle className="text-lg flex items-center gap-2">
                            <Sparkles className="w-5 h-5 text-accent-violet" />
                            Ready to Send
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {readyMessages.map((msg) => (
                            <div
                                key={msg.id}
                                className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-3"
                            >
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium text-sm">{msg.recipient}</p>
                                        <p className="text-xs text-muted-foreground">{msg.event}</p>
                                    </div>
                                    <span className="text-xs px-2 py-1 rounded-full bg-accent-violet/10 text-accent-violet capitalize">
                                        {msg.style}
                                    </span>
                                </div>
                                <p className="text-sm text-muted-foreground line-clamp-2">
                                    {msg.preview}
                                </p>
                                <Button size="sm" className="w-full bg-green-500/10 text-green-500 hover:bg-green-500/20 border border-green-500/20">
                                    <Send className="w-4 h-4 mr-2" />
                                    Send via WhatsApp
                                </Button>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>

            {/* This Week Overview */}
            <Card className="mt-6 glass-card border-white/[0.08]">
                <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-accent-pink" />
                        This Week
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-7 gap-2">
                        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, i) => (
                            <div
                                key={day}
                                className={cn(
                                    "p-3 rounded-xl text-center border transition-all",
                                    i === 3
                                        ? "bg-accent-pink/10 border-accent-pink/30"
                                        : "bg-white/[0.02] border-white/[0.06]"
                                )}
                            >
                                <p className="text-xs text-muted-foreground mb-1">{day}</p>
                                <p className={cn("text-lg font-medium", i === 3 && "text-accent-pink")}>
                                    {4 + i}
                                </p>
                                {i === 4 && (
                                    <div className="w-1.5 h-1.5 rounded-full bg-accent-teal mx-auto mt-1" />
                                )}
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
