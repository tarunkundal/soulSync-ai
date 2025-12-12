import { Quote } from "lucide-react";
import useScrollReveal from "../../hooks/useScrollReveal";

const testimonials = [
    {
        quote: "It remembers everything so I don't have to. My mom cried happy tears this birthday!",
        author: "Priya S.",
        role: "Marketing Manager",
        avatar: "P",
    },
    {
        quote: "My girlfriend thinks I'm the most thoughtful person ever. Little does she know... 😉",
        author: "Rahul M.",
        role: "Software Engineer",
        avatar: "R",
    },
    {
        quote: "As a CEO, I manage 200+ relationships. SoulSync AI makes me look incredibly attentive.",
        author: "Sarah K.",
        role: "Startup Founder",
        avatar: "S",
    },
    {
        quote: "The AI messages are so personal, people can't believe they're automated!",
        author: "James L.",
        role: "Sales Director",
        avatar: "J",
    },
];

const Testimonials = () => {
    const { ref: headerRef, isVisible: headerVisible } = useScrollReveal();
    const { ref: gridRef, isVisible: gridVisible } = useScrollReveal({ threshold: 0.1 });

    return (
        <section className="relative py-24 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-muted/20 via-background to-background" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-[150px]" />

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                <div
                    ref={headerRef as React.RefObject<HTMLDivElement>}
                    className={`text-center space-y-4 mb-16 scroll-reveal ${headerVisible ? 'visible' : ''}`}
                >
                    <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-primary/10 text-primary border border-primary/20">
                        Testimonials
                    </span>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold">
                        Loved by <span className="gradient-text">10,000+</span> Users
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Don't just take our word for it. Here's what our users say.
                    </p>
                </div>

                <div
                    ref={gridRef as React.RefObject<HTMLDivElement>}
                    className={`grid sm:grid-cols-2 lg:grid-cols-4 gap-6 scroll-reveal-stagger ${gridVisible ? 'visible' : ''}`}
                >
                    {testimonials.map((testimonial) => (
                        <div
                            key={testimonial.author}
                            className="group relative glass-card p-6 hover:border-primary/30 transition-all duration-300"
                        >
                            {/* Quote icon */}
                            <Quote className="w-8 h-8 text-primary/30 mb-4" />

                            {/* Quote text */}
                            <p className="text-foreground mb-6 leading-relaxed">
                                "{testimonial.quote}"
                            </p>

                            {/* Author */}
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-semibold">
                                    {testimonial.avatar}
                                </div>
                                <div>
                                    <p className="font-medium text-foreground">{testimonial.author}</p>
                                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                                </div>
                            </div>

                            {/* Decorative stars */}
                            <div className="absolute top-4 right-4 flex gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <svg
                                        key={i}
                                        className="w-4 h-4 text-amber-400"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
