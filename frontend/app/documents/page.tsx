"use client";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { DashboardNav } from "@/components/dashboard/nav";
import { DashboardHeader } from "@/components/dashboard/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Upload, FileText, Trash2, Search } from "lucide-react";
import { DocumentUploader } from "@/components/documents/uploader";
import { DocumentList } from "@/components/documents/list";
import { DocumentFilters } from "@/components/documents/filters";

export default function DocumentsPage() {
  const [isUploading, setIsUploading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { data: session, status } = useSession();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session) {
    return <div>You need to be authenticated to view the dashboard.</div>;
  }

  return (
    <div className="flex min-h-screen">
      <DashboardNav />
      <main className="flex-1">
        <DashboardHeader />

        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">ドキュメント管理</h2>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Upload className="mr-2 h-4 w-4" />
                  ドキュメントをアップロード
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>ドキュメントのアップロード</DialogTitle>
                  <DialogDescription>
                    PDF、Excel、Wordファイルをアップロードできます。
                  </DialogDescription>
                </DialogHeader>
                <DocumentUploader
                  isUploading={isUploading}
                  setIsUploading={setIsUploading}
                />
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid gap-6">
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <Label htmlFor="search" className="sr-only">
                  検索
                </Label>
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="search"
                    placeholder="ドキュメントを検索..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              <DocumentFilters />
            </div>

            <DocumentList searchQuery={searchQuery} />
          </div>
        </div>
      </main>
    </div>
  );
}
