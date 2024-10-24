"use client";

import React from "react";
import { DashboardNav } from "@/components/dashboard/nav";
import { DashboardHeader } from "@/components/dashboard/header";
import { BotList } from "@/components/models/bot-list";
import { CreateBotDialog } from "@/components/models/create-bot-dialog";
import { useSession } from "next-auth/react";

interface ModelsPageProps {
  params: {
    id: string;
  };
}

export default function ModelsPage({ params }: ModelsPageProps) {
  const { data: session, status } = useSession();
  const { id } = params;

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session) {
    return <div>You need to be authenticated to view this page.</div>;
  }

  return (
    <div className="flex min-h-screen">
      <DashboardNav />
      <main className="flex-1 p-8">
        <DashboardHeader />
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">ボット管理</h2>
          <CreateBotDialog />
        </div>
        <BotList />
      </main>
    </div>
  );
}
