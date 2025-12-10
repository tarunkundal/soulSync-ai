import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Slider } from "../components/ui/slider";
import { Label } from "../components/ui/label";
import {
    Sparkles,
    MessageSquare,
    Image,
    RefreshCw,
    Copy,
    Save,
    Send,
    Check,
    Download,
} from "lucide-react";
import { cn } from "../lib/utils";

const messageStyles = [
    { id: "funny", label: "Funny", emoji: "😄" },
    { id: "romantic", label: "Romantic", emoji: "💕" },
    { id: "emotional", label: "Emotional", emoji: "🥹" },
    { id: "professional", label: "Professional", emoji: "💼" },
    { id: "savage", label: "Savage", emoji: "🔥" },
];

const cardTemplates = [
    { id: 1, name: "Birthday Celebration", color: "from-pink-500 to-purple-500" },
    { id: 2, name: "Anniversary Love", color: "from-red-500 to-pink-500" },
    { id: 3, name: "Festive Wishes", color: "from-orange-500 to-yellow-500" },
    { id: 4, name: "Professional", color: "from-blue-500 to-cyan-500" },
    { id: 5, name: "Minimal Elegant", color: "from-gray-600 to-gray-800" },
    { id: 6, name: "Neon Glow", color: "from-violet-500 to-fuchsia-500" },
];

const mockGeneratedMessage = `Happy Birthday Mom! 🎂

Another year of your incredible love and support, and I still can't believe how lucky I am to have you as my mom.

Your warmth lights up every room, your wisdom guides me through every challenge, and your hugs still feel like home no matter how old I get.

Thank you for being my biggest cheerleader, my shoulder to cry on, and my best friend all rolled into one amazing person.

Here's to celebrating YOU today! May this year bring you as much joy as you've given me throughout my entire life.

Love you to the moon and back! 💕`;

