"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useEditorStore } from "@/store/editorStore";
import { elementItems, interactionItems, pluginItems, elementInitialData } from "@/constants/sidebarElements";
import { GripVertical } from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FolderIcon, LayoutPanelLeft } from "lucide-react";
import MediaLibrary from "./MediaLibrary";

export default function LeftSidebar() {
  const addElement = useEditorStore((state) => state.addElement);

  return (
    <aside className="flex h-full min-h-0 w-72 flex-col border-r border-slate-200/80 bg-white/80">
      <Tabs defaultValue="components" className="flex h-full flex-col">
        <div className="px-4 py-4 pt-5 pb-3">
          <TabsList className="grid w-full grid-cols-2 bg-slate-100/80 p-1">
            <TabsTrigger value="components" className="gap-2 text-xs">
              <LayoutPanelLeft className="h-3.5 w-3.5" />
              Components
            </TabsTrigger>
            <TabsTrigger value="media" className="gap-2 text-xs">
              <FolderIcon className="h-3.5 w-3.5" />
              Media
            </TabsTrigger>
          </TabsList>
        </div>

        <Separator className="opacity-50" />

        <TabsContent value="components" className="m-0 flex-1 min-h-0 overflow-hidden outline-none">
          <ScrollArea className="h-full px-4 py-5">
            <div className="grid gap-6">
              {/* Elements */}
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                  Elements
                </p>
                <div className="mt-3 grid gap-2">
                  {elementItems.map((item) => (
                    <Button
                      key={item}
                      variant="outline"
                      className="group h-10 flex items-center justify-between cursor-grab active:cursor-grabbing hover:border-slate-400 hover:bg-slate-50"
                      draggable
                      onDragStart={(e) => {
                        e.dataTransfer.setData(
                          "application/json",
                          JSON.stringify({ type: "element", item })
                        );
                        e.dataTransfer.effectAllowed = "copy";
                      }}
                      onClick={() => {
                        const data = elementInitialData[item as string];
                        if (data) {
                          addElement(data as any);
                        }
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <GripVertical className="h-4 w-4 text-slate-300 opacity-0 transition-opacity group-hover:opacity-100" />
                        <span className="text-sm font-medium text-slate-700">{item}</span>
                      </div>
                      <span className="text-xs text-slate-300 group-hover:text-slate-500 transition-colors">+</span>
                    </Button>
                  ))}
                </div>
              </div>

              {/* Interactions */}
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                  Interactions
                </p>
                <div className="mt-3 grid gap-2">
                  {interactionItems.map((item) => (
                    <Button
                      key={item}
                      variant="outline"
                      className="group h-10 flex items-center justify-between cursor-grab active:cursor-grabbing hover:border-slate-400 hover:bg-slate-50"
                      draggable
                      onDragStart={(e) => {
                        e.dataTransfer.setData(
                          "application/json",
                          JSON.stringify({ type: "element", item })
                        );
                        e.dataTransfer.effectAllowed = "copy";
                      }}
                      onClick={() => {
                        const data = elementInitialData[item as string];
                        if (data) {
                          addElement(data as any);
                        }
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <GripVertical className="h-4 w-4 text-slate-300 opacity-0 transition-opacity group-hover:opacity-100" />
                        <span className="text-sm font-medium text-slate-700">{item}</span>
                      </div>
                      <span className="text-xs text-slate-300 group-hover:text-slate-500 transition-colors">+</span>
                    </Button>
                  ))}
                </div>
              </div>

              {/* Plugins */}
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                  Plugins
                </p>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  {pluginItems.map((item) => (
                    <Card
                      key={item}
                      className="py-0 border-slate-200 bg-slate-50/30 hover:bg-slate-50 transition-colors"
                    >
                      <CardContent className="p-3 text-center text-[11px] font-semibold text-slate-600">
                        {item}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <Button variant="outline" className="mt-2 text-xs h-9 border-dashed border-slate-300 text-slate-500 hover:text-slate-700">
                Browse Plugin Library
              </Button>
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="media" className="m-0 flex-1 min-h-0 overflow-hidden outline-none">
          <MediaLibrary />
        </TabsContent>
      </Tabs>
    </aside>
  );
}
