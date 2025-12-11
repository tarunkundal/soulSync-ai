import {
    Clock,
    Eye,
    Gift,
    Grid3X3,
    List,
    MoreHorizontal,
    Plus,
    Search,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { cn } from "../lib/utils";

const mockPeople = [
    {
        id: 1,
        name: "Mom",
        relationship: "Parent",
        birthday: "Dec 8",
        nextEvent: "Birthday",
        daysLeft: 4,
        avatar: "👩",
        color: "accent-pink",
    },
    {
        id: 2,
        name: "John Smith",
        relationship: "Colleague",
        birthday: "Mar 15",
        nextEvent: "Work Anniversary",
        daysLeft: 8,
        avatar: "👨",
        color: "accent-lime",
    },
    {
        id: 3,
        name: "Sarah",
        relationship: "Friend",
        birthday: "Dec 15",
        nextEvent: "Birthday",
        daysLeft: 11,
        avatar: "👧",
        color: "accent-teal",
    },
    {
        id: 4,
        name: "Dad",
        relationship: "Parent",
        birthday: "Feb 20",
        nextEvent: "Birthday",
        daysLeft: 78,
        avatar: "👴",
        color: "accent-pink",
    },
    {
        id: 5,
        name: "Emily",
        relationship: "Partner",
        birthday: "Jun 10",
        nextEvent: "Anniversary",
        daysLeft: 188,
        avatar: "💕",
        color: "accent-violet",
    },
    {
        id: 6,
        name: "Alex",
        relationship: "Friend",
        birthday: "Jan 5",
        nextEvent: "Birthday",
        daysLeft: 32,
        avatar: "🧑",
        color: "accent-teal",
    },
];

export default function People() {
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
    const [searchQuery, setSearchQuery] = useState("");
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const navigate = useNavigate();

    const filteredPeople = mockPeople.filter((person) =>
        person.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="p-6 lg:p-8 max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold mb-2">People</h1>
                    <p className="text-muted-foreground">
                        Manage the people you care about
                    </p>
                </div>
                <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                    <DialogTrigger asChild>
                        <Button className="bg-gradient-to-r from-accent-pink to-accent-violet hover:opacity-90">
                            <Plus className="w-4 h-4 mr-2" />
                            Add Person
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="glass-card border-white/[0.08]">
                        <DialogHeader>
                            <DialogTitle>Add New Person</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 mt-4">
                            <div className="space-y-2">
                                <Label>Name</Label>
                                <Input
                                    placeholder="Enter name"
                                    className="bg-white/[0.02] border-white/[0.08]"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Relationship</Label>
                                <div className="grid grid-cols-2 gap-2">
                                    {["Friend", "Parent", "Partner", "Colleague"].map((rel) => (
                                        <Button
                                            key={rel}
                                            variant="outline"
                                            className="bg-white/[0.02] border-white/[0.08] justify-start"
                                        >
                                            {rel}
                                        </Button>
                                    ))}
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label>Birthday</Label>
                                <Input
                                    type="date"
                                    className="bg-white/[0.02] border-white/[0.08]"
                                />
                                {/* <Calendar /> */}
                            </div>
                            <Button
                                className="w-full bg-gradient-to-r from-accent-pink to-accent-violet"
                                onClick={() => setIsAddDialogOpen(false)}
                            >
                                Add Person
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                        placeholder="Search people..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 bg-white/[0.02] border-white/[0.08] focus:border-accent-pink/50"
                    />
                </div>
                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setViewMode("grid")}
                        className={cn(
                            "bg-white/[0.02] border-white/[0.08]",
                            viewMode === "grid" && "border-accent-pink/50 text-accent-pink"
                        )}
                    >
                        <Grid3X3 className="w-4 h-4" />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setViewMode("list")}
                        className={cn(
                            "bg-white/[0.02] border-white/[0.08]",
                            viewMode === "list" && "border-accent-pink/50 text-accent-pink"
                        )}
                    >
                        <List className="w-4 h-4" />
                    </Button>
                </div>
            </div>

            {/* People Grid/List */}
            <div
                className={cn(
                    viewMode === "grid"
                        ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                        : "space-y-3"
                )}
            >
                {filteredPeople.map((person) => (
                    <Card
                        key={person.id}
                        onClick={() => navigate(`/people/${person.id}`)}
                        className={cn(
                            "glass-card border-white/[0.08] hover:border-white/[0.15] transition-all cursor-pointer group",
                            viewMode === "list" && "flex items-center"
                        )}
                    >
                        <div className={cn("p-5", viewMode === "list" && "flex items-center gap-4 flex-1")}>
                            {/* Avatar */}
                            <div
                                className={cn(
                                    "w-14 h-14 rounded-2xl bg-gradient-to-br flex items-center justify-center text-3xl",
                                    `from-${person.color}/20 to-${person.color}/5`,
                                    viewMode === "grid" && "mb-4"
                                )}
                            >
                                {person.avatar}
                            </div>

                            {/* Info */}
                            <div className={cn(viewMode === "list" && "flex-1")}>
                                <div className="flex items-center justify-between mb-1">
                                    <h3 className="font-semibold text-lg">{person.name}</h3>
                                    {viewMode === "grid" && (
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <MoreHorizontal className="w-4 h-4" />
                                        </Button>
                                    )}
                                </div>
                                <p className={cn("text-sm text-muted-foreground mb-3", `text-${person.color}`)}>
                                    {person.relationship}
                                </p>

                                {viewMode === "grid" && (
                                    <>
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                                            <Gift className="w-4 h-4" />
                                            <span>Birthday: {person.birthday}</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2 text-sm">
                                                {/* <Calendar className="w-4 h-4 text-accent-teal" /> */}
                                                <span>{person.nextEvent}</span>
                                            </div>
                                            <div
                                                className={cn(
                                                    "flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium",
                                                    person.daysLeft <= 7
                                                        ? "bg-accent-pink/10 text-accent-pink"
                                                        : "bg-white/[0.06] text-muted-foreground"
                                                )}
                                            >
                                                <Clock className="w-3 h-3" />
                                                {person.daysLeft}d
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>

                            {/* List View Extra */}
                            {viewMode === "list" && (
                                <>
                                    <div className="text-sm text-muted-foreground">
                                        <p>{person.birthday}</p>
                                    </div>
                                    <div className="text-sm">
                                        <p className="text-accent-teal">{person.nextEvent}</p>
                                        <p className="text-muted-foreground">{person.daysLeft} days</p>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="text-muted-foreground hover:text-foreground"
                                    >
                                        <Eye className="w-4 h-4 mr-2" />
                                        View
                                    </Button>
                                </>
                            )}
                        </div>
                    </Card>
                ))}
            </div>

            {filteredPeople.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-muted-foreground">No people found</p>
                </div>
            )}
        </div>
    );
}
