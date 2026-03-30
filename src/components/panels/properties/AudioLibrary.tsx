import { useState, useRef } from "react";
import { audioSamples, type AudioSample } from "@/constants/audioSamples";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Play, Pause, Check } from "lucide-react";

type AudioLibraryProps = {
  onSelect: (url: string) => void;
  currentUrl?: string;
};

export function AudioLibrary({ onSelect, currentUrl }: AudioLibraryProps) {
  const [playingId, setPlayingId] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = (sample: AudioSample) => {
    if (playingId === sample.id) {
       audioRef.current?.pause();
       setPlayingId(null);
    } else {
       if (audioRef.current) {
          audioRef.current.src = sample.url;
          audioRef.current.load(); // Ensure the new source is loaded
          audioRef.current.play().catch(err => {
            console.error("Playback failed:", err);
            setPlayingId(null);
          });
          setPlayingId(sample.id);
       }
    }
  };

  const categories: AudioSample["category"][] = ["Nature", "Music", "Tech", "Classroom"];

  return (
    <div className="mt-4 flex flex-col gap-4 rounded-lg border border-slate-200 bg-slate-50/50 p-3">
      <audio 
        ref={audioRef} 
        onEnded={() => setPlayingId(null)} 
        onError={() => {
          alert("Không thể tải âm thanh này. Có thể do lỗi kết nối hoặc định dạng không hỗ trợ.");
          setPlayingId(null);
        }}
        className="hidden" 
      />
      
      <Tabs defaultValue="Nature" className="w-full">
        <TabsList className="grid w-full grid-cols-4 h-8">
          {categories.map((cat) => (
            <TabsTrigger key={cat} value={cat} className="text-[10px] px-1">
              {cat}
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map((cat) => (
          <TabsContent key={cat} value={cat} className="mt-2">
            <ScrollArea className="h-48 pr-2">
              <div className="grid gap-2">
                {audioSamples
                  .filter((s) => s.category === cat)
                  .map((sample) => (
                    <div 
                      key={sample.id}
                      className="group flex items-center justify-between rounded-md border border-white bg-white p-2 shadow-sm transition-all hover:border-blue-200 hover:shadow-md"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-7 w-7 rounded-full bg-slate-50 text-slate-600 hover:bg-blue-50 hover:text-blue-600"
                          onClick={() => togglePlay(sample)}
                        >
                          {playingId === sample.id ? (
                            <Pause className="h-3 w-3" />
                          ) : (
                            <Play className="h-3 w-3 fill-current" />
                          )}
                        </Button>
                        <span className="truncate text-[11px] font-medium text-slate-700">
                           {sample.name}
                        </span>
                      </div>
                      
                      <Button
                        size="sm"
                        variant={currentUrl === sample.url ? "default" : "outline"}
                        className="h-7 px-2 text-[10px] font-bold"
                        onClick={() => onSelect(sample.url)}
                      >
                         {currentUrl === sample.url ? <Check className="h-3 w-3" /> : "Chọn"}
                      </Button>
                    </div>
                  ))}
              </div>
            </ScrollArea>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
