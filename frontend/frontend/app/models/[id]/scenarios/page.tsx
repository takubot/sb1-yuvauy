"use client";

import React from "react";
import { DashboardNav } from "@/components/dashboard/nav";
import { DashboardHeader } from "@/components/dashboard/header";
import { ScenarioFlow } from "@/components/models/scenario-flow";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

// 型定義を修正
interface ScenariosPageProps {
  params: {
    id: string;
  };
}

export default function ScenariosPage({ params }: ScenariosPageProps) {
  const { id } = params;

  return (
    <div className="flex min-h-screen">
      <DashboardNav />
      <main className="flex-1">
        <DashboardHeader />
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">シナリオ管理</h2>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              新規シナリオ作成
            </Button>
          </div>
          <ScenarioFlow botId={id} />
        </div>
      </main>
    </div>
  );
}
