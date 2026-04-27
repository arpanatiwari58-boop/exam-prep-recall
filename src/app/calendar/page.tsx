import React from 'react';
import { CalendarHeader } from './_components/CalendarHeader';
import { AddTopicCard } from './_components/AddTopicCard';
import { TodayAlerts } from './_components/TodayAlerts';
import { SubjectList } from './_components/SubjectList';
import { HowItWorksSidebar } from './_components/HowItWorksSidebar';

export default function CalendarPage() {
  return (
    <div className="min-h-screen bg-[#f4f5f9] font-sans pb-20">
      {/* Header Banner */}
      <CalendarHeader />

      <div className="max-w-6xl mx-auto px-6 -mt-8 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Action Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* 1. What's due Today */}
            <TodayAlerts />
            {/* 2. Add what you read */}
            <AddTopicCard />
            {/* 3. Browse Subjects and see their queue details */}
            <SubjectList />
          </div>

          {/* Sidebar Stats */}
          <div className="space-y-6">
            <HowItWorksSidebar />
          </div>

        </div>
      </div>
    </div>
  );
}