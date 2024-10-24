"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  MessageSquare,
  Plus,
  Settings,
  Trash2,
} from "lucide-react";

interface ScenarioNode {
  id: string;
  type: "start" | "message" | "condition" | "action";
  content: string;
  next?: string[];
}

interface ScenarioFlowProps {
  botId: string;
}

export function ScenarioFlow({ botId }: ScenarioFlowProps) {
  const [nodes] = useState<ScenarioNode[]>([
    {
      id: "1",
      type: "start",
      content: "会話開始",
      next: ["2"],
    },
    {
      id: "2",
      type: "message",
      content: "こんにちは！どのようなご用件でしょうか？",
      next: ["3"],
    },
    {
      id: "3",
      type: "condition",
      content: "製品について",
      next: ["4", "5"],
    },
    {
      id: "4",
      type: "message",
      content: "製品の詳細をご案内いたします。",
    },
    {
      id: "5",
      type: "message",
      content: "その他のお問い合わせについて承ります。",
    },
  ]);

  return (
    <div className="space-y-6">
      {nodes.map((node) => (
        <div key={node.id} className="flex items-start gap-4">
          <Card className="p-4 w-64">
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                <span className="text-sm font-medium">
                  {node.type === "start"
                    ? "開始"
                    : node.type === "message"
                    ? "メッセージ"
                    : node.type === "condition"
                    ? "条件分岐"
                    : "アクション"}
                </span>
              </div>
              <div className="flex gap-1">
                <Button variant="ghost" size="icon">
                  <Settings className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">{node.content}</p>
            {node.next && (
              <Button
                variant="outline"
                size="sm"
                className="mt-2"
                onClick={() => console.log("Add node after", node.id)}
              >
                <Plus className="h-4 w-4 mr-1" />
                ノードを追加
              </Button>
            )}
          </Card>
          {node.next && (
            <div className="mt-8">
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}