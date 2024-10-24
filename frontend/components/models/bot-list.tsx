"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bot, MessageSquare, Settings, Trash2 } from "lucide-react";
import Link from "next/link";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface BotData {
  id: string;
  name: string;
  model: string;
  description: string;
  conversations: number;
  lastActive: string;
}

export function BotList() {
  const [bots] = useState<BotData[]>([
    {
      id: "1",
      name: "カスタマーサポート",
      model: "GPT-4",
      description: "製品サポートと問い合わせ対応",
      conversations: 1234,
      lastActive: "2024-03-20",
    },
    {
      id: "2",
      name: "営業アシスタント",
      model: "Claude",
      description: "商品提案と見積もり作成",
      conversations: 856,
      lastActive: "2024-03-19",
    },
  ]);

  const handleDelete = async (id: string) => {
    console.log("Delete bot:", id);
  };

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {bots.map((bot) => (
        <Card key={bot.id} className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Bot className="h-8 w-8" />
              <div>
                <h3 className="font-semibold">{bot.name}</h3>
                <p className="text-sm text-muted-foreground">{bot.model}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" asChild>
                <Link href={`/models/${bot.id}/settings`}>
                  <Settings className="h-4 w-4" />
                </Link>
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>ボットの削除</AlertDialogTitle>
                    <AlertDialogDescription>
                      このボットを削除してもよろしいですか？この操作は取り消せません。
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>キャンセル</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => handleDelete(bot.id)}
                      className="bg-red-600 hover:bg-red-700"
                    >
                      削除
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-4">{bot.description}</p>
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <MessageSquare className="h-4 w-4" />
              <span>{bot.conversations.toLocaleString()} 会話</span>
            </div>
            <span>最終活動: {bot.lastActive}</span>
          </div>
        </Card>
      ))}
    </div>
  );
}