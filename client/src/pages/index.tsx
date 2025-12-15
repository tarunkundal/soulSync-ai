import { useAuth } from "@/routes/auth/Auth";
import Features from "../components/landing/Features";
import FinalCTA from "../components/landing/FinalCTA";
import Footer from "../components/landing/Footer";
import Hero from "../components/landing/Hero";
import HowItWorks from "../components/landing/HowItWorks";
import MessageShowcase from "../components/landing/MessageShowcase";
import Navbar from "../components/landing/Navbar";
import Pricing from "../components/landing/Pricing";
import ProblemStatement from "../components/landing/ProblemStatement";
import Testimonials from "../components/landing/Testmonials";
import { Navigate } from "react-router-dom";


const Index = () => {
    const { loading, isAuthenticated } = useAuth();

    if (loading) return <div className="min-h-screen bg-background text-2xl">Loading....</div>;

    if (isAuthenticated) {
        return <Navigate to="/dashboard" replace />;
    }
    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <main>
                <Hero />
                <ProblemStatement />
                <HowItWorks />
                <Features />
                <MessageShowcase />
                <Testimonials />
                <Pricing />
                <FinalCTA />
            </main>
            <Footer />
        </div>
    );
};

export default Index;