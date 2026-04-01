"use client";

import React, { useState, useEffect, useMemo } from "react";
import { GuessWordElement, SlideElement } from "@/store/types";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Delete, RotateCcw, CheckCircle2, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEditorStore } from "@/store/editorStore";
import { GameFeedback } from "../shared/GameFeedback";

interface GuessWordInteractiveProps {
  element: GuessWordElement;
  isDisabled?: boolean;
  onAction?: (element: SlideElement) => void;
}

export function GuessWordInteractive({ element, isDisabled, onAction }: GuessWordInteractiveProps) {
  const setElementCompleted = useEditorStore((state) => state.setElementCompleted);
  const setGameFeedback = useEditorStore((state) => state.setGameFeedback);
  const { answer, imageUrls, hint, successMessage, textColor, title } = element.props;
  
  // Normalize answer (uppercase, no spaces for simplicity in comparison)
  const normalizedAnswer = useMemo(() => answer.toUpperCase().replace(/\s/g, ""), [answer]);
  const [userGuess, setUserGuess] = useState<string[]>(new Array(normalizedAnswer.length).fill(""));
  const [isSuccess, setIsSuccess] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isError, setIsError] = useState(false);
  const [showHint, setShowHint] = useState(false);

  // Generate scrambled letters
  const scrambledLetters = useMemo(() => {
    const letters = normalizedAnswer.split("");
    const alphabet = "ABCDEGHIKLMNOPQRSTUVXYZ"; // Common letters
    
    // Add some random letters to make it exactly 14 buttons (7x2 grid or similar)
    while (letters.length < 14) {
      const randomChar = alphabet[Math.floor(Math.random() * alphabet.length)];
      letters.push(randomChar);
    }
    
    // Shuffle
    return letters.sort(() => Math.random() - 0.5);
  }, [normalizedAnswer]);

  const isGuessComplete = userGuess.every(char => char !== "");

  const handleCheckAnswer = () => {
    if (isSuccess || isDisabled) return;
    
    if (userGuess.join("") === normalizedAnswer) {
      setIsSuccess(true);
      setIsError(false);
      setElementCompleted(element.id, true);
      setGameFeedback({
        status: "success",
        message: successMessage || "Chúc mừng bạn đã trả lời đúng!",
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
        message: "Rất tiếc, câu trả lời chưa chính xác!",
        onDismiss: () => setIsError(false),
        onRetry: handleReset
      });
      // Reset error after animation
      setTimeout(() => setIsError(false), 1000);
    }
  };

  const handleLetterClick = (letter: string) => {
    if (isSuccess || isDisabled) return;
    
    const nextEmptyIndex = userGuess.findIndex(char => char === "");
    if (nextEmptyIndex !== -1) {
      const newGuess = [...userGuess];
      newGuess[nextEmptyIndex] = letter;
      setUserGuess(newGuess);
      setIsError(false);
    }
  };

  const handleDelete = () => {
    if (isSuccess || isDisabled) return;
    
    const lastFilledIndex = [...userGuess].reverse().findIndex(char => char !== "");
    if (lastFilledIndex !== -1) {
      const actualIndex = userGuess.length - 1 - lastFilledIndex;
      const newGuess = [...userGuess];
      newGuess[actualIndex] = "";
      setUserGuess(newGuess);
    }
  };

  const handleReset = () => {
    if (isDisabled) return;
    setUserGuess(new Array(normalizedAnswer.length).fill(""));
    setIsSuccess(false);
    setIsDismissed(false);
  };

  const handleDismiss = () => {
    setIsDismissed(true);
  };

  return (
    <div className="relative flex flex-col h-full items-center p-4 gap-4 overflow-y-auto">
      <div className="text-center w-full">
        <h3 className="font-bold text-lg mb-1" style={{ color: textColor }}>{title || "Đuổi Hình Bắt Chữ"}</h3>
        {hint && (
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-6 text-xs text-muted-foreground"
            onClick={() => setShowHint(!showHint)}
          >
            <HelpCircle className="w-3 h-3 mr-1" />
            {showHint ? hint : "Xem gợi ý"}
          </Button>
        )}
      </div>

      {/* Image Clue Grid */}
      <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden border shadow-inner bg-slate-50 flex items-center justify-center">
        {!imageUrls || imageUrls.length === 0 || (imageUrls.length === 1 && !imageUrls[0]) ? (
          <div className="text-slate-300 flex flex-col items-center">
            <HelpCircle className="w-12 h-12 mb-2" />
            <span>Chưa có ảnh gợi ý</span>
          </div>
        ) : (
          <div className={cn(
            "grid w-full h-full gap-1",
            imageUrls.length === 1 ? "grid-cols-1" : 
            imageUrls.length === 2 ? "grid-cols-2" : 
            imageUrls.length <= 4 ? "grid-cols-2 grid-rows-2" : "grid-cols-3 grid-rows-2"
          )}>
            {imageUrls.map((url, idx) => (
              <div key={idx} className="relative w-full h-full bg-white flex items-center justify-center overflow-hidden border-faint">
                {url ? (
                   <img src={url} alt={`Gợi ý ${idx + 1}`} className="object-cover w-full h-full" />
                ) : (
                   <HelpCircle className="w-6 h-6 text-slate-200" />
                )}
              </div>
            ))}
          </div>
        )}
        
      </div>

      {/* Answer Slots */}
      <div className="flex flex-wrap justify-center gap-2 py-2">
        {userGuess.map((char, i) => (
          <motion.div
            key={i}
            animate={{
              scale: char ? [1, 1.1, 1] : 1,
              x: isError ? [0, -5, 5, -5, 5, 0] : 0
            }}
            transition={{ duration: isError ? 0.4 : 0.2 }}
            className={cn(
              "w-10 h-10 border-2 rounded-lg flex items-center justify-center text-xl font-black transition-colors",
              isError ? "border-red-500 bg-red-50 text-red-600" :
              char ? "bg-white border-blue-500 text-blue-600 shadow-md" : 
              "bg-slate-100 border-slate-300 text-slate-400"
            )}
          >
            {char}
          </motion.div>
        ))}
      </div>


      {/* Letter Grid */}
      <div className="w-full flex flex-col gap-2 mt-auto">
        <div className="grid grid-cols-7 gap-2">
          {scrambledLetters.map((letter, i) => (
            <Button
              key={i}
              variant="outline"
              className={cn(
                "h-10 p-0 text-lg font-bold bg-white",
                !isDisabled && "hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300"
              )}
              onClick={() => handleLetterClick(letter)}
              disabled={isSuccess || isDisabled}
            >
              {letter}
            </Button>
          ))}
        </div>
        
        <div className="flex flex-col gap-2 w-full mt-2">
            {!isSuccess && (
              <Button 
                variant="default"
                className={cn(
                  "w-full font-bold h-12 text-lg shadow-lg transition-all",
                  isGuessComplete ? "bg-green-600 hover:bg-green-700 animate-pulse" : "bg-slate-200 text-slate-400"
                )}
                onClick={() => handleCheckAnswer()}
                disabled={isDisabled || !isGuessComplete}
              >
                <CheckCircle2 className="w-6 h-6 mr-2" />
                Kiểm tra đáp án
              </Button>
            )}
            
            <div className="flex gap-2 justify-center">
              <Button 
                variant="destructive" 
                className="flex-1 font-bold h-10"
                onClick={() => handleDelete()}
                disabled={isSuccess || isDisabled || userGuess.every(c => c === "")}
              >
                <Delete className="w-5 h-5 mr-2" />
                Xóa
              </Button>
              <Button 
                variant="outline" 
                className="flex-1 font-bold h-10"
                onClick={() => handleReset()}
                disabled={isDisabled}
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Làm mới
              </Button>
            </div>
        </div>
      </div>
    </div>
  );
}
