"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface PropertyCardProps {
  title: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
}

export function PropertyCard({ 
  title, 
  icon, 
  action, 
  children, 
  className,
  contentClassName 
}: PropertyCardProps) {
  return (
    <Card className={cn("mx-px border-slate-200/60 shadow-sm overflow-hidden", className)}>
      <CardHeader className="pb-3 border-b border-slate-100 bg-white px-4 py-3">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            {icon && <span className="shrink-0">{icon}</span>}
            <CardTitle className="text-[13px] font-bold text-slate-700 truncate">
              {title}
            </CardTitle>
          </div>
          {action && <div className="shrink-0">{action}</div>}
        </div>
      </CardHeader>
      <CardContent className={cn("p-4 grid gap-4 bg-white/50", contentClassName)}>
        {children}
      </CardContent>
    </Card>
  );
}
