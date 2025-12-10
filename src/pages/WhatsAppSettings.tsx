import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
    MessageSquare,
    CheckCircle2,
    XCircle,
    Send,
    RefreshCw,
    Clock,
    AlertCircle,
} from "lucide-react";
import { cn } from "../lib/utils";

const recentLogs = [
    {
        id: 1,
        recipient: "Mom",
        message: "Birthday wish",
        status: "sent",
        time: "Dec 8, 9:00 AM",
    },
    {
        id: 2,
        recipient: "John",
        message: "Work anniversary",
        status: "scheduled",
        time: "Dec 12, 10:00 AM",
    },
    {
        id: 3,
        recipient: "Sarah",
        message: "Birthday wish",
        status: "scheduled",
        time: "Dec 15, 9:00 AM",
    },
];

export default function WhatsAppSettings() {
    const [isConnected, setIsConnected] = useState(false);
    const [testNumber, setTestNumber] = useState("");
    const [isTesting, setIsTesting] = useState(false);

    const handleConnect = () => {
        setIsConnected(true);
    };

    const handleDisconnect = () => {
        setIsConnected(false);
    };

    const handleTestMessage = () => {
        setIsTesting(true);
        setTimeout(() => {
            setIsTesting(false);
        }, 2000);
    };

    return (
        <div className="p-6 lg:p-8 max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
                    <MessageSquare className="w-8 h-8 text-green-500" />
                    WhatsApp Settings
                </h1>
                <p className="text-muted-foreground">
                    Connect and manage WhatsApp automation
                </p>
            </div>

            {/* Connection Status */}
            <Card className="glass-card border-white/[0.08] mb-6">
                <CardHeader>
                    <CardTitle className="text-lg">Connection Status</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                        <div className="flex items-center gap-4">
                            <div
                                className={cn(
                                    "w-14 h-14 rounded-xl flex items-center justify-center",
                                    isConnected ? "bg-green-500/20" : "bg-white/[0.06]"
                                )}
                            >
                                <MessageSquare
                                    className={cn(
                                        "w-7 h-7",
                                        isConnected ? "text-green-500" : "text-muted-foreground"
                                    )}
                                />
                            </div>
                            <div>
                                <div className="flex items-center gap-2">
                                    <p className="font-semibold">WhatsApp Business API</p>
                                    {isConnected ? (
                                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                                    ) : (
                                        <XCircle className="w-5 h-5 text-red-500" />
                                    )}
                                </div>
                                <p className="text-sm text-muted-foreground">
                                    {isConnected
                                        ? "Connected and ready to send messages"
                                        : "Not connected - Click to set up"}
                                </p>
                            </div>
                        </div>
                        {isConnected ? (
                            <Button
                                variant="outline"
                                onClick={handleDisconnect}
                                className="bg-white/[0.02] border-white/[0.08] text-red-500 hover:text-red-400"
                            >
                                Disconnect
                            </Button>
                        ) : (
                            <Button
                                onClick={handleConnect}
                                className="bg-green-500 hover:bg-green-600 text-white"
                            >
                                Connect WhatsApp
                            </Button>
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* Test Message */}
            <Card
                className={cn(
                    "glass-card border-white/[0.08] mb-6 transition-opacity",
                    !isConnected && "opacity-50 pointer-events-none"
                )}
            >
                <CardHeader>
                    <CardTitle className="text-lg">Send Test Message</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label>Phone Number</Label>
                            <div className="flex gap-3">
                                <Input
                                    placeholder="+1 (555) 000-0000"
                                    value={testNumber}
                                    onChange={(e) => setTestNumber(e.target.value)}
                                    className="flex-1 bg-white/[0.02] border-white/[0.08]"
                                />
                                <Button
                                    onClick={handleTestMessage}
                                    disabled={!testNumber || isTesting}
                                    className="bg-green-500/10 text-green-500 hover:bg-green-500/20 border border-green-500/20"
                                >
                                    {isTesting ? (
                                        <>
                                            <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            <Send className="w-4 h-4 mr-2" />
                                            Send Test
                                        </>
                                    )}
                                </Button>
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Send a test message to verify your WhatsApp connection
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Delivery Logs */}
            <Card className="glass-card border-white/[0.08]">
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-lg">Recent Activity</CardTitle>
                    <Button variant="ghost" size="sm" className="text-muted-foreground">
                        View all
                    </Button>
                </CardHeader>
                <CardContent className="space-y-3">
                    {recentLogs.map((log) => (
                        <div
                            key={log.id}
                            className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]"
                        >
                            <div
                                className={cn(
                                    "w-10 h-10 rounded-xl flex items-center justify-center",
                                    log.status === "sent"
                                        ? "bg-green-500/10"
                                        : log.status === "scheduled"
                                            ? "bg-accent-teal/10"
                                            : "bg-red-500/10"
                                )}
                            >
                                {log.status === "sent" ? (
                                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                                ) : log.status === "scheduled" ? (
                                    <Clock className="w-5 h-5 text-accent-teal" />
                                ) : (
                                    <AlertCircle className="w-5 h-5 text-red-500" />
                                )}
                            </div>
                            <div className="flex-1">
                                <p className="font-medium">{log.recipient}</p>
                                <p className="text-sm text-muted-foreground">{log.message}</p>
                            </div>
                            <div className="text-right">
                                <span
                                    className={cn(
                                        "text-xs px-2 py-1 rounded-full capitalize",
                                        log.status === "sent"
                                            ? "bg-green-500/10 text-green-500"
                                            : log.status === "scheduled"
                                                ? "bg-accent-teal/10 text-accent-teal"
                                                : "bg-red-500/10 text-red-500"
                                    )}
                                >
                                    {log.status}
                                </span>
                                <p className="text-xs text-muted-foreground mt-1">{log.time}</p>
                            </div>
                        </div>
                    ))}

                    {!isConnected && (
                        <div className="text-center py-8">
                            <AlertCircle className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                            <p className="text-muted-foreground">
                                Connect WhatsApp to view activity
                            </p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
