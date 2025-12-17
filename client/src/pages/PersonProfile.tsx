import { Button } from "@/components/ui/button";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import {
    ArrowLeft,
    Cake,
    Calendar,
    CalendarIcon,
    Clock,
    Edit,
    Gift,
    Heart,
    Image,
    MessageSquare,
    PartyPopper,
    Phone,
    Plus,
    Save,
    Sparkles,
    Star,
    Trash2,
    X,
} from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const initialEvents = [
    { id: 1, type: "Birthday", date: "Dec 8", recurring: true },
    { id: 2, type: "Mother's Day", date: "May 12", recurring: true },
];

const mockPerson = {
    id: 1,
    name: "Mom",
    relationship: "Parent",
    birthday: "December 8, 1965",
    nextEvent: "Birthday",
    daysLeft: 4,
    avatar: "👩",
    tone: "emotional",
    autoSend: true,
    whatsappNumber: "+1 234 567 8900",
    messageHistory: [
        {
            id: 1,
            date: "Dec 8, 2023",
            event: "Birthday",
            preview: "Happy Birthday Mom! 🎂 Another year of your unconditional love...",
            sent: true,
        },
        {
            id: 2,
            date: "May 12, 2024",
            event: "Mother's Day",
            preview: "To the world's best mom! Thank you for everything...",
            sent: true,
        },
    ],
};

const toneOptions = [
    { id: "funny", label: "Funny", emoji: "😄" },
    { id: "romantic", label: "Romantic", emoji: "💕" },
    { id: "emotional", label: "Emotional", emoji: "🥹" },
    { id: "professional", label: "Professional", emoji: "💼" },
];

const eventTypes = [
    { value: "Birthday", icon: Cake, color: "text-accent-pink" },
    { value: "Anniversary", icon: Heart, color: "text-accent-violet" },
    { value: "Wedding", icon: PartyPopper, color: "text-accent-teal" },
    { value: "Graduation", icon: Star, color: "text-accent-lime" },
    { value: "Other", icon: Calendar, color: "text-muted-foreground" },
];

