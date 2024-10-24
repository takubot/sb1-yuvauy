import { Metadata } from "next";
import { MemberList } from "@/components/member-list";


export const metadata: Metadata = {
  title: "メンバー管理",
  description: "メンバーの一覧と管理を行います。",
};

export default function MembersPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-8">メンバー管理</h1>
      <MemberList />
    </div>
  );
}
