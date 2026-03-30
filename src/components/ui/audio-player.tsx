"use client";

import * as React from "react";
import { Play, Pause, Volume2, Music } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

export interface AudioPlayerProps {
  src?: string;
  autoPlay?: boolean;
  loop?: boolean;
  showControls?: boolean;
  interactive?: boolean;
  label?: string;
  volume?: number;
  className?: string;
  onPlayPause?: (isPlaying: boolean) => void;
  onTimeUpdate?: (currentTime: number) => void;
  onEnded?: () => void;
  onVolumeChange?: (volume: number) => void;
}

export function AudioPlayer({
  src,
  autoPlay = false,
  loop = false,
  showControls = true,
  interactive = true,
  label = "Audio Clip",
  volume: initialVolume = 0.8,
  className,
  onPlayPause,
  onTimeUpdate,
  onEnded,
  onVolumeChange,
}: AudioPlayerProps) {
  const audioRef = React.useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [currentTime, setCurrentTime] = React.useState(0);
  const [duration, setDuration] = React.useState(0);
  const [volume, setVolume] = React.useState(initialVolume);
  const [showVolumeSlider, setShowVolumeSlider] = React.useState(false);

  // Sync volume with audio element
  React.useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // Sync prop volume changes
  React.useEffect(() => {
    setVolume(initialVolume);
  }, [initialVolume]);

  // Handle autoplay and initial state
  React.useEffect(() => {
    if (interactive && src && autoPlay && audioRef.current) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch((err) => console.warn("Autoplay blocked:", err));
      }
    }
  }, [interactive, src, autoPlay]);

  const formatTime = (time: number) => {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!interactive || !src) return;

    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
      onPlayPause?.(!isPlaying);
    }
  };

  const handleSliderChange = (value: number[]) => {
    if (!interactive || !audioRef.current) return;
    const newTime = value[0];
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  if (!showControls && interactive) {
    return (
      <audio
        ref={audioRef}
        src={src}
        autoPlay={autoPlay}
        loop={loop}
        className="hidden"
      />
    );
  }

  return (
    <div
      className={cn(
        "flex w-full items-center gap-4 rounded-2xl border border-slate-200 bg-white px-4 py-2 shadow-sm transition-all",
        className
      )}
    >
      {/* Play/Pause Area */}
      <button
        onClick={togglePlay}
        type="button"
        disabled={!interactive || !src}
        className={cn(
          "flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-all",
          isPlaying
            ? "bg-blue-100 text-blue-600 hover:bg-blue-200"
            : "bg-slate-100 text-slate-600 hover:bg-slate-200",
          (!interactive || !src) && "cursor-default opacity-80"
        )}
      >
        {isPlaying ? (
          <Pause className="h-5 w-5 fill-current" />
        ) : (
          <Play className="h-5 w-5 translate-x-0.5 fill-current" />
        )}
      </button>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col gap-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 min-w-0">
             <Music className="h-3 w-3 text-slate-400" />
             <span className="truncate text-[11px] font-semibold text-slate-700">
               {src ? label : "Chưa có nguồn âm thanh"}
             </span>
          </div>
          <span className="text-[10px] tabular-nums text-slate-400">
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>
        </div>

        <Slider
          value={[currentTime]}
          max={duration || 100}
          step={0.1}
          onValueChange={handleSliderChange}
          disabled={!interactive || !src}
          className="h-1.5"
        />
      </div>

      {/* Visualizer / Volume Area */}
      <div 
        className="relative flex h-8 items-center gap-2 px-1"
        onMouseEnter={() => setShowVolumeSlider(true)}
        onMouseLeave={() => setShowVolumeSlider(false)}
      >
        {/* Animated Visualizer (Shown when playing) */}
        {isPlaying ? (
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-50 text-blue-500">
             <div className="flex items-end gap-[1px] h-3">
               <div className="w-[2px] bg-blue-500 animate-[pulse_1s_infinite_0s] rounded-t-sm" style={{height: '60%'}}></div>
               <div className="w-[2px] bg-blue-500 animate-[pulse_1s_infinite_0.2s] rounded-t-sm" style={{height: '100%'}}></div>
               <div className="w-[2px] bg-blue-500 animate-[pulse_1s_infinite_0.4s] rounded-t-sm" style={{height: '40%'}}></div>
             </div>
          </div>
        ) : (
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-50 text-slate-400">
            <Volume2 className="h-4 w-4" />
          </div>
        )}

        {/* Dynamic Volume Slider (Revealed on hover) */}
        {showVolumeSlider && interactive && (
          <div className="absolute right-10 flex h-8 w-24 items-center rounded-full border border-slate-200 bg-white px-3 shadow-lg animate-in fade-in slide-in-from-right-2">
            <Slider
              value={[volume]}
              min={0}
              max={1}
              step={0.01}
              onValueChange={(val) => {
                setVolume(val[0]);
                onVolumeChange?.(val[0]);
              }}
              className="h-1"
            />
          </div>
        )}
      </div>

      {/* Hidden Audio Driver */}
      {src && (
        <audio
          ref={audioRef}
          src={src}
          autoPlay={autoPlay && interactive}
          loop={loop}
          onTimeUpdate={() => {
            if (audioRef.current) {
              const time = audioRef.current.currentTime;
              setCurrentTime(time);
              onTimeUpdate?.(time);
            }
          }}
          onLoadedMetadata={() => {
            if (audioRef.current) setDuration(audioRef.current.duration);
          }}
          onEnded={() => {
            if (!loop) {
              setIsPlaying(false);
              onPlayPause?.(false);
            }
            onEnded?.();
          }}
          className="hidden"
        />
      )}
    </div>
  );
}
