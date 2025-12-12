import {
    Sparkles,
    Image,
    MessageSquare,
    Bell,
    Calendar,
    Heart,
    Clock,
    Globe
} from "lucide-react";
import useScrollReveal from "../../hooks/useScrollReveal";

const features = [
    {
        icon: Sparkles,
        title: "AI-Personalized Wishes",
        description: "Unique, heartfelt messages crafted by AI based on relationship context.",
        color: "primary",
    },
    {
        icon: Image,
        title: "Auto-Generated Cards",
        description: "Beautiful greeting cards designed automatically for every occasion.",
        color: "secondary",
    },
    {
        icon: MessageSquare,
        title: "WhatsApp Automation",
        description: "Seamless delivery through WhatsApp at the perfect moment.",
        color: "primary",
    },
    {
        icon: Bell,
        title: "Smart Reminders",
        description: "Get notified before important dates so you're always prepared.",
        color: "secondary",
    },
    {
        icon: Calendar,
        title: "Festival Templates",
        description: "Pre-built templates for Diwali, Christmas, Eid, and 50+ festivals.",
        color: "primary",
    },
    {
        icon: Heart,
        title: "Relationship-Aware Tone",
        description: "Different tones for mom, boss, best friend, or partner.",
        color: "secondary",
    },
    {
        icon: Clock,
        title: "Time-Zone Smart",
        description: "Delivers messages at the right local time, anywhere in the world.",
        color: "primary",
    },
    {
        icon: Globe,
        title: "Multilingual Wishes",
        description: "Send wishes in Hindi, Spanish, French, and 20+ languages.",
        color: "secondary",
    },
];

const Features = () => {
    const { ref: headerRef, isVisible: headerVisible } = useScrollReveal();
    const { ref: gridRef, isVisible: gridVisible } = useScrollReveal({ threshold: 0.05 });

    return (
        <section id="features" className="relative py-24 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/10 to-background" />

            {/* Decorative blurs */}
            <div className="absolute top-1/3 left-0 w-72 h-72 bg-primary/10 rounded-full blur-[120px]" />
            <div className="absolute bottom-1/3 right-0 w-72 h-72 bg-secondary/10 rounded-full blur-[120px]" />

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                <div
                    ref={headerRef as React.RefObject<HTMLDivElement>}
                    className={`text-center space-y-4 mb-16 scroll-reveal ${headerVisible ? 'visible' : ''}`}
                >
                    <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-primary/10 text-primary border border-primary/20">
                        Features
                    </span>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold">
                        Everything You Need to{" "}
                        <span className="gradient-text">Never Forget</span>
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Powerful AI features that make staying connected effortless.
                    </p>
                </div>

                <div
                    ref={gridRef as React.RefObject<HTMLDivElement>}
                    className={`grid sm:grid-cols-2 lg:grid-cols-4 gap-6 scroll-reveal-stagger ${gridVisible ? 'visible' : ''}`}
                >
                    {features.map((feature) => (
                        <div
                            key={feature.title}
                            className="group relative glass-card p-6 hover:border-primary/30 transition-all duration-300 hover:-translate-y-1"
                        >
                            {/* Glow effect on hover */}
                            <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${feature.color === "primary"
                                ? "bg-primary/5 shadow-lg shadow-primary/10"
                                : "bg-secondary/5 shadow-lg shadow-secondary/10"
                                }`} />

                            <div className="relative z-10">
                                {/* Icon */}
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110 ${feature.color === "primary"
                                    ? "bg-primary/10 border border-primary/20"
                                    : "bg-secondary/10 border border-secondary/20"
                                    }`}>
                                    <feature.icon className={`w-6 h-6 ${feature.color === "primary" ? "text-primary" : "text-secondary"
                                        }`} />
                                </div>

                                <h3 className="text-lg font-semibold text-foreground mb-2">
                                    {feature.title}
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    {feature.description}
                                </p>
                            </div>

                            {/* Corner accent */}
                            <div className={`absolute bottom-0 right-0 w-20 h-20 rounded-tl-3xl rounded-br-2xl ${feature.color === "primary"
                                ? "bg-gradient-to-tl from-primary/5 to-transparent"
                                : "bg-gradient-to-tl from-secondary/5 to-transparent"
                                }`} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
