import { Calendar, Heart, PartyPopper, AlertCircle } from "lucide-react";
import useScrollReveal from "../../hooks/useScrollReveal";

const problems = [
    {
        icon: Calendar,
        title: "Forgetting Birthdays",
        description: "Important dates slip through the cracks of your busy schedule.",
    },
    {
        icon: Heart,
        title: "Missing Anniversary",
        description: "Your partner's special day gets lost in work deadlines.",
    },
    {
        icon: PartyPopper,
        title: "Festival Greetings",
        description: "You remember the festival... a day after it's over.",
    },
    {
        icon: AlertCircle,
        title: "Last-Minute Panic",
        description: "Scrambling for a generic message that doesn't feel personal.",
    },
];

const ProblemStatement = () => {
    const { ref: headerRef, isVisible: headerVisible } = useScrollReveal();
    const { ref: cardsRef, isVisible: cardsVisible } = useScrollReveal({ threshold: 0.1 });
    const { ref: transitionRef, isVisible: transitionVisible } = useScrollReveal();

    return (
        <section className="relative py-24 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                <div
                    ref={headerRef as React.RefObject<HTMLDivElement>}
                    className={`text-center space-y-4 mb-16 scroll-reveal ${headerVisible ? 'visible' : ''}`}
                >
                    <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-destructive/10 text-destructive border border-destructive/20">
                        The Problem
                    </span>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold">
                        Sound <span className="gradient-text">Familiar?</span>
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Life gets busy. Important moments slip away. Relationships suffer.
                    </p>
                </div>

                <div
                    ref={cardsRef as React.RefObject<HTMLDivElement>}
                    className={`grid sm:grid-cols-2 lg:grid-cols-4 gap-6 scroll-reveal-stagger ${cardsVisible ? 'visible' : ''}`}
                >
                    {problems.map((problem) => (
                        <div
                            key={problem.title}
                            className="group relative glass-card p-6 hover:border-destructive/30 transition-all duration-300"
                        >
                            {/* Icon container */}
                            <div className="w-14 h-14 rounded-xl bg-destructive/10 border border-destructive/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                                <problem.icon className="w-7 h-7 text-destructive" />
                            </div>

                            <h3 className="text-lg font-semibold text-foreground mb-2">
                                {problem.title}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                                {problem.description}
                            </p>

                            {/* Decorative corner */}
                            <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-destructive/5 to-transparent rounded-bl-3xl rounded-tr-2xl" />
                        </div>
                    ))}
                </div>

                {/* Transition message */}
                <div
                    ref={transitionRef as React.RefObject<HTMLDivElement>}
                    className={`mt-16 text-center scroll-reveal ${transitionVisible ? 'visible' : ''}`}
                >
                    <p className="text-xl text-muted-foreground">
                        But what if there was an <span className="text-primary font-medium">AI that never forgets?</span>
                    </p>
                </div>
            </div>
        </section>
    );
};

export default ProblemStatement;
