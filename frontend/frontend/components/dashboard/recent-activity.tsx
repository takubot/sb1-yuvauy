"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const activities = [
  {
    id: 1,
    user: {
      name: "山田太郎",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=1",
    },
    action: "新しいボットを作成しました",
    time: "2時間前",
  },
  {
    id: 2,
    user: {
      name: "鈴木花子",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=2",
    },
    action: "ドキュメントをアップロードしました",
    time: "3時間前",
  },
  {
    id: 3,
    user: {
      name: "佐藤次郎",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=3",
    },
    action: "予約を確認しました",
    time: "5時間前",
  },
];

export function RecentActivity() {
  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-center gap-4">
          <Avatar>
            <AvatarImage src={activity.user.image} />
            <AvatarFallback>{activity.user.name[0]}</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium">{activity.user.name}</p>
            <p className="text-sm text-muted-foreground">{activity.action}</p>
          </div>
          <p className="text-sm text-muted-foreground">{activity.time}</p>
        </div>
      ))}
    </div>
  );
}