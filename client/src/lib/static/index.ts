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
]

export const relationshipGradient: Record<string, string> = {
    friend: "from-accent-teal/20 to-accent-teal/5",
    parent: "from-accent-pink/20 to-accent-pink/5",
    partner: "from-accent-violet/20 to-accent-violet/5",
    colleague: "from-accent-lime/20 to-accent-lime/5",
};

export const relationshipColors: Record<string, string> = { friend: "accent-teal", parent: "accent-pink", partner: "accent-violet", colleague: "accent-lime", };

export const relationshipAvatars: Record<string, string> = {
    friend: "🧑",
    parent: "👩‍🦳",
    partner: "💕",
    colleague: "👨‍💼",
};