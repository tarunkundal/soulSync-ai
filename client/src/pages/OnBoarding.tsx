import {
    ArrowLeft,
    ArrowRight,
    Briefcase,
    Calendar,
    Check,
    Heart,
    MessageSquare,
    Sparkles,
    User,
    Users,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { cn } from "../lib/utils";

const steps = [
    { id: 1, title: "Add Person", icon: User },
    { id: 2, title: "Relationship", icon: Users },
    { id: 3, title: "Important Dates", icon: Calendar },
    { id: 4, title: "Message Style", icon: MessageSquare },
    { id: 5, title: "Connect WhatsApp", icon: Check },
];

const relationships = [
    { id: "friend", label: "Friend", icon: Users, color: "accent-teal" },
    { id: "parent", label: "Parent", icon: Heart, color: "accent-pink" },
    { id: "partner", label: "Partner", icon: Heart, color: "accent-violet" },
    { id: "colleague", label: "Colleague", icon: Briefcase, color: "accent-lime" },
];

const messageStyles = [
    { id: "funny", label: "Funny", emoji: "😄", description: "Light-hearted and humorous" },
    { id: "romantic", label: "Romantic", emoji: "💕", description: "Sweet and loving" },
    { id: "emotional", label: "Emotional", emoji: "🥹", description: "Heartfelt and touching" },
    { id: "professional", label: "Professional", emoji: "💼", description: "Formal and respectful" },
];

export default function Onboarding() {
    const [currentStep, setCurrentStep] = useState(1);
    const [personName, setPersonName] = useState("");
    const [selectedRelationship, setSelectedRelationship] = useState("");
    const [birthday, setBirthday] = useState("");
    const [anniversary, setAnniversary] = useState("");
    const [selectedStyle, setSelectedStyle] = useState("");
    const navigate = useNavigate();

    const handleNext = () => {
        if (currentStep < 5) {
            setCurrentStep(currentStep + 1);
        } else {
            navigate("/dashboard");
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleSkip = () => {
        navigate("/dashboard");
    };

    return (
        <div className="min-h-screen flex flex-col bg-background">
            {/* Background Effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-accent-pink/8 rounded-full blur-[150px]" />
                <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-accent-violet/8 rounded-full blur-[150px]" />
            </div>

            {/* Header */}
            <header className="relative z-10 flex items-center justify-between p-6">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-pink to-accent-violet flex items-center justify-center">
                        <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-bold text-lg">SoulSync AI</span>
                </div>
                <Button variant="ghost" onClick={handleSkip} className="text-muted-foreground">
                    Skip for now
                </Button>
            </header>

            {/* Progress Bar */}
            <div className="relative z-10 px-6 mb-8">
                <div className="max-w-2xl mx-auto">
                    <div className="flex items-center justify-between mb-4">
                        {steps.map((step, index) => (
                            <div key={step.id} className="flex items-center">
                                <div
                                    className={cn(
                                        "w-10 h-10 rounded-full flex items-center justify-center transition-all",
                                        currentStep >= step.id
                                            ? "bg-gradient-to-br from-accent-pink to-accent-violet shadow-[0_0_20px_rgba(236,72,153,0.4)]"
                                            : "bg-white/[0.04] border border-white/[0.08]"
                                    )}
                                >
                                    {currentStep > step.id ? (
                                        <Check className="w-5 h-5 text-white" />
                                    ) : (
                                        <step.icon
                                            className={cn(
                                                "w-5 h-5",
                                                currentStep >= step.id ? "text-white" : "text-muted-foreground"
                                            )}
                                        />
                                    )}
                                </div>
                                {index < steps.length - 1 && (
                                    <div
                                        className={cn(
                                            "w-16 lg:w-24 h-0.5 mx-2 transition-all",
                                            currentStep > step.id ? "bg-accent-pink" : "bg-white/[0.08]"
                                        )}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                    <p className="text-center text-sm text-muted-foreground">
                        Step {currentStep} of {steps.length}: {steps[currentStep - 1].title}
                    </p>
                </div>
            </div>

            {/* Step Content */}
            <div className="flex-1 flex items-center justify-center px-6 pb-6 relative z-10">
                <div className="w-full max-w-lg">
                    {/* Step 1: Add Person */}
                    {currentStep === 1 && (
                        <div className="glass-card p-8 rounded-2xl border border-white/[0.08] animate-fade-up">
                            <h2 className="text-2xl font-bold mb-2">Add your first person</h2>
                            <p className="text-muted-foreground mb-6">
                                Who do you want to never forget?
                            </p>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Their Name</Label>
                                    <Input
                                        id="name"
                                        placeholder="e.g., Mom, John, Sarah..."
                                        value={personName}
                                        onChange={(e) => setPersonName(e.target.value)}
                                        className="bg-white/[0.02] border-white/[0.08] focus:border-accent-pink/50 h-12 text-lg"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 2: Relationship */}
                    {currentStep === 2 && (
                        <div className="glass-card p-8 rounded-2xl border border-white/[0.08] animate-fade-up">
                            <h2 className="text-2xl font-bold mb-2">What's your relationship?</h2>
                            <p className="text-muted-foreground mb-6">
                                This helps AI personalize messages for {personName || "them"}
                            </p>
                            <div className="grid grid-cols-2 gap-4">
                                {relationships.map((rel) => (
                                    <button
                                        key={rel.id}
                                        onClick={() => setSelectedRelationship(rel.id)}
                                        className={cn(
                                            "p-4 rounded-xl border transition-all text-left",
                                            selectedRelationship === rel.id
                                                ? `bg-${rel.color}/10 border-${rel.color}/50 shadow-[0_0_20px_rgba(236,72,153,0.2)]`
                                                : "bg-white/[0.02] border-white/[0.08] hover:bg-white/[0.04]"
                                        )}
                                    >
                                        <rel.icon
                                            className={cn(
                                                "w-6 h-6 mb-2",
                                                selectedRelationship === rel.id
                                                    ? `text-${rel.color}`
                                                    : "text-muted-foreground"
                                            )}
                                        />
                                        <p className="font-medium">{rel.label}</p>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Step 3: Important Dates */}
                    {currentStep === 3 && (
                        <div className="glass-card p-8 rounded-2xl border border-white/[0.08] animate-fade-up">
                            <h2 className="text-2xl font-bold mb-2">Important dates</h2>
                            <p className="text-muted-foreground mb-6">
                                When should we remind you about {personName || "them"}?
                            </p>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="birthday">Birthday</Label>
                                    <Input
                                        id="birthday"
                                        type="date"
                                        value={birthday}
                                        onChange={(e) => setBirthday(e.target.value)}
                                        className="bg-white/[0.02] border-white/[0.08] focus:border-accent-pink/50"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="anniversary">Anniversary (optional)</Label>
                                    <Input
                                        id="anniversary"
                                        type="date"
                                        value={anniversary}
                                        onChange={(e) => setAnniversary(e.target.value)}
                                        className="bg-white/[0.02] border-white/[0.08] focus:border-accent-pink/50"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 4: Message Style */}
                    {currentStep === 4 && (
                        <div className="glass-card p-8 rounded-2xl border border-white/[0.08] animate-fade-up">
                            <h2 className="text-2xl font-bold mb-2">Choose message style</h2>
                            <p className="text-muted-foreground mb-6">
                                How should AI write messages for {personName || "them"}?
                            </p>
                            <div className="space-y-3">
                                {messageStyles.map((style) => (
                                    <button
                                        key={style.id}
                                        onClick={() => setSelectedStyle(style.id)}
                                        className={cn(
                                            "w-full p-4 rounded-xl border transition-all text-left flex items-center gap-4",
                                            selectedStyle === style.id
                                                ? "bg-accent-pink/10 border-accent-pink/50"
                                                : "bg-white/[0.02] border-white/[0.08] hover:bg-white/[0.04]"
                                        )}
                                    >
                                        <span className="text-2xl">{style.emoji}</span>
                                        <div>
                                            <p className="font-medium">{style.label}</p>
                                            <p className="text-sm text-muted-foreground">{style.description}</p>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Step 5: Connect WhatsApp */}
                    {currentStep === 5 && (
                        <div className="glass-card p-8 rounded-2xl border border-white/[0.08] animate-fade-up text-center">
                            <div className="w-16 h-16 rounded-2xl bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                                <MessageSquare className="w-8 h-8 text-green-500" />
                            </div>
                            <h2 className="text-2xl font-bold mb-2">Connect WhatsApp</h2>
                            <p className="text-muted-foreground mb-6">
                                Enable automatic message sending via WhatsApp
                            </p>
                            <Button
                                variant="outline"
                                className="w-full mb-4 bg-green-500/10 border-green-500/30 hover:bg-green-500/20 text-green-500"
                            >
                                <MessageSquare className="w-4 h-4 mr-2" />
                                Connect WhatsApp Business
                            </Button>
                            <p className="text-xs text-muted-foreground">
                                You can set this up later in Settings
                            </p>
                        </div>
                    )}

                    {/* Navigation Buttons */}
                    <div className="flex gap-4 mt-6">
                        {currentStep > 1 && (
                            <Button
                                variant="outline"
                                onClick={handleBack}
                                className="flex-1 bg-white/[0.02] border-white/[0.08]"
                            >
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Back
                            </Button>
                        )}
                        <Button
                            onClick={handleNext}
                            className={cn(
                                "flex-1 bg-gradient-to-r from-accent-pink to-accent-violet hover:opacity-90",
                                currentStep === 1 && "w-full"
                            )}
                        >
                            {currentStep === 5 ? "Get Started" : "Continue"}
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