export default function AIGenerator() {
    const [selectedStyle, setSelectedStyle] = useState("emotional");
    const [messageLength, setMessageLength] = useState([50]);
    const [generatedMessage, setGeneratedMessage] = useState(mockGeneratedMessage);
    const [isGenerating, setIsGenerating] = useState(false);
    const [copied, setCopied] = useState(false);
    const [selectedTemplate, setSelectedTemplate] = useState(1);

    const handleGenerate = () => {
        setIsGenerating(true);
        setTimeout(() => {
            setIsGenerating(false);
        }, 1500);
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(generatedMessage);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="p-6 lg:p-8 max-w-6xl mx-auto">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
                    <Sparkles className="w-8 h-8 text-accent-violet" />
                    AI Generator
                </h1>
                <p className="text-muted-foreground">
                    Create personalized messages and beautiful cards with AI
                </p>
            </div>

            <Tabs defaultValue="messages" className="space-y-6">
                <TabsList className="glass-card border border-white/[0.08] p-1">
                    <TabsTrigger
                        value="messages"
                        className="data-[state=active]:bg-accent-pink/20 data-[state=active]:text-accent-pink"
                    >
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Messages
                    </TabsTrigger>
                    <TabsTrigger
                        value="cards"
                        className="data-[state=active]:bg-accent-teal/20 data-[state=active]:text-accent-teal"
                    >
                        <Image className="w-4 h-4 mr-2" />
                        Cards
                    </TabsTrigger>
                </TabsList>

                {/* Messages Tab */}
                <TabsContent value="messages" className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Settings */}
                        <Card className="glass-card border-white/[0.08]">
                            <CardHeader>
                                <CardTitle className="text-lg">Message Settings</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {/* Style Selection */}
                                <div className="space-y-3">
                                    <Label>Message Style</Label>
                                    <div className="grid grid-cols-2 gap-2">
                                        {messageStyles.map((style) => (
                                            <button
                                                key={style.id}
                                                onClick={() => setSelectedStyle(style.id)}
                                                className={cn(
                                                    "p-3 rounded-xl border transition-all text-left flex items-center gap-2",
                                                    selectedStyle === style.id
                                                        ? "bg-accent-pink/10 border-accent-pink/50"
                                                        : "bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.07]"
                                                )}
                                            >
                                                <span>{style.emoji}</span>
                                                <span className="text-sm font-medium">{style.label}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Length Slider */}
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <Label>Message Length</Label>
                                        <span className="text-sm text-muted-foreground">
                                            {messageLength[0] < 33
                                                ? "Short"
                                                : messageLength[0] < 66
                                                    ? "Medium"
                                                    : "Long"}
                                        </span>
                                    </div>
                                    <Slider
                                        value={messageLength}
                                        onValueChange={setMessageLength}
                                        max={100}
                                        step={1}
                                        className="py-2"
                                    />
                                </div>

                                {/* Generate Button */}
                                <Button
                                    onClick={handleGenerate}
                                    disabled={isGenerating}
                                    className="w-full bg-gradient-to-r from-accent-pink to-accent-violet hover:opacity-90"
                                >
                                    {isGenerating ? (
                                        <>
                                            <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                                            Generating...
                                        </>
                                    ) : (
                                        <>
                                            <Sparkles className="w-4 h-4 mr-2" />
                                            Generate Message
                                        </>
                                    )}
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Generated Output */}
                        <Card className="lg:col-span-2 glass-card border-white/[0.08]">
                            <CardHeader className="flex flex-row items-center justify-between">
                                <CardTitle className="text-lg">Generated Message</CardTitle>
                                <div className="flex gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={handleGenerate}
                                        className="bg-white/[0.02] border-white/[0.08]"
                                    >
                                        <RefreshCw className="w-4 h-4 mr-2" />
                                        Regenerate
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="relative">
                                    <div
                                        className={cn(
                                            "p-6 rounded-xl bg-white/[0.02] border border-white/[0.06] min-h-[300px] whitespace-pre-wrap transition-all",
                                            isGenerating && "animate-pulse"
                                        )}
                                    >
                                        {generatedMessage}
                                    </div>

                                    {/* Neon Border Effect */}
                                    <div className="absolute inset-0 rounded-xl pointer-events-none border border-accent-pink/20 shadow-[0_0_15px_rgba(236,72,153,0.1)]" />
                                </div>

                                {/* Actions */}
                                <div className="flex gap-3 mt-4">
                                    <Button
                                        variant="outline"
                                        onClick={handleCopy}
                                        className="flex-1 bg-white/[0.02] border-white/[0.08]"
                                    >
                                        {copied ? (
                                            <>
                                                <Check className="w-4 h-4 mr-2 text-green-500" />
                                                Copied!
                                            </>
                                        ) : (
                                            <>
                                                <Copy className="w-4 h-4 mr-2" />
                                                Copy
                                            </>
                                        )}
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="flex-1 bg-white/[0.02] border-white/[0.08]"
                                    >
                                        <Save className="w-4 h-4 mr-2" />
                                        Save
                                    </Button>
                                    <Button className="flex-1 bg-green-500/10 text-green-500 hover:bg-green-500/20 border border-green-500/20">
                                        <Send className="w-4 h-4 mr-2" />
                                        Send via WhatsApp
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                {/* Cards Tab */}
                <TabsContent value="cards" className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Template Selection */}
                        <Card className="glass-card border-white/[0.08]">
                            <CardHeader>
                                <CardTitle className="text-lg">Card Templates</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                {cardTemplates.map((template) => (
                                    <button
                                        key={template.id}
                                        onClick={() => setSelectedTemplate(template.id)}
                                        className={cn(
                                            "w-full p-4 rounded-xl border transition-all text-left flex items-center gap-3",
                                            selectedTemplate === template.id
                                                ? "bg-accent-teal/10 border-accent-teal/50"
                                                : "bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.04]"
                                        )}
                                    >
                                        <div
                                            className={cn(
                                                "w-10 h-10 rounded-lg bg-gradient-to-br",
                                                template.color
                                            )}
                                        />
                                        <span className="font-medium">{template.name}</span>
                                    </button>
                                ))}
                            </CardContent>
                        </Card>

                        {/* Card Preview */}
                        <Card className="lg:col-span-2 glass-card border-white/[0.08]">
                            <CardHeader>
                                <CardTitle className="text-lg">Card Preview</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center relative overflow-hidden">
                                    {/* Card Content */}
                                    <div className="absolute inset-0 bg-black/20" />
                                    <div className="relative z-10 text-center p-8">
                                        <p className="text-4xl mb-4">🎂</p>
                                        <h2 className="text-3xl font-bold text-white mb-2">
                                            Happy Birthday!
                                        </h2>
                                        <p className="text-white/80">
                                            Wishing you all the love and happiness
                                        </p>
                                    </div>
                                    {/* Decorative Elements */}
                                    <div className="absolute top-4 left-4 w-20 h-20 border-2 border-white/20 rounded-full" />
                                    <div className="absolute bottom-4 right-4 w-16 h-16 border-2 border-white/20 rounded-full" />
                                </div>

                                {/* Actions */}
                                <div className="flex gap-3 mt-4">
                                    <Button
                                        onClick={handleGenerate}
                                        disabled={isGenerating}
                                        className="flex-1 bg-gradient-to-r from-accent-teal to-accent-violet hover:opacity-90"
                                    >
                                        {isGenerating ? (
                                            <>
                                                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                                                Generating...
                                            </>
                                        ) : (
                                            <>
                                                <Sparkles className="w-4 h-4 mr-2" />
                                                Generate Card
                                            </>
                                        )}
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="flex-1 bg-white/[0.02] border-white/[0.08]"
                                    >
                                        <Download className="w-4 h-4 mr-2" />
                                        Download
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}
