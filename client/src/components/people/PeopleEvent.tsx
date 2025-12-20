import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { AddNewImportantDateDocument, GetPersonDetailsQuery } from '@/graphql/generated/graphql';
import { useToast } from '@/hooks/use-toast';
import { capitalizeFirst } from '@/lib/helpers';
import { eventTypes } from '@/lib/static';
import { cn } from '@/lib/utils';
import { useMutation } from '@apollo/client/react';
import { format } from "date-fns";
import { Calendar, CalendarIcon, Gift, Heart, Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Spinner } from '../ui/spinner';
import { Switch } from '../ui/switch';

interface PeopleEventProps {
    personId: string | null;
    personData: GetPersonDetailsQuery["getPersonDetails"]["person"] | undefined;
}

const PeopleEvent = ({ personId, personData }: PeopleEventProps) => {
    const { toast } = useToast();
    const [events, setEvents] = useState([]);
    const [isAddEventOpen, setIsAddEventOpen] = useState(false);
    const [newEventType, setNewEventType] = useState("");
    const [newEventDate, setNewEventDate] = useState<Date>();
    const [newEventRecurring, setNewEventRecurring] = useState(true);
    const [customEventName, setCustomEventName] = useState("");

    const [addNewImportantDateMutation, { data: newImportantDate, loading: isEventLoading, error: eventError }] = useMutation(AddNewImportantDateDocument)

    useEffect(() => {
        if (!personData) return;
        setEvents(personData.importantDates.map((event) => ({
            id: event.id,
            type: capitalizeFirst(event.dateType),
            date: format(new Date(event.dateValue as string), "MMM d"),
            recurring: true,
        })))
    }, [personData]);

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

        // Call mutation to add important date
        addNewImportantDateMutation({
            variables: {
                input: {
                    dateType: eventName,
                    dateValue: newEventDate.toISOString().split('T')[0],
                    personId: personId as string,
                }
            }
        })

        if (newImportantDate) {
            setEvents([...events, newEvent]);
            setIsAddEventOpen(false);
            setNewEventType("");
            setNewEventDate(undefined);
            setNewEventRecurring(true);
            setCustomEventName("");
            toast({
                title: "Event added",
                description: `${eventName} has been added to ${personData.name}'s important dates.`,
            });
        }
        if (eventError) {
            toast({
                title: "Error",
                description: "There was an error adding the event. Please try again.",
                variant: "destructive",
            });
        }
    };


    return (
        <Card className="glass-card border-white/[0.08]">
            <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-accent-teal" />
                    Important Dates
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
                {(events || []).map((event) => (
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
                                Add a special date for {personData.name}
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
                                disabled={isEventLoading}
                            >
                                {isEventLoading && <Spinner />}
                                Add Event
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </CardContent>
        </Card>
    )
}

export default PeopleEvent