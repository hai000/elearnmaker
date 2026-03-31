"use client";

import { memo } from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TimelineActions } from "./timeline/TimelineActions";
import { SlideList } from "./timeline/SlideList";

// Timeline Shell: Now perfectly static - it doesn't subscribe to slide state.
// This ensures the Card and CardContent don't re-render during slide operations.
const Timeline = memo(function Timeline() {
  return (
    <div className="relative w-full px-6 py-4">
      <Card className="border border-slate-200/80 bg-white shadow-xl shadow-slate-900/5">
        <CardContent className="px-6 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Tabs defaultValue="animations" className="w-auto gap-0">
                  <TabsList>
                      <TabsTrigger value="animations">Hiệu ứng</TabsTrigger>
                    </TabsList>
                  <TabsContent value="animations" className="hidden" />
                </Tabs>
              </div>
              <Badge variant="secondary" className="text-xs font-normal">
                Phạm vi: 0 - 60 giây · Khóa thời gian
              </Badge>
            </div>
            <TimelineActions />
          </div>

          <Separator className="my-4" />

          <ScrollArea className="w-full whitespace-nowrap">
            <SlideList />
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
});

export default Timeline;