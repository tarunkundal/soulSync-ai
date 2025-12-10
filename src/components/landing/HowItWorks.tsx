import { Heart, Send, Sparkles, UserPlus } from "lucide-react";
import useScrollReveal from "../../hooks/useScrollReveal";

const steps = [
    {
        icon: UserPlus,
        step: "01",
        title: "Add Your People",
        description: "Import contacts or manually add the people who matter most to you.",
    },
    {
        icon: Heart,
        step: "02",
        title: "Set Relationships",
        description: "Define relationship types so AI understands the right tone and style.",
    },
    {
        icon: Sparkles,
        step: "03",
        title: "AI Creates Wishes",
        description: "Our AI crafts personalized messages and beautiful greeting cards.",
    },
    {
        icon: Send,
        step: "04",
        title: "Auto-Send via WhatsApp",
        description: "Messages are delivered automatically at the perfect time.",
    },
];

const HowItWorks = () => {
    const { ref: headerRef, isVisible: headerVisible } = useScrollReveal();
    const { ref: stepsRef, isVisible: stepsVisible } = useScrollReveal({ threshold: 0.1 });

    return (
        <section id="how-it-works" className="relative py-24 overflow-hidden">
            {/* Background gradient */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px]" />

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                <div
                    ref={headerRef as React.RefObject<HTMLDivElement>}
                    className={`text-center space-y-4 mb-16 scroll-reveal ${headerVisible ? 'visible' : ''}`}
                >
                    <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-primary/10 text-primary border border-primary/20">
                        How It Works
                    </span>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold">
                        Simple as <span className="gradient-text">1-2-3-4</span>
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Set it up once, and let SoulSync AI handle the rest forever.
                    </p>
                </div>

                {/* Steps container */}
                <div
                    ref={stepsRef as React.RefObject<HTMLDivElement>}
                    className={`relative scroll-reveal ${stepsVisible ? 'visible' : ''}`}
                >
                    {/* Connection line */}
                    <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent -translate-y-1/2" />

                    <div className={`grid sm:grid-cols-2 lg:grid-cols-4 gap-8 scroll-reveal-stagger ${stepsVisible ? 'visible' : ''}`}>
                        {steps.map((item, index) => (
                            <div
                                key={item.step}
                                className="group relative"
                            >
                                <div className="glass-card p-6 h-full hover:border-primary/30 transition-all duration-300 hover:-translate-y-2">
                                    {/* Step number */}
                                    <div className="absolute -top-4 left-6 px-3 py-1 rounded-full bg-gradient-to-r from-primary to-secondary text-xs font-bold text-white">
                                        Step {item.step}
                                    </div>

                                    {/* Icon */}
                                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/20 flex items-center justify-center mt-4 mb-6 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-primary/20 transition-all duration-300">
                                        <item.icon className="w-8 h-8 text-primary" />
                                    </div>

                                    <h3 className="text-xl font-semibold text-foreground mb-2">
                                        {item.title}
                                    </h3>
                                    <p className="text-muted-foreground">
                                        {item.description}
                                    </p>
                                </div>

                                {/* Arrow connector for desktop */}
                                {index < steps.length - 1 && (
                                    <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-8 -translate-y-1/2 z-10">
                                        <div className="w-full h-full rounded-full bg-background border border-primary/30 flex items-center justify-center">
                                            <div className="w-0 h-0 border-l-4 border-l-primary border-y-4 border-y-transparent ml-0.5" />
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
