import { GoogleAuthUrlDocument, LoginDocument, MeQueryDocument, SignUpDocument } from "@/graphql/generated/graphql";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@apollo/client/react";
import { ChromeIcon, Github, Lock, Mail, Sparkles } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";

export default function Auth() {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { toast } = useToast()

    const [signUpMutation, { loading: signupLoading }] = useMutation(SignUpDocument)
    const [loginMutation, { loading: loginLoading }] = useMutation(LoginDocument, {
        refetchQueries: [{ query: MeQueryDocument }],
    })
    const [getGoogleUrl] = useMutation(GoogleAuthUrlDocument)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!isLogin) {
            try {
                await signUpMutation({
                    variables: { email, password },
                });
                toast({ title: "Account created successfully!" });
                setIsLogin(true);
            } catch (error) {
                console.error("Signup failed:", error);
                toast({ title: "Signup failed", description: error.message, variant: "destructive" });
            }
        } else {
            try {
                const res = await loginMutation({
                    variables: { email, password }
                });
                if (res.data.login.id) {
                    navigate("/onboarding");
                }
            } catch (error) {
                console.error("Login failed:", error);
                toast({ title: "Login failed", description: error.message, variant: "destructive" });
            }
        }
    };

    // currently only implemented for google
    const handleSocialLogin = async (provider: string) => {
        console.log(`Login with ${provider}`);
        const { data } = await getGoogleUrl();
        window.location.href = data.googleAuthUrl;
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4">
            {/* Background Effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-pink/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-violet/10 rounded-full blur-[120px]" />
            </div>

            <div className="w-full max-w-md relative z-10">
                {/* Logo */}
                <div className="flex items-center justify-center gap-3 mb-8">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-accent-pink to-accent-violet flex items-center justify-center shadow-[0_0_30px_rgba(236,72,153,0.3)]">
                        <Sparkles className="w-6 h-6 text-white" />
                    </div>
                    <span className="font-bold text-2xl text-foreground">SoulSync AI</span>
                </div>

                {/* Auth Card */}
                <div className="glass-card p-8 rounded-2xl border border-white/[0.08]">
                    <h1 className="text-2xl font-bold text-center mb-2">
                        {isLogin ? "Welcome back" : "Create account"}
                    </h1>
                    <p className="text-muted-foreground text-center mb-6">
                        {isLogin
                            ? "Sign in to continue to SoulSync AI"
                            : "Start your journey with SoulSync AI"}
                    </p>

                    {/* Social Login */}
                    <div className="grid grid-cols-2 gap-3 mb-6">
                        <Button
                            variant="outline"
                            className="bg-white/[0.02] border-white/[0.08] hover:bg-white/[0.06] hover:border-white/[0.12]"
                            onClick={() => handleSocialLogin("google")}
                        >
                            <ChromeIcon className="w-4 h-4 mr-2 text-primary" />
                            Google
                        </Button>
                        <Button
                            variant="outline"
                            className="bg-white/[0.02] border-white/[0.08] hover:bg-white/[0.06] hover:border-white/[0.12]"
                            onClick={() => handleSocialLogin("github")}
                        >
                            <Github className="w-4 h-4 mr-2" />
                            GitHub
                        </Button>
                    </div>

                    <div className="relative mb-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-white/[0.08]" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-card px-2 text-muted-foreground">
                                Or continue with email
                            </span>
                        </div>
                    </div>

                    {/* Email Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="you@example.com"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="pl-10 bg-white/[0.02] border-white/[0.08] focus:border-accent-pink/50"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <Input
                                    id="password"
                                    type="password"
                                    required
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="pl-10 bg-white/[0.02] border-white/[0.08] focus:border-accent-pink/50"
                                />
                            </div>
                        </div>

                        <Button
                            type="submit"
                            disabled={signupLoading || loginLoading}
                            className="w-full bg-gradient-to-r from-accent-pink to-accent-violet hover:opacity-90 shadow-[0_0_20px_rgba(236,72,153,0.3)]"
                        >
                            {isLogin ? "Sign In" : "Create Account"}
                        </Button>
                    </form>

                    <p className="text-center text-sm text-muted-foreground mt-6">
                        {isLogin ? "Don't have an account? " : "Already have an account? "}
                        <Button
                            onClick={() => setIsLogin(!isLogin)}
                            variant='link'
                            size='sm'
                        >
                            {isLogin ? "Sign up" : "Sign in"}
                        </Button>
                    </p>
                </div>
            </div>
        </div>
    );
}
