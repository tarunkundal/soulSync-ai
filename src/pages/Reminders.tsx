import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Switch } from "../components/ui/switch";
import {
    Plus,
    Bell,
    Calendar,
    Clock,
    Repeat,
    MessageSquare,
    Sparkles,
    Trash2,
    Edit,
} from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../components/ui/select";
import { cn } from "../lib/utils";

const mockReminders = [
    {
        id: 1,
        title: "Mom's Birthday",
        date: "Dec 8, 2024",
        time: "9:00 AM",
        recurrence: "Yearly",
        tone: "Emotional",
        whatsapp: true,
        person: "Mom",
    },
    {
        id: 2,
        title: "Team Meeting Prep",
        date: "Dec 6, 2024",
        time: "8:00 AM",
        recurrence: "Weekly",
        tone: "Professional",
        whatsapp: false,
        person: null,
    },
    {
        id: 3,
        title: "Anniversary",
        date: "Jun 10, 2025",
        time: "10:00 AM",
        recurrence: "Yearly",
        tone: "Romantic",
        whatsapp: true,
        person: "Emily",
    },
];

const toneOptions = ["Funny", "Romantic", "Emotional", "Professional"];
const recurrenceOptions = ["Once", "Daily", "Weekly", "Monthly", "Yearly"];

export default function Reminders() {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [reminders] = useState(mockReminders);

    return (
        <div className="p-6 lg:p-8 max-w-5xl mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Reminders</h1>
                    <p className="text-muted-foreground">
                        Create and manage your reminders
                    </p>
                </div>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button className="bg-gradient-to-r from-accent-pink to-accent-violet hover:opacity-90">
                            <Plus className="w-4 h-4 mr-2" />
                            New Reminder
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="glass-card border-white/[0.08] max-w-lg">
                        <DialogHeader>
                            <DialogTitle>Create Reminder</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-5 mt-4">
                            <div className="space-y-2">
                                <Label>Title</Label>
                                <Input
                                    placeholder="e.g., Mom's Birthday"
                                    className="bg-white/[0.02] border-white/[0.08]"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Date</Label>
                                    <Input
                                        type="date"
                                        className="bg-white/[0.02] border-white/[0.08]"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Time</Label>
                                    <Input
                                        type="time"
                                        className="bg-white/[0.02] border-white/[0.08]"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label>Recurrence</Label>
                                <Select defaultValue="once">
                                    <SelectTrigger className="bg-white/[0.02] border-white/[0.08]">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent className="glass-card border-white/[0.08]">
                                        {recurrenceOptions.map((opt) => (
                                            <SelectItem key={opt} value={opt.toLowerCase()}>
                                                {opt}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label>AI Message Tone</Label>
                                <Select defaultValue="emotional">
                                    <SelectTrigger className="bg-white/[0.02] border-white/[0.08]">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent className="glass-card border-white/[0.08]">
                                        {toneOptions.map((tone) => (
                                            <SelectItem key={tone} value={tone.toLowerCase()}>
                                                {tone}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                                <div className="flex items-center gap-3">
                                    <MessageSquare className="w-5 h-5 text-green-500" />
                                    <div>
                                        <Label className="font-medium">Send via WhatsApp</Label>
                                        <p className="text-xs text-muted-foreground">
                                            Auto-send message when triggered
                                        </p>
                                    </div>
                                </div>
                                <Switch className="data-[state=checked]:bg-green-500" />
                            </div>

                            <Button
                                className="w-full bg-gradient-to-r from-accent-pink to-accent-violet"
                                onClick={() => setIsDialogOpen(false)}
                            >
                                Create Reminder
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <Card className="glass-card border-white/[0.08]">
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-accent-pink/10 flex items-center justify-center">
                            <Bell className="w-6 h-6 text-accent-pink" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold">{reminders.length}</p>
                            <p className="text-sm text-muted-foreground">Total Reminders</p>
                        </div>
                    </CardContent>
                </Card>
                <Card className="glass-card border-white/[0.08]">
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-accent-teal/10 flex items-center justify-center">
                            <Calendar className="w-6 h-6 text-accent-teal" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold">2</p>
                            <p className="text-sm text-muted-foreground">This Week</p>
                        </div>
                    </CardContent>
                </Card>
                <Card className="glass-card border-white/[0.08]">
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
                            <MessageSquare className="w-6 h-6 text-green-500" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold">2</p>
                            <p className="text-sm text-muted-foreground">WhatsApp Enabled</p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Reminders List */}
            <Card className="glass-card border-white/[0.08]">
                <CardHeader>
                    <CardTitle className="text-lg">All Reminders</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    {reminders.map((reminder) => (
                        <div
                            key={reminder.id}
                            className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.04] transition-all group"
                        >
                            <div className="w-12 h-12 rounded-xl bg-accent-violet/10 flex items-center justify-center">
                                <Bell className="w-6 h-6 text-accent-violet" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                    <p className="font-medium truncate">{reminder.title}</p>
                                    {reminder.person && (
                                        <span className="text-xs px-2 py-0.5 rounded-full bg-accent-pink/10 text-accent-pink">
                                            {reminder.person}
                                        </span>
                                    )}
                                </div>
                                <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                                    <span className="flex items-center gap-1">
                                        <Calendar className="w-3.5 h-3.5" />
                                        {reminder.date}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Clock className="w-3.5 h-3.5" />
                                        {reminder.time}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Repeat className="w-3.5 h-3.5" />
                                        {reminder.recurrence}
                                    </span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <span
                                    className={cn(
                                        "text-xs px-2 py-1 rounded-full",
                                        "bg-accent-teal/10 text-accent-teal"
                                    )}
                                >
                                    <Sparkles className="w-3 h-3 inline mr-1" />
                                    {reminder.tone}
                                </span>
                                {reminder.whatsapp && (
                                    <span className="text-xs px-2 py-1 rounded-full bg-green-500/10 text-green-500">
                                        <MessageSquare className="w-3 h-3 inline" />
                                    </span>
                                )}
                            </div>
                            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <Edit className="w-4 h-4" />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 text-red-500 hover:text-red-400"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
    );
}
