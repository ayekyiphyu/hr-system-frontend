'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";

export default function WebhookPage() {
    return (
        <div className="min-h-screen">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                < div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-blue-200/20 to-indigo-200/20 rounded-full blur-3xl animate-pulse" ></div >
                <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gradient-to-tl from-purple-200/20 to-pink-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
            </div >


            <div className="w-full relative z-10">
                <Card className="w-full pb-0 mb-0">
                    <CardHeader className="text-center pb-2">
                        <CardTitle className="text-2xl font-bold">
                            スタッフ通知用 Webhook 設定
                        </CardTitle>
                    </CardHeader>

                    <CardContent className="p-6">
                        <form className="space-y-6">
                            {/* Webhook URL */}
                            <div className="space-y-2">
                                <Label htmlFor="webhook-url" className="text-sm font-medium">
                                    Slack Webhook URL
                                </Label>
                                <Input
                                    id="webhook-url"
                                    placeholder="https://hooks.slack.com/services/..."
                                    className="w-full"
                                />
                                <p className="text-sm text-muted-foreground">
                                    SlackのIncoming Webhook URLを入力してください
                                </p>
                            </div>

                            {/* Notification Type */}
                            <div className="flex gap-5 items-start">
                                <Label className="text-sm font-medium">
                                    通知タイプ
                                </Label>
                                <div className="space-y-4">
                                    <RadioGroup defaultValue="default" className="grid gap-3">
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="default" id="r1" />
                                            <Label htmlFor="r1" className="text-sm font-normal cursor-pointer">
                                                デフォルト通知
                                            </Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="detailed" id="r2" />
                                            <Label htmlFor="r2" className="text-sm font-normal cursor-pointer">
                                                詳細通知 (全ての情報を含む)
                                            </Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="compact" id="r3" />
                                            <Label htmlFor="r3" className="text-sm font-normal cursor-pointer">
                                                簡易通知 (最小限の情報)
                                            </Label>
                                        </div>
                                    </RadioGroup>
                                </div>
                            </div>

                            {/* Status */}
                            <div className="space-y-4">
                                <Label className="text-sm font-medium">
                                    状態
                                </Label>
                                <div className="flex items-center justify-between p-3 border rounded-lg">
                                    <div>
                                        <Label htmlFor="webhook-status" className="text-sm cursor-pointer">
                                            Webhookを有効化
                                        </Label>
                                        <p className="text-sm text-muted-foreground">
                                            通知を送信するには有効にしてください
                                        </p>
                                    </div>
                                    <Switch id="webhook-status" />
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="flex justify-end pt-4 ">
                                <Button variant="default" type="submit" className="w-full sm:w-auto">
                                    設定を保存
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}