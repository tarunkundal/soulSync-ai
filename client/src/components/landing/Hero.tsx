import { Button } from "@/components/ui/button";
import ROUTES from "@/routes";
import { ArrowRight, Play } from "lucide-react";
import { useNavigate } from "react-router-dom";
// import aiOrb from "@/assets/ai";

const Hero = () => {
    const navigate = useNavigate()
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Background effects */}
            <div className="absolute inset-0 hero-gradient" />
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px]" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-[128px]" />

            {/* Grid pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />

            <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left content */}
                    <div className="text-center lg:text-left space-y-8">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card animate-fade-up">
                            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                            <span className="text-sm text-muted-foreground">AI-Powered Reminders</span>
                        </div>

                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold leading-tight animate-fade-up-delay-1">
                            Never Forget a{" "}
                            <span className="gradient-text">Special Moment</span>
                            {" "}Again.
                        </h1>

                        <p className="text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 animate-fade-up-delay-2">
                            Your AI agent remembers the dates that matter — and sends personalized messages & cards automatically.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start animate-fade-up-delay-3">
                            <Button variant="hero" size="xl" className="w-full sm:w-auto" onClick={() => window.open(
                                ROUTES.WHATSAPP_CONNECT_LINK,
                                "_blank"
                            )}>
                                Connect to WhatsApp
                                <ArrowRight className="w-5 h-5" />
                            </Button>
                            <Button variant="heroOutline" size="xl" className="w-full sm:w-auto">
                                <Play className="w-5 h-5" />
                                Try a Demo
                            </Button>
                        </div>

                        <div className="flex items-center gap-6 justify-center lg:justify-start pt-4 animate-fade-up-delay-3">
                            <div className="flex -space-x-3">
                                {[1, 2, 3, 4].map((i) => (
                                    <div
                                        key={i}
                                        className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/50 to-secondary/50 border-2 border-background flex items-center justify-center text-xs font-medium"
                                    >
                                        {String.fromCharCode(64 + i)}
                                    </div>
                                ))}
                            </div>
                            <div className="text-left">
                                <p className="text-foreground font-medium">10,000+ users</p>
                                <p className="text-sm text-muted-foreground">Trust SoulSync AI</p>
                            </div>
                        </div>
                    </div>

                    {/* Right content - AI Orb */}
                    <div className="relative flex items-center justify-center">
                        <div className="relative w-80 h-80 lg:w-[450px] lg:h-[450px]">
                            {/* Outer glow ring */}
                            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 blur-3xl animate-pulse-glow" />

                            {/* Orbiting particles */}
                            <div className="absolute inset-0 animate-[spin_20s_linear_infinite]">
                                <div className="absolute top-0 left-1/2 w-3 h-3 -ml-1.5 rounded-full bg-primary shadow-lg shadow-primary/50" />
                            </div>
                            <div className="absolute inset-0 animate-[spin_15s_linear_infinite_reverse]">
                                <div className="absolute bottom-0 left-1/2 w-2 h-2 -ml-1 rounded-full bg-secondary shadow-lg shadow-secondary/50" />
                            </div>
                            <div className="absolute inset-4 animate-[spin_25s_linear_infinite]">
                                <div className="absolute top-1/2 right-0 w-2 h-2 rounded-full bg-neon-teal shadow-lg shadow-neon-teal/50" />
                            </div>

                            {/* Main orb image */}
                            <img
                                // src={aiOrb}
                                alt="AI Assistant Orb"
                                className="relative z-10 w-full h-full object-contain animate-float drop-shadow-2xl"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
                <span className="text-xs text-muted-foreground">Scroll to explore</span>
                <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2">
                    <div className="w-1.5 h-3 rounded-full bg-primary animate-pulse" />
                </div>
            </div>
        </section>
    );
};

export default Hero;
