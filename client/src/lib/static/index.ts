import { Cake, Calendar, Heart, PartyPopper, Star } from "lucide-react";

export const eventTypes = [
    { value: "Birthday", icon: Cake, color: "text-accent-pink" },
    { value: "Anniversary", icon: Heart, color: "text-accent-violet" },
    { value: "Wedding", icon: PartyPopper, color: "text-accent-teal" },
    { value: "Graduation", icon: Star, color: "text-accent-lime" },
    { value: "Other", icon: Calendar, color: "text-muted-foreground" },
];

export const toneOptions = [
    { id: "funny", label: "Funny", emoji: "😄" },
    { id: "romantic", label: "Romantic", emoji: "💕" },
    { id: "emotional", label: "Emotional", emoji: "🥹" },
    { id: "professional", label: "Professional", emoji: "💼" },
];