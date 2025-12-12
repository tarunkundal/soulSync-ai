import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    User,
    Globe,
    Bell,
    Palette,
    Shield,
    LogOut,
    Save,
    Trash2,
} from "lucide-react";

const timezones = [
    "America/New_York",
    "America/Los_Angeles",
    "Europe/London",
    "Europe/Paris",
    "Asia/Tokyo",
    "Asia/Kolkata",
    "Australia/Sydney",
];

const languages = [
    { code: "en", name: "English" },
    { code: "es", name: "Spanish" },
    { code: "fr", name: "French" },
    { code: "de", name: "German" },
    { code: "hi", name: "Hindi" },
    { code: "ja", name: "Japanese" },
];

export default function Settings() {
    const [name, setName] = useState("John Doe");
    const [email, setEmail] = useState("john@example.com");
    const [timezone, setTimezone] = useState("America/New_York");
    const [language, setLanguage] = useState("en");

    const [notifications, setNotifications] = useState({
        email: true,
        push: true,
        sms: false,
        reminders: true,
    });

    return (
        <div className="p-6 lg:p-8 max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Settings</h1>
                <p className="text-muted-foreground">
                    Manage your account and preferences
                </p>
            </div>

            <Tabs defaultValue="profile" className="space-y-6">
                <TabsList className="glass-card border border-white/[0.08] p-1 flex-wrap h-auto gap-1">
                    <TabsTrigger
                        value="profile"
                        className="data-[state=active]:bg-accent-pink/20 data-[state=active]:text-accent-pink"
                    >
                        <User className="w-4 h-4 mr-2" />
                        Profile
                    </TabsTrigger>
                    <TabsTrigger
                        value="preferences"
                        className="data-[state=active]:bg-accent-teal/20 data-[state=active]:text-accent-teal"
                    >
                        <Globe className="w-4 h-4 mr-2" />
                        Preferences
                    </TabsTrigger>
                    <TabsTrigger
                        value="notifications"
                        className="data-[state=active]:bg-accent-violet/20 data-[state=active]:text-accent-violet"
                    >
                        <Bell className="w-4 h-4 mr-2" />
                        Notifications
                    </TabsTrigger>
                    <TabsTrigger
                        value="appearance"
                        className="data-[state=active]:bg-accent-lime/20 data-[state=active]:text-accent-lime"
                    >
                        <Palette className="w-4 h-4 mr-2" />
                        Appearance
                    </TabsTrigger>
                </TabsList>

                {/* Profile Tab */}
                <TabsContent value="profile" className="space-y-6">
                    <Card className="glass-card border-white/[0.08]">
                        <CardHeader>
                            <CardTitle className="text-lg flex items-center gap-2">
                                <User className="w-5 h-5 text-accent-pink" />
                                Profile Information
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center gap-6 mb-6">
                                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-accent-pink to-accent-violet flex items-center justify-center text-3xl">
                                    👤
                                </div>
                                <Button
                                    variant="outline"
                                    className="bg-white/[0.02] border-white/[0.08]"
                                >
                                    Change Avatar
                                </Button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Full Name</Label>
                                    <Input
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="bg-white/[0.02] border-white/[0.08]"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Email</Label>
                                    <Input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="bg-white/[0.02] border-white/[0.08]"
                                    />
                                </div>
                            </div>

                            <Button className="bg-gradient-to-r from-accent-pink to-accent-violet">
                                <Save className="w-4 h-4 mr-2" />
                                Save Changes
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Security */}
                    <Card className="glass-card border-white/[0.08]">
                        <CardHeader>
                            <CardTitle className="text-lg flex items-center gap-2">
                                <Shield className="w-5 h-5 text-accent-teal" />
                                Security
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <Button
                                variant="outline"
                                className="w-full md:w-auto bg-white/[0.02] border-white/[0.08]"
                            >
                                Change Password
                            </Button>
                            <Button
                                variant="outline"
                                className="w-full md:w-auto bg-white/[0.02] border-white/[0.08] ml-0 md:ml-3"
                            >
                                <LogOut className="w-4 h-4 mr-2" />
                                Sign Out
                            </Button>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Preferences Tab */}
                <TabsContent value="preferences" className="space-y-6">
                    <Card className="glass-card border-white/[0.08]">
                        <CardHeader>
                            <CardTitle className="text-lg flex items-center gap-2">
                                <Globe className="w-5 h-5 text-accent-teal" />
                                Regional Settings
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Timezone</Label>
                                    <Select value={timezone} onValueChange={setTimezone}>
                                        <SelectTrigger className="bg-white/[0.02] border-white/[0.08]">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent className="glass-card border-white/[0.08]">
                                            {timezones.map((tz) => (
                                                <SelectItem key={tz} value={tz}>
                                                    {tz}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label>Language</Label>
                                    <Select value={language} onValueChange={setLanguage}>
                                        <SelectTrigger className="bg-white/[0.02] border-white/[0.08]">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent className="glass-card border-white/[0.08]">
                                            {languages.map((lang) => (
                                                <SelectItem key={lang.code} value={lang.code}>
                                                    {lang.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <Button className="bg-gradient-to-r from-accent-teal to-accent-violet">
                                <Save className="w-4 h-4 mr-2" />
                                Save Preferences
                            </Button>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Notifications Tab */}
                <TabsContent value="notifications" className="space-y-6">
                    <Card className="glass-card border-white/[0.08]">
                        <CardHeader>
                            <CardTitle className="text-lg flex items-center gap-2">
                                <Bell className="w-5 h-5 text-accent-violet" />
                                Notification Preferences
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {[
                                {
                                    key: "email",
                                    label: "Email Notifications",
                                    description: "Receive reminders via email",
                                },
                                {
                                    key: "push",
                                    label: "Push Notifications",
                                    description: "Browser push notifications",
                                },
                                {
                                    key: "sms",
                                    label: "SMS Notifications",
                                    description: "Text message reminders",
                                },
                                {
                                    key: "reminders",
                                    label: "Reminder Alerts",
                                    description: "Get alerted before events",
                                },
                            ].map((item) => (
                                <div
                                    key={item.key}
                                    className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]"
                                >
                                    <div>
                                        <Label className="font-medium">{item.label}</Label>
                                        <p className="text-sm text-muted-foreground">
                                            {item.description}
                                        </p>
                                    </div>
                                    <Switch
                                        checked={notifications[item.key as keyof typeof notifications]}
                                        onCheckedChange={(checked) =>
                                            setNotifications({ ...notifications, [item.key]: checked })
                                        }
                                        className="data-[state=checked]:bg-accent-violet"
                                    />
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Appearance Tab */}
                <TabsContent value="appearance" className="space-y-6">
                    <Card className="glass-card border-white/[0.08]">
                        <CardHeader>
                            <CardTitle className="text-lg flex items-center gap-2">
                                <Palette className="w-5 h-5 text-accent-lime" />
                                Theme
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {/* Dark theme - Active */}
                                <div
                                    className="p-4 rounded-xl border border-accent-lime/50 bg-accent-lime/10 transition-all"
                                >
                                    <div className="w-full h-16 rounded-lg mb-3 bg-background" />
                                    <p className="font-medium text-center">Dark</p>
                                    <p className="text-xs text-accent-lime text-center mt-1">Active</p>
                                </div>

                                {/* Light theme - Coming soon */}
                                <div
                                    className="p-4 rounded-xl border border-white/[0.06] bg-white/[0.02] opacity-50 cursor-not-allowed"
                                >
                                    <div className="w-full h-16 rounded-lg mb-3 bg-foreground/90" />
                                    <p className="font-medium text-center">Light</p>
                                    <p className="text-xs text-muted-foreground text-center mt-1">Coming soon</p>
                                </div>

                                {/* System theme - Coming soon */}
                                <div
                                    className="p-4 rounded-xl border border-white/[0.06] bg-white/[0.02] opacity-50 cursor-not-allowed"
                                >
                                    <div className="w-full h-16 rounded-lg mb-3 bg-gradient-to-r from-background to-foreground/90" />
                                    <p className="font-medium text-center">System</p>
                                    <p className="text-xs text-muted-foreground text-center mt-1">Coming soon</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Danger Zone */}
                    <Card className="glass-card border-red-500/20">
                        <CardHeader>
                            <CardTitle className="text-lg text-red-500 flex items-center gap-2">
                                <Trash2 className="w-5 h-5" />
                                Danger Zone
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground mb-4">
                                Once you delete your account, there is no going back. Please be
                                certain.
                            </p>
                            <Button
                                variant="outline"
                                className="border-red-500/30 text-red-500 hover:bg-red-500/10"
                            >
                                Delete Account
                            </Button>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
