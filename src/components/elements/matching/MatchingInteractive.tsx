"use client";

import React, { useState, useEffect, useMemo } from "react";
import { MatchingElement, MatchingPair, SlideElement } from "@/store/types";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { RotateCcw, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { useEditorStore } from "@/store/editorStore";
import { GameFeedback } from "../shared/GameFeedback";

interface MatchingInteractiveProps {
  element: MatchingElement;
  isDisabled?: boolean;
  onAction?: (element: SlideElement) => void;
}

export function MatchingInteractive({ element, isDisabled, onAction }: MatchingInteractiveProps) {
  const setElementCompleted = useEditorStore((state) => state.setElementCompleted);
  const setGameFeedback = useEditorStore((state) => state.setGameFeedback);
  const { pairs, title, textColor, itemSize, titleSize } = element.props;
  
  // pool: items available to be picked
  const [pool, setPool] = useState<MatchingPair[]>([]);
  // slots: { [leftId]: MatchingPair | null }
  const [slots, setSlots] = useState<Record<string, MatchingPair | null>>({});
  
  const [selectedPoolId, setSelectedPoolId] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isError, setIsError] = useState(false);
  
  // Initialize and shuffle
  useEffect(() => {
    const shuffle = <T,>(arr: T[]) => [...arr].sort(() => Math.random() - 0.5);
    setPool(shuffle([...pairs]));
    
    const initialSlots: Record<string, MatchingPair | null> = {};
    pairs.forEach(p => { initialSlots[p.id] = null; });
    setSlots(initialSlots);
    
    setIsSuccess(false);
    setSelectedPoolId(null);
  }, [pairs]);

  const handlePoolItemClick = (id: string) => {
    if (isSuccess || isDisabled) return;
    setSelectedPoolId(selectedPoolId === id ? null : id);
  };

  const handleSlotClick = (leftId: string) => {
    if (isSuccess || isDisabled) return;

    // If slot already has an item, return it to pool
    if (slots[leftId]) {
      const itemToReturn = slots[leftId]!;
      setPool(prev => [...prev, itemToReturn]);
      setSlots(prev => ({ ...prev, [leftId]: null }));
      return;
    }

    // If something is selected in pool, place it in slot
    if (selectedPoolId) {
      const itemToPlace = pool.find(p => p.id === selectedPoolId);
      if (itemToPlace) {
        setSlots(prev => ({ ...prev, [leftId]: itemToPlace }));
        setPool(prev => prev.filter(p => p.id !== selectedPoolId));
        setSelectedPoolId(null);
      }
    }
  };

  const handleCheck = () => {
    const allSlotsFilled = Object.values(slots).every(v => v !== null);
    if (!allSlotsFilled) return;
    
    // In this game, the key (leftId) and the item's id should be identical
    const allCorrect = Object.entries(slots).every(([leftId, item]) => item && item.id === leftId);
    
    if (allCorrect) {
      setIsSuccess(true);
      setElementCompleted(element.id, true);
      setGameFeedback({
        status: "success",
        onDismiss: () => {
          setIsDismissed(true);
          if (onAction) onAction(element);
        },
        onRetry: handleReset
      });
    } else {
      setIsError(true);
      setGameFeedback({
        status: "error",
        onDismiss: () => setIsError(false),
        onRetry: handleReset
      });
    }
  };

  const handleReset = () => {
    const shuffle = <T,>(arr: T[]) => [...arr].sort(() => Math.random() - 0.5);
    setPool(shuffle([...pairs]));
    const initialSlots: Record<string, MatchingPair | null> = {};
    pairs.forEach(p => { initialSlots[p.id] = null; });
    setSlots(initialSlots);
    setIsSuccess(false);
    setIsDismissed(false);
    setSelectedPoolId(null);
  };

  const handleDismiss = () => {
    setIsDismissed(true);
  };

  return (
    <div className="relative flex flex-col h-full p-4 overflow-hidden bg-slate-50/30">
      <h3 className="font-bold text-center mb-6 shrink-0" style={{ color: textColor, fontSize: titleSize }}>
        {title || "Ghép các cặp tương ứng"}
      </h3>
      
      <LayoutGroup>
        <div className="flex-1 overflow-y-auto pr-2 space-y-2">
          {/* Term List with Slots - Compact 2-column grid */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-3">
            {pairs.map((pair) => (
              <div key={pair.id} className="flex items-center gap-2">
                {/* Static Term - Compact */}
                <div 
                  className="flex-1 p-2 rounded-lg bg-white border border-slate-200 shadow-sm font-semibold text-slate-700 min-h-[44px] flex items-center justify-center text-center"
                  style={{ fontSize: itemSize - 2 }}
                >
                  {pair.left}
                </div>

                {/* Drop Slot - Compact */}
                <div 
                  onClick={() => handleSlotClick(pair.id)}
                  className={cn(
                    "flex-1 min-h-[44px] rounded-lg border-2 border-dashed transition-all cursor-pointer flex items-center justify-center overflow-hidden",
                    slots[pair.id] 
                      ? "border-emerald-500 bg-emerald-50 border-solid p-0 shadow-sm" 
                      : (selectedPoolId ? "border-blue-400 bg-blue-50/50 p-1 animate-pulse" : "border-slate-200 bg-slate-100/50 p-1 hover:border-slate-300")
                  )}
                >
                  <AnimatePresence mode="popLayout">
                    {slots[pair.id] ? (
                      <motion.div
                        layoutId={slots[pair.id]!.id}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="w-full h-full p-1.5 bg-white rounded-md text-center font-medium text-emerald-900 leading-tight"
                        style={{ fontSize: itemSize - 2 }}
                      >
                        {slots[pair.id]!.right}
                      </motion.div>
                    ) : (
                      <span className="text-[10px] text-slate-400 font-medium italic">Ghép...</span>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            ))}
          </div>

          {/* Card Pool Section - More compact */}
          <div className="mt-4 pt-4 border-t border-slate-200">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 text-center">Kho định nghĩa</p>
            <div className="flex flex-wrap gap-1.5 justify-center">
              <AnimatePresence mode="popLayout">
                {pool.map((item) => (
                  <motion.div
                    key={item.id}
                    layoutId={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    onClick={() => handlePoolItemClick(item.id)}
                    className={cn(
                      "px-4 py-2 rounded-lg border-2 cursor-pointer transition-all shadow-sm font-medium select-none active:scale-95",
                      selectedPoolId === item.id 
                        ? "border-blue-500 bg-blue-500 text-white shadow-md ring-4 ring-blue-100" 
                        : "border-white bg-white hover:border-blue-200 hover:shadow-md text-slate-700"
                    )}
                    style={{ fontSize: itemSize - 2 }}
                  >
                    {item.right}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </LayoutGroup>

      {/* Logic & Footer */}
      <div className="mt-6 flex flex-col gap-3 shrink-0">
        {!isSuccess && (
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              className="flex-1 h-12 font-bold"
              onClick={handleReset}
              disabled={isDisabled}
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Làm mới
            </Button>
            <Button 
              className={cn(
                "flex-[2] h-12 font-bold text-lg transition-all",
                Object.values(slots).every(v => v !== null) 
                  ? "bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-200" 
                  : "bg-slate-200 text-slate-400 cursor-not-allowed"
              )}
              onClick={handleCheck}
              disabled={isDisabled || !Object.values(slots).every(v => v !== null)}
            >
              <CheckCircle2 className="w-5 h-5 mr-2" />
              Hoàn thành
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
