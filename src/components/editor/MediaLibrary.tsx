"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEditorStore } from "@/store/editorStore";
import { Upload, Music, Image as ImageIcon, Video, Trash2, CheckCircle2, Loader2, FolderIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export default function MediaLibrary() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const { assets, addAsset, deleteAsset, selectedId, elements, updateElement } = useEditorStore();

  const selectedElement = elements.find(el => el.id === selectedId);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        addAsset(data.asset);
      } else {
        alert("Tải lên thất bại: " + data.error);
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Đã xảy ra lỗi khi tải lên.");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const applyAssetToSelected = (url: string) => {
    if (!selectedId || !selectedElement) return;

    if (selectedElement.type === "audio") {
      updateElement(selectedId, { props: { ...selectedElement.props, audioUrl: url } });
    } else if (selectedElement.type === "image") {
      updateElement(selectedId, { props: { ...selectedElement.props, imageUrl: url } });
    } else if (selectedElement.type === "video") {
      updateElement(selectedId, { props: { ...selectedElement.props, videoUrl: url } });
    }
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Upload Header */}
      <div className="p-4 border-b border-slate-100">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileSelect}
          className="hidden"
          accept="audio/*,image/*,video/*"
        />
        <Button 
          className="w-full gap-2 bg-blue-600 hover:bg-blue-700 text-white shadow-sm"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
        >
          {isUploading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Upload className="h-4 w-4" />
          )}
          {isUploading ? "Đang tải lên..." : "Tải lên tệp mới"}
        </Button>
      </div>

      {/* Asset List */}
      <ScrollArea className="flex-1">
        <div className="p-4 pt-2">
          {assets.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-50 text-slate-300">
                <FolderIcon className="h-6 w-6" />
              </div>
              <p className="mt-4 text-xs font-medium text-slate-500">Chưa có tệp nào</p>
              <p className="mt-1 text-[10px] text-slate-400">Tải lên âm thanh hoặc hình ảnh để bắt đầu</p>
            </div>
          ) : (
            <div className="grid gap-3">
              {assets.map((asset) => (
                <div 
                  key={asset.id} 
                  className={cn(
                    "group relative flex items-center gap-3 rounded-xl border border-slate-100 bg-white p-2.5 transition-all hover:border-blue-200 hover:shadow-md hover:shadow-blue-900/5",
                    selectedElement && (
                      (selectedElement.type === "audio" && asset.type === "audio") ||
                      (selectedElement.type === "image" && asset.type === "image") ||
                      (selectedElement.type === "video" && asset.type === "video")
                    ) ? "border-blue-100 bg-blue-50/20" : ""
                  )}
                >
                  <div className={cn(
                    "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg",
                    asset.type === "audio" ? "bg-blue-50 text-blue-500" : 
                    asset.type === "image" ? "bg-purple-50 text-purple-500" : "bg-orange-50 text-orange-500"
                  )}>
                    {asset.type === "audio" ? <Music className="h-5 w-5" /> : 
                     asset.type === "image" ? <ImageIcon className="h-5 w-5" /> : <Video className="h-5 w-5" />}
                  </div>

                  <div className="flex flex-1 flex-col min-w-0">
                    <p className="truncate text-xs font-semibold text-slate-700">{asset.name}</p>
                    <p className="text-[10px] text-slate-400">{(asset.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>

                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 text-slate-400 hover:text-red-500 hover:bg-red-50"
                      onClick={() => deleteAsset(asset.id)}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className={cn(
                        "h-7 w-7", 
                        selectedId ? "text-blue-500 hover:bg-blue-50" : "text-slate-300 opacity-50 pointer-events-none"
                      )}
                      onClick={() => applyAssetToSelected(asset.url)}
                    >
                      <CheckCircle2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="p-4 border-t border-slate-100 bg-slate-50/50">
        <p className="text-[10px] leading-relaxed text-slate-400">
          Chọn một phần tử trên Canvas, sau đó nhấn dấu tích để áp dụng tệp Media.
        </p>
      </div>
    </div>
  );
}


