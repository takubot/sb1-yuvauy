"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { DashboardNav } from "@/components/dashboard/nav";
import { DashboardHeader } from "@/components/dashboard/header";
import { CalendarView } from "@/components/calendar/calendar-view";
import { CalendarSidebar } from "@/components/calendar/calendar-sidebar";

export default function CalendarPage() {
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
    return <div>You need to be authenticated to view this page.</div>;
  }

  return (
    <div className="flex min-h-screen">
      <DashboardNav />
      <main className="flex-1">
        <DashboardHeader />
        <div className="flex h-[calc(100vh-64px)]">
          <CalendarSidebar />
          <div className="flex-1 p-8">
            <CalendarView />
          </div>
        </div>
      </main>
    </div>
  );
}