export default function PersonProfile() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [selectedTone, setSelectedTone] = useState(mockPerson.tone);
    const [autoSend, setAutoSend] = useState(mockPerson.autoSend);
    const [whatsappNumber, setWhatsappNumber] = useState(mockPerson.whatsappNumber);
    const [isEditingNumber, setIsEditingNumber] = useState(false);
    const [tempNumber, setTempNumber] = useState(whatsappNumber);

    console.log('person id ', id);

    // Events state
    const [events, setEvents] = useState(initialEvents);
    const [isAddEventOpen, setIsAddEventOpen] = useState(false);
    const [newEventType, setNewEventType] = useState("");
    const [newEventDate, setNewEventDate] = useState<Date>();
    const [newEventRecurring, setNewEventRecurring] = useState(true);
    const [customEventName, setCustomEventName] = useState("");

    const handleSaveNumber = () => {
        setWhatsappNumber(tempNumber);
        setIsEditingNumber(false);
        toast({
            title: "WhatsApp number saved",
            description: "The contact's WhatsApp number has been updated.",
        });
    };

    const handleAddEvent = () => {
        if (!newEventType || !newEventDate) {
            toast({
                title: "Missing information",
                description: "Please select an event type and date.",
                variant: "destructive",
            });
            return;
        }

        const eventName = newEventType === "Other" ? customEventName : newEventType;
        if (newEventType === "Other" && !customEventName.trim()) {
            toast({
                title: "Missing event name",
                description: "Please enter a name for your custom event.",
                variant: "destructive",
            });
            return;
        }

        const newEvent = {
            id: events.length + 1,
            type: eventName,
            date: format(newEventDate, "MMM d"),
            recurring: newEventRecurring,
        };

        setEvents([...events, newEvent]);
        setIsAddEventOpen(false);
        setNewEventType("");
        setNewEventDate(undefined);
        setNewEventRecurring(true);
        setCustomEventName("");

        toast({
            title: "Event added",
            description: `${eventName} has been added to ${mockPerson.name}'s important dates.`,
        });
    };

    return (
        <div className="p-6 lg:p-8 max-w-5xl mx-auto">
            {/* Back Button */}
            <Button
                variant="ghost"
                onClick={() => navigate("/people")}
                className="mb-6 text-muted-foreground hover:text-foreground"
            >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to People
            </Button>

            {/* Profile Header */}
            <div className="glass-card p-6 rounded-2xl border border-white/[0.08] mb-6">
                <div className="flex flex-col md:flex-row md:items-center gap-6">
                    <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-accent-pink/20 to-accent-violet/20 flex items-center justify-center text-5xl">
                        {mockPerson.avatar}
                    </div>
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                            <h1 className="text-3xl font-bold">{mockPerson.name}</h1>
                            <span className="px-3 py-1 rounded-full text-sm bg-accent-pink/10 text-accent-pink">
                                {mockPerson.relationship}
                            </span>
                        </div>
                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-2">
                                <Gift className="w-4 h-4" />
                                Birthday: {mockPerson.birthday}
                            </span>
                            <span className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-accent-teal" />
                                Next: {mockPerson.nextEvent} in {mockPerson.daysLeft} days
                            </span>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" size="icon" className="bg-white/[0.02] border-white/[0.08]">
                            <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="icon" className="bg-white/[0.02] border-white/[0.08] text-red-500 hover:text-red-400">
                            <Trash2 className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column */}
                <div className="lg:col-span-2 space-y-6">
                    {/* AI Actions */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Button
                            onClick={() => navigate("/ai-generator")}
                            className="h-auto p-5 bg-gradient-to-r from-accent-pink to-accent-violet hover:opacity-90 flex flex-col items-start gap-2"
                        >
                            <Sparkles className="w-6 h-6" />
                            <div className="text-left">
                                <p className="font-semibold">Generate Message</p>
                                <p className="text-xs opacity-80">AI-powered personalized wish</p>
                            </div>
                        </Button>
                        <Button
                            onClick={() => navigate("/ai-generator")}
                            variant="outline"
                            className="h-auto p-5 bg-white/[0.02] border-white/[0.08] hover:bg-white/[0.04] flex flex-col items-start gap-2"
                        >
                            <Image className="w-6 h-6 text-accent-teal" />
                            <div className="text-left">
                                <p className="font-semibold">Generate Card</p>
                                <p className="text-xs text-muted-foreground">Beautiful greeting card</p>
                            </div>
                        </Button>
                    </div>

                    {/* Important Dates */}
                    <Card className="glass-card border-white/[0.08]">
                        <CardHeader>
                            <CardTitle className="text-lg flex items-center gap-2">
                                <Calendar className="w-5 h-5 text-accent-teal" />
                                Important Dates
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {events.map((event) => (
                                <div
                                    key={event.id}
                                    className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]"
                                >
                                    <div className="flex items-center gap-3">
                                        {event.type === "Birthday" ? (
                                            <Gift className="w-5 h-5 text-accent-pink" />
                                        ) : event.type === "Anniversary" ? (
                                            <Heart className="w-5 h-5 text-accent-violet" />
                                        ) : (
                                            <Calendar className="w-5 h-5 text-accent-teal" />
                                        )}
                                        <div>
                                            <p className="font-medium">{event.type}</p>
                                            <p className="text-sm text-muted-foreground">{event.date}</p>
                                        </div>
                                    </div>
                                    {event.recurring && (
                                        <span className="text-xs px-2 py-1 rounded-full bg-accent-teal/10 text-accent-teal">
                                            Recurring
                                        </span>
                                    )}
                                </div>
                            ))}

                            {/* Add Event Dialog */}
                            <Dialog open={isAddEventOpen} onOpenChange={setIsAddEventOpen}>
                                <DialogTrigger asChild>
                                    <Button variant="outline" className="w-full bg-white/[0.02] border-white/[0.08] border-dashed">
                                        <Plus className="w-4 h-4 mr-2" />
                                        Add Event
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="glass-card border-white/[0.08]">
                                    <DialogHeader>
                                        <DialogTitle>Add Important Date</DialogTitle>
                                        <DialogDescription>
                                            Add a special date for {mockPerson.name}
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="space-y-4 mt-4">
                                        {/* Event Type */}
                                        <div className="space-y-2">
                                            <Label>Event Type</Label>
                                            <Select value={newEventType} onValueChange={setNewEventType}>
                                                <SelectTrigger className="bg-white/[0.02] border-white/[0.08]">
                                                    <SelectValue placeholder="Select event type" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {eventTypes.map((type) => (
                                                        <SelectItem key={type.value} value={type.value}>
                                                            <div className="flex items-center gap-2">
                                                                <type.icon className={cn("w-4 h-4", type.color)} />
                                                                <span>{type.value}</span>
                                                            </div>
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        {/* Custom Event Name (if Other selected) */}
                                        {newEventType === "Other" && (
                                            <div className="space-y-2">
                                                <Label>Event Name</Label>
                                                <Input
                                                    value={customEventName}
                                                    onChange={(e) => setCustomEventName(e.target.value)}
                                                    placeholder="e.g., Graduation, Promotion..."
                                                    className="bg-white/[0.02] border-white/[0.08]"
                                                />
                                            </div>
                                        )}

                                        {/* Event Date */}
                                        <div className="space-y-2">
                                            <Label>Date</Label>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <Button
                                                        variant="outline"
                                                        className={cn(
                                                            "w-full justify-start text-left font-normal bg-white/[0.02] border-white/[0.08]",
                                                            !newEventDate && "text-muted-foreground"
                                                        )}
                                                    >
                                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                                        {newEventDate ? format(newEventDate, "PPP") : "Pick a date"}
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0 bg-card border-border" align="start">
                                                    <CalendarComponent
                                                        mode="single"
                                                        selected={newEventDate}
                                                        onSelect={setNewEventDate}
                                                        initialFocus
                                                        className="pointer-events-auto"
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                        </div>

                                        {/* Recurring Toggle */}
                                        <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                                            <div>
                                                <Label className="font-medium">Recurring Event</Label>
                                                <p className="text-xs text-muted-foreground mt-1">
                                                    Remind me every year
                                                </p>
                                            </div>
                                            <Switch
                                                checked={newEventRecurring}
                                                onCheckedChange={setNewEventRecurring}
                                            />
                                        </div>

                                        <Button
                                            className="w-full bg-gradient-to-r from-accent-pink to-accent-violet"
                                            onClick={handleAddEvent}
                                        >
                                            Add Event
                                        </Button>
                                    </div>
                                </DialogContent>
                            </Dialog>
                        </CardContent>
                    </Card>

                    {/* Message History */}
                    <Card className="glass-card border-white/[0.08]">
                        <CardHeader>
                            <CardTitle className="text-lg flex items-center gap-2">
                                <Clock className="w-5 h-5 text-accent-violet" />
                                Message History
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {mockPerson.messageHistory.map((msg) => (
                                <div
                                    key={msg.id}
                                    className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]"
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-medium">{msg.event}</span>
                                            <span className="text-xs text-muted-foreground">{msg.date}</span>
                                        </div>
                                        {msg.sent && (
                                            <span className="text-xs px-2 py-1 rounded-full bg-green-500/10 text-green-500">
                                                Sent
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-sm text-muted-foreground line-clamp-2">
                                        {msg.preview}
                                    </p>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column - Settings */}
                <div className="space-y-6">
                    {/* AI Tone Preference */}
                    <Card className="glass-card border-white/[0.08]">
                        <CardHeader>
                            <CardTitle className="text-lg flex items-center gap-2">
                                <Sparkles className="w-5 h-5 text-accent-pink" />
                                AI Tone
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            {toneOptions.map((tone) => (
                                <button
                                    key={tone.id}
                                    onClick={() => setSelectedTone(tone.id)}
                                    className={cn(
                                        "w-full p-3 rounded-xl border transition-all text-left flex items-center gap-3",
                                        selectedTone === tone.id
                                            ? "bg-accent-pink/10 border-accent-pink/50"
                                            : "bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.04]"
                                    )}
                                >
                                    <span className="text-xl">{tone.emoji}</span>
                                    <span className="font-medium">{tone.label}</span>
                                </button>
                            ))}
                        </CardContent>
                    </Card>

                    {/* WhatsApp Automation */}
                    <Card className="glass-card border-white/[0.08]">
                        <CardHeader>
                            <CardTitle className="text-lg flex items-center gap-2">
                                <MessageSquare className="w-5 h-5 text-green-500" />
                                WhatsApp
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {/* WhatsApp Number */}
                            <div className="space-y-2">
                                <Label className="text-sm text-muted-foreground">WhatsApp Number</Label>
                                {isEditingNumber ? (
                                    <div className="flex gap-2">
                                        <Input
                                            type="tel"
                                            value={tempNumber}
                                            onChange={(e) => setTempNumber(e.target.value)}
                                            placeholder="+1 234 567 8900"
                                            className="bg-white/[0.02] border-white/[0.08]"
                                        />
                                        <Button size="icon" variant="ghost" onClick={handleSaveNumber}>
                                            <Save className="w-4 h-4 text-green-500" />
                                        </Button>
                                        <Button size="icon" variant="ghost" onClick={() => {
                                            setTempNumber(whatsappNumber);
                                            setIsEditingNumber(false);
                                        }}>
                                            <X className="w-4 h-4" />
                                        </Button>
                                    </div>
                                ) : (
                                    <div
                                        className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] cursor-pointer hover:bg-white/[0.04] transition-colors"
                                        onClick={() => setIsEditingNumber(true)}
                                    >
                                        <div className="flex items-center gap-2">
                                            <Phone className="w-4 h-4 text-green-500" />
                                            <span>{whatsappNumber || "Add number"}</span>
                                        </div>
                                        <Edit className="w-4 h-4 text-muted-foreground" />
                                    </div>
                                )}
                            </div>

                            {/* Auto-send Toggle */}
                            <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                                <div>
                                    <Label className="font-medium">Auto-send messages</Label>
                                    <p className="text-xs text-muted-foreground mt-1">
                                        Automatically send on special days
                                    </p>
                                </div>
                                <Switch
                                    checked={autoSend}
                                    onCheckedChange={setAutoSend}
                                    className="data-[state=checked]:bg-green-500"
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
