import { Github, Instagram, Linkedin, Sparkles, Twitter } from "lucide-react";

const Footer = () => {
    return (
        <footer className="relative py-16 border-t border-border/50">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid md:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div className="md:col-span-2">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                                <Sparkles className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xl font-display font-bold text-foreground">SoulSync AI</span>
                        </div>
                        <p className="text-muted-foreground mb-6 max-w-sm">
                            Your AI-powered personal reminder assistant. Never forget a special moment again.
                        </p>
                        <div className="flex items-center gap-4">
                            <a href="#" className="w-10 h-10 rounded-lg bg-muted hover:bg-muted/80 flex items-center justify-center transition-colors">
                                <Twitter className="w-5 h-5 text-muted-foreground" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-lg bg-muted hover:bg-muted/80 flex items-center justify-center transition-colors">
                                <Linkedin className="w-5 h-5 text-muted-foreground" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-lg bg-muted hover:bg-muted/80 flex items-center justify-center transition-colors">
                                <Instagram className="w-5 h-5 text-muted-foreground" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-lg bg-muted hover:bg-muted/80 flex items-center justify-center transition-colors">
                                <Github className="w-5 h-5 text-muted-foreground" />
                            </a>
                        </div>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 className="font-semibold text-foreground mb-4">Product</h4>
                        <ul className="space-y-3">
                            <li><a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Features</a></li>
                            <li><a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">Pricing</a></li>
                            <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Integrations</a></li>
                            <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">API</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-foreground mb-4">Company</h4>
                        <ul className="space-y-3">
                            <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">About</a></li>
                            <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Blog</a></li>
                            <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Careers</a></li>
                            <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Contact</a></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom */}
                <div className="pt-8 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-muted-foreground">
                        © 2025 SoulSync AI. All rights reserved.
                    </p>
                    <div className="flex items-center gap-6 text-sm">
                        <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</a>
                        <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
