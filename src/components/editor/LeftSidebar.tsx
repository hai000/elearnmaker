import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useEditorStore } from "@/store/editorStore";
import { SIDEBAR_CATEGORIES, elementInitialData } from "@/constants/sidebarElements";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FolderIcon, LayoutPanelLeft, Plus } from "lucide-react";
import MediaLibrary from "./MediaLibrary";

export default function LeftSidebar() {
  const addElement = useEditorStore((state) => state.addElement);

  return (
    <aside className="flex h-full min-h-0 w-72 flex-col border-r border-slate-200/80 bg-white/80 backdrop-blur-sm">
      <Tabs defaultValue="components" className="flex h-full flex-col">
        <div className="px-4 py-4 pt-5 pb-3">
          <TabsList className="grid w-full grid-cols-2 bg-slate-100/80 p-1 rounded-lg">
            <TabsTrigger value="components" className="gap-2 text-xs font-semibold data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all">
              <LayoutPanelLeft className="h-3.5 w-3.5" />
              Thành phần
            </TabsTrigger>
            <TabsTrigger value="media" className="gap-2 text-xs font-semibold data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all">
              <FolderIcon className="h-3.5 w-3.5" />
              Thư viện
            </TabsTrigger>
          </TabsList>
        </div>

        <Separator className="opacity-40" />

        <TabsContent value="components" className="m-0 flex-1 min-h-0 overflow-hidden outline-none">
          <ScrollArea className="h-full">
            <div className="flex flex-col gap-8 px-5 py-6">
              {SIDEBAR_CATEGORIES.map((category) => (
                <div key={category.display} className="flex flex-col gap-3">
                  <h3 className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400/90 ml-1">
                    {category.display}
                  </h3>
                  <div className="grid grid-cols-1 gap-2">
                    {category.items.map((item) => {
                      const Icon = item.icon;
                      return (
                        <div
                          key={item.id}
                          className="group relative flex items-center gap-3 p-2.5 rounded-xl border border-transparent bg-slate-50/50 hover:bg-white hover:border-slate-200 hover:shadow-sm transition-all cursor-grab active:cursor-grabbing"
                          draggable
                          onDragStart={(e) => {
                            e.dataTransfer.setData(
                              "application/json",
                              JSON.stringify({ type: "element", item: item.id })
                            );
                            e.dataTransfer.effectAllowed = "copy";
                          }}
                          onClick={() => {
                            const data = elementInitialData[item.id];
                            if (data) {
                              addElement(data as Parameters<typeof addElement>[0]);
                            }
                          }}
                        >
                          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white border border-slate-100 text-slate-600 group-hover:text-blue-600 group-hover:border-blue-100 group-hover:bg-blue-50 transition-colors shadow-sm">
                            <Icon className="h-4.5 w-4.5" />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[13px] font-semibold text-slate-700 group-hover:text-slate-900 transition-colors">
                              {item.label}
                            </span>
                          </div>
                          <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                             <Plus className="h-3.5 w-3.5 text-slate-400 hover:text-blue-500" />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
              
              <div className="mt-2 p-4 rounded-xl border border-dashed border-slate-200 bg-slate-50/30">
                <p className="text-[11px] text-slate-400 text-center leading-relaxed">
                  Sẽ có thêm thành phần trong Thư viện plugin
                </p>
                <Button variant="ghost" className="w-full mt-3 text-xs h-8 text-blue-600 hover:bg-blue-50 hover:text-blue-700">
                  Duyệt plugin
                </Button>
              </div>
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
