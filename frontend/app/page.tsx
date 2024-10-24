"use client";
import { Button } from "@/components/ui/button";
import { Bot, Calendar, FileText, Settings, Users } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">DOPPEL</h1>
          <p className="text-xl text-muted-foreground">
            次世代RAGシステム搭載AIチャットボットプラットフォーム
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <FeatureCard
            icon={<Bot className="w-6 h-6" />}
            title="マルチモデル対応"
            description="Azure OpenAI、OpenAI、Gemini、Claudeなど、複数のAIモデルに対応"
            href="/models"
          />
          <FeatureCard
            icon={<Calendar className="w-6 h-6" />}
            title="予約管理システム"
            description="Google Calendar連携による効率的な予約管理"
            href="/calendar"
          />
          <FeatureCard
            icon={<FileText className="w-6 h-6" />}
            title="RAGシステム"
            description="PDF、Excel、Wordなどのドキュメントを学習"
            href="/documents"
          />
          <FeatureCard
            icon={<Settings className="w-6 h-6" />}
            title="柔軟なカスタマイズ"
            description="チャットの外観やシナリオをカスタマイズ可能"
            href="/settings"
          />
          <FeatureCard
            icon={<Users className="w-6 h-6" />}
            title="メンバー管理"
            description="Google アカウントによる簡単なメンバー管理"
            href="/members"
          />
        </div>

        <div className="mt-12 text-center">
          <Button asChild size="lg">
            <Link href="/login">今すぐ始める</Link>
          </Button>
        </div>
      </main>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
  href,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
}) {
  return (
    <Link href={href}>
      <div className="p-6 bg-card rounded-lg shadow-lg hover:shadow-xl transition-shadow">
        <div className="flex items-center gap-4 mb-4">
          {icon}
          <h3 className="text-xl font-semibold">{title}</h3>
        </div>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </Link>
  );
}
