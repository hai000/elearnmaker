"use client";

import React, { useState } from "react";
import { EssayElement } from "@/store/types";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface EssayInteractiveProps {
  element: EssayElement;
}

export function EssayInteractive({ element }: EssayInteractiveProps) {
  const { title, placeholder, minLength, maxLength, submitLabel, titleSize, textColor, backgroundColor } = element.props;
  
  const [value, setValue] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = () => {
    if (isSubmitted) return;

    if (minLength && value.length < minLength) {
      setError(`Câu trả lời cần ít nhất ${minLength} ký tự.`);
      return;
    }

    if (maxLength && value.length > maxLength) {
      setError(`Câu trả lời vượt quá giới hạn ${maxLength} ký tự.`);
      return;
    }

    setError(null);
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setValue("");
    setIsSubmitted(false);
    setError(null);
  };

  return (
    <div 
      className="flex flex-col h-full p-6 rounded-2xl shadow-sm border border-slate-200/50 overflow-y-auto custom-scrollbar"
      style={{ backgroundColor: backgroundColor || "#ffffff" }}
      onPointerDown={(e) => e.stopPropagation()}
    >
      <div className="flex-1 flex flex-col min-h-min">
        <h3 
          className="font-bold mb-4" 
          style={{ color: textColor || "#0f172a", fontSize: titleSize || 20 }}
        >
          {title || "Câu hỏi tự luận"}
        </h3>

        <div className="flex-1 flex flex-col gap-3">
          <div className="flex justify-between items-end">
            <Label className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              Câu trả lời của bạn
            </Label>
            {maxLength > 0 && (
              <span className={cn(
                "text-[10px] font-mono",
                value.length > maxLength ? "text-red-500 font-bold" : "text-slate-400"
              )}>
                {value.length}/{maxLength}
              </span>
            )}
          </div>

          <Textarea
            placeholder={placeholder || "Nhập nội dung tại đây..."}
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              if (error) setError(null);
            }}
            onKeyDown={(e) => e.stopPropagation()}
            disabled={isSubmitted}
            className={cn(
              "flex-1 min-h-[120px] rounded-xl border-slate-200 transition-all resize-none",
              isSubmitted ? "bg-slate-50 border-emerald-200 text-slate-600" : "focus:border-blue-400 focus:ring-4 focus:ring-blue-50"
            )}
          />

          <AnimatePresence mode="wait">
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-center gap-2 p-3 rounded-lg bg-red-50 border border-red-100 text-red-600 text-xs font-medium"
              >
                <AlertCircle className="w-4 h-4" />
                {error}
              </motion.div>
            )}

            {isSubmitted && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center gap-3 p-6 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-700"
              >
                <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                <div className="text-center">
                  <p className="font-bold text-lg">Đã ghi nhận!</p>
                  <p className="text-sm opacity-80">Cảm ơn bạn đã hoàn thành câu trả lời tự luận.</p>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-2 border-emerald-200 hover:bg-emerald-100 text-emerald-700 font-bold"
                  onClick={handleReset}
                >
                  Viết lại
                </Button>
              </motion.div>
            )}
          </AnimatePresence>

          {!isSubmitted && (
            <Button
              size="lg"
              className={cn(
                "mt-2 h-12 shrink-0 font-bold text-lg shadow-lg transition-all",
                value.trim().length > 0 ? "bg-blue-600 hover:bg-blue-700 shadow-blue-100" : "bg-slate-200 text-slate-400 cursor-not-allowed"
              )}
              onClick={handleSubmit}
              disabled={value.trim().length === 0}
            >
              {submitLabel || "Nộp bài"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
