import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
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
import { GetAllPeopleDocument } from "@/graphql/generated/graphql";
import { capitalizeFirst, getDaysLeft } from "@/lib/helpers";
import { cn } from "@/lib/utils";
import { useQuery } from "@apollo/client/react";
import { format } from "date-fns";
import {
    Calendar as CalendarIcon,
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

const relationshipGradient: Record<string, string> = {
    friend: "from-accent-teal/20 to-accent-teal/5",
    parent: "from-accent-pink/20 to-accent-pink/5",
    partner: "from-accent-violet/20 to-accent-violet/5",
    colleague: "from-accent-lime/20 to-accent-lime/5",
};
const relationshipColors: Record<string, string> = { friend: "accent-teal", parent: "accent-pink", partner: "accent-violet", colleague: "accent-lime", };
const relationshipAvatars: Record<string, string> = {
    friend: "🧑",
    parent: "👩‍🦳",
    partner: "💕",
    colleague: "👨‍💼",
};


export default function People() {
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
    const [searchQuery, setSearchQuery] = useState("");
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    // const [birthdayDate, setBirthdayDate] = useState<Date>();
    const [personData, setPersonData] = useState({
        name: "",
        relationshipType: "",
        phoneNumber: "",
        aiTonePreference: "",
        whatsappEnabled: false,
        birthdayDate: undefined as Date | undefined,
    });
    const navigate = useNavigate();

    // query to get all the people
    const { data, loading, error } = useQuery(GetAllPeopleDocument)
    const allPeople = data?.getAllPeople.people || []

    console.log('allpeope', allPeople);


    const filteredPeople = allPeople.filter((person) =>
        person.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const handleNewPersonAdd = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        // Logic to add new person goes here
        // setIsAddDialogOpen(false);
        console.log('userdata', personData);

    }
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
                            <DialogDescription>
                                Add someone you want to remember and celebrate
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleNewPersonAdd}>
                            <div className="space-y-4 mt-4">
                                <div className="space-y-2">
                                    <Label>Name</Label>
                                    <Input
                                        placeholder="Enter name"
                                        className="bg-white/[0.02] border-white/[0.08]"
                                        value={personData.name}
                                        onChange={(e) =>
                                            setPersonData({ ...personData, name: e.target.value })
                                        }
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Relationship</Label>
                                    <div className="grid grid-cols-2 gap-2">
                                        {["Friend", "Parent", "Partner", "Colleague"].map((rel) => (
                                            <Button
                                                key={rel}
                                                variant="outline"
                                                className={cn(
                                                    "bg-white/[0.02] border-white/[0.08] justify-start",
                                                    personData.relationshipType === rel && "border-accent-pink/50 bg-accent-pink/10 text-accent-pink"
                                                )}
                                                onClick={() => setPersonData({ ...personData, relationshipType: rel })}
                                            >
                                                {rel}
                                            </Button>
                                        ))}
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label>Birthday</Label>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                className={cn(
                                                    "w-full justify-start text-left font-normal bg-white/[0.02] border-white/[0.08]",
                                                    !personData.birthdayDate && "text-muted-foreground"
                                                )}
                                            >
                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                {personData.birthdayDate ? format(personData.birthdayDate, "PPP") : <span>Pick a date</span>}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0 bg-card border-border" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={personData.birthdayDate}
                                                onSelect={(date) => {
                                                    setPersonData({ ...personData, birthdayDate: date || undefined });
                                                }}
                                                initialFocus
                                                className="pointer-events-auto"
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </div>
                                <Button
                                    className="w-full bg-gradient-to-r from-accent-pink to-accent-violet"
                                    onClick={() => setIsAddDialogOpen(false)}
                                    type="submit"
                                >
                                    Add Person
                                </Button>
                            </div>
                        </form>
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
                                    relationshipGradient[person.relationshipType.toLowerCase()],
                                    viewMode === "grid" && "mb-4"
                                )}
                            >
                                {relationshipAvatars[person.relationshipType.toLowerCase() as keyof typeof relationshipAvatars]}
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
                                <p className={cn("text-sm text-muted-foreground mb-3", `text-${relationshipColors[person.relationshipType]}`)}>
                                    {capitalizeFirst(person.relationshipType)}
                                </p>

                                {viewMode === "grid" && (
                                    <>
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                                            <Gift className="w-4 h-4" />
                                            <span>Birthday: {person.importantDates[0].dateValue as string}</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2 text-sm">
                                                <CalendarIcon className="w-4 h-4 text-accent-teal" />
                                                <span>{person.importantDates?.[1]?.dateType ?? '-'}</span>
                                            </div>
                                            <div
                                                className={cn(
                                                    "flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium",
                                                    getDaysLeft(person.importantDates[0].dateValue as string) <= 7
                                                        ? "bg-accent-pink/10 text-accent-pink"
                                                        : "bg-white/[0.06] text-muted-foreground"
                                                )}
                                            >
                                                <Clock className="w-3 h-3" />
                                                {getDaysLeft(person.importantDates[0].dateValue as string)}d
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>

                            {/* List View Extra */}
                            {viewMode === "list" && (
                                <>
                                    <div className="text-sm text-muted-foreground">
                                        <p>{person.importantDates[0].dateValue as string}</p>
                                    </div>
                                    <div className="text-sm">
                                        <p className="text-accent-teal">{person.importantDates?.[1]?.dateType ?? "-"}</p>
                                        <p className="text-muted-foreground">{getDaysLeft(person.importantDates[0].dateValue as string)} days</p>
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