import { Sparkles } from "lucide-react";
import { Button } from "../ui/button";

const Navbar = () => {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 border-b border-border/50 bg-black">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                        <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-xl font-display font-bold text-foreground">SoulSync AI</span>
                </div>

                <div className="hidden md:flex items-center gap-8">
                    <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Features</a>
                    <a href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">How it Works</a>
                    <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">Pricing</a>
                </div>

                <div className="flex items-center gap-3">
                    <Button variant="ghost" size="sm" className="hidden sm:flex">
                        Sign In
                    </Button>
                    <Button variant="hero" size="sm">
                        Get Started
                    </Button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
