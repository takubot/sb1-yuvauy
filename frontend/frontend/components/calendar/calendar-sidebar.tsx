"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar, Clock } from "lucide-react";

interface Event {
  id: string;
  title: string;
  time: string;
  status: "pending" | "confirmed" | "cancelled";
}

export function CalendarSidebar() {
  const [events] = useState<Event[]>([
    {
      id: "1",
      title: "製品デモ",
      time: "10:00 - 11:00",
      status: "confirmed",
    },
    {
      id: "2",
      title: "導入相談",
      time: "14:00 - 15:00",
      status: "pending",
    },
  ]);

  return (
    <div className="w-80 border-r p-4">
      <div className="mb-6">
        <h3 className="font-semibold mb-2">本日の予定</h3>
        <div className="space-y-2">
          {events.map((event) => (
            <Card key={event.id} className="p-3">
              <div className="flex items-start gap-3">
                <Calendar className="h-4 w-4 mt-1" />
                <div>
                  <h4 className="font-medium">{event.title}</h4>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>{event.time}</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
      <Button className="w-full">
        <Calendar className="mr-2 h-4 w-4" />
        新規予約
      </Button>
    </div>
  );
}