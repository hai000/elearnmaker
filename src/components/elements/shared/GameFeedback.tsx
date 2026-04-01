"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface GameFeedbackProps {
  isVisible: boolean;
  status: "success" | "error";
  title?: string;
  message?: string;
  onDismiss: () => void;
  onRetry?: () => void;
  className?: string;
}

export function GameFeedback({
  isVisible,
  status,
  title,
  message,
  onDismiss,
  onRetry,
  className
}: GameFeedbackProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={cn(
            "absolute inset-0 z-1000 flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm pointer-events-auto",
            className
          )}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className={cn(
              "w-full max-w-sm rounded-[2rem] p-8 flex flex-col items-center text-center gap-4 shadow-2xl bg-white",
              status === "success" ? "shadow-emerald-900/10" : "shadow-red-900/10"
            )}
          >
            <div className={cn(
              "w-20 h-20 rounded-full flex items-center justify-center mb-2",
              status === "success" ? "bg-emerald-100 text-emerald-600" : "bg-red-100 text-red-600"
            )}>
              {status === "success" ? (
                <CheckCircle2 className="w-12 h-12" />
              ) : (
                <XCircle className="w-12 h-12" />
              )}
            </div>

            <div className="space-y-2">
              <h2 className={cn(
                "text-2xl font-black uppercase tracking-tight",
                status === "success" ? "text-emerald-700" : "text-red-700"
              )}>
                {title || (status === "success" ? "Tuyệt vời!" : "Chưa đúng rồi!")}
              </h2>
              <p className="text-slate-600 font-bold leading-relaxed px-2">
                {message || (status === "success" 
                  ? "Bạn đã hoàn thành thử thách một cách xuất sắc." 
                  : "Đừng nản lòng, hãy thử lại một lần nữa nhé!")}
              </p>
            </div>

            <div className="w-full flex flex-col gap-2 pt-4">
              {status === "success" ? (
                <Button 
                  onClick={onDismiss}
                  className="w-full h-14 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-lg shadow-lg shadow-emerald-100 active:scale-95 transition-all"
                >
                  TIẾP TỤC
                </Button>
              ) : (
                <div className="flex gap-2 w-full">
                  <Button 
                    variant="outline"
                    onClick={onDismiss}
                    className="flex-1 h-14 rounded-2xl border-2 border-slate-200 text-slate-500 font-bold hover:bg-slate-50 active:scale-95 transition-all"
                  >
                    ĐÓNG
                  </Button>
                  <Button 
                    onClick={onRetry}
                    className="flex-2 h-14 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-bold text-lg shadow-lg shadow-red-100 active:scale-95 transition-all"
                  >
                    THỬ LẠI
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
