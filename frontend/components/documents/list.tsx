"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { FileText, Trash2 } from "lucide-react";
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

interface Document {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadedAt: string;
  status: "処理中" | "完了" | "エラー";
}

interface DocumentListProps {
  searchQuery: string;
}

export function DocumentList({ searchQuery }: DocumentListProps) {
  // 仮のデータ
  const [documents] = useState<Document[]>([
    {
      id: "1",
      name: "製品マニュアル.pdf",
      type: "PDF",
      size: "2.4 MB",
      uploadedAt: "2024-03-20",
      status: "完了",
    },
    {
      id: "2",
      name: "営業資料.xlsx",
      type: "Excel",
      size: "1.8 MB",
      uploadedAt: "2024-03-19",
      status: "処理中",
    },
    {
      id: "3",
      name: "契約書.docx",
      type: "Word",
      size: "523 KB",
      uploadedAt: "2024-03-18",
      status: "完了",
    },
  ]);

  const filteredDocuments = documents.filter((doc) =>
    doc.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = async (id: string) => {
    // 削除処理の実装
    console.log("Delete document:", id);
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ドキュメント名</TableHead>
          <TableHead>タイプ</TableHead>
          <TableHead>サイズ</TableHead>
          <TableHead>アップロード日</TableHead>
          <TableHead>ステータス</TableHead>
          <TableHead className="text-right">操作</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredDocuments.map((doc) => (
          <TableRow key={doc.id}>
            <TableCell className="font-medium">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                {doc.name}
              </div>
            </TableCell>
            <TableCell>{doc.type}</TableCell>
            <TableCell>{doc.size}</TableCell>
            <TableCell>{doc.uploadedAt}</TableCell>
            <TableCell>
              <div
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  doc.status === "完了"
                    ? "bg-green-100 text-green-800"
                    : doc.status === "処理中"
                    ? "bg-blue-100 text-blue-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {doc.status}
              </div>
            </TableCell>
            <TableCell className="text-right">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>ドキュメントの削除</AlertDialogTitle>
                    <AlertDialogDescription>
                      このドキュメントを削除してもよろしいですか？この操作は取り消せません。
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>キャンセル</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => handleDelete(doc.id)}
                      className="bg-red-600 hover:bg-red-700"
                    >
                      削除
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}