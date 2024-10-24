"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { PlusCircle, Trash2 } from "lucide-react"
import { useState } from "react"

interface Member {
  id: string
  name: string
  email: string
  role: string
  calendar: string
}

const initialMembers: Member[] = [
  {
    id: "1",
    name: "山田 太郎",
    email: "yamada@example.com",
    role: "管理者",
    calendar: "yamada@example.com",
  },
  {
    id: "2",
    name: "鈴木 花子",
    email: "suzuki@example.com",
    role: "メンバー",
    calendar: "suzuki@example.com",
  },
]

export function MemberList() {
  const [members, setMembers] = useState<Member[]>(initialMembers)

  const deleteMember = (id: string) => {
    setMembers(members.filter((member) => member.id !== id))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>メンバー一覧</CardTitle>
        <CardDescription>
          チームのメンバーとカレンダー連携の管理を行います。
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            新規メンバー追加
          </Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>名前</TableHead>
              <TableHead>メールアドレス</TableHead>
              <TableHead>役割</TableHead>
              <TableHead>連携カレンダー</TableHead>
              <TableHead>操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {members.map((member) => (
              <TableRow key={member.id}>
                <TableCell>{member.name}</TableCell>
                <TableCell>{member.email}</TableCell>
                <TableCell>{member.role}</TableCell>
                <TableCell>{member.calendar}</TableCell>
                <TableCell>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => deleteMember(member.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}