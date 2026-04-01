"use client";

import { Zap } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { PropertyCard } from "./PropertyCard";
import { useEditorStore } from "@/store/editorStore";
import type { SlideElement, SlideElementPatch } from "@/store/types";

interface ActionPropertiesProps {
    element: SlideElement;
    updateElement: (id: string, patch: SlideElementPatch) => void;
    title?: string;
}

const actionOptions = [
    { value: "none", label: "Không" },
    { value: "go_to_slide", label: "Chuyển tới slide" },
    { value: "show_element", label: "Hiển thị phần tử" },
    { value: "hide_element", label: "Ẩn phần tử" },
    { value: "toggle_element", label: "Chuyển đổi phần tử" },
] as const;

export function ActionProperties({ element, updateElement, title = "Hành động khi hoàn thành" }: ActionPropertiesProps) {
    const slides = useEditorStore((state) => state.slides);
    const elements = useEditorStore((state) => state.elements);

    const props = (element.props as any);

    return (
        <PropertyCard 
            title={title} 
            icon={<Zap className="h-3.5 w-3.5 text-blue-500" />}
        >
            <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100">
                    <div className="space-y-0.5">
                        <Label className="text-[10px] font-bold uppercase tracking-tight text-blue-700">Khóa hành động</Label>
                        <p className="text-[10px] text-slate-500 leading-tight">Yêu cầu hoàn thành mọi bài tập trên trang.</p>
                    </div>
                    <Switch
                        checked={props.requireCompletion || false}
                        onCheckedChange={(checked) =>
                            updateElement(element.id, {
                                props: { ...props, requireCompletion: checked }
                            })
                        }
                    />
                </div>

                <div className="grid gap-2">
                    <Select
                        value={props.actionType || "none"}
                        onValueChange={(val) =>
                            updateElement(element.id, {
                                props: { ...props, actionType: val },
                            })
                        }
                    >
                        <SelectTrigger className="bg-slate-50 border-slate-200">
                            <SelectValue placeholder="Chọn hành động" />
                        </SelectTrigger>
                        <SelectContent>
                            {actionOptions.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {props.actionType === "go_to_slide" && (
                    <div className="grid gap-2 animate-in fade-in slide-in-from-top-1 duration-200">
                        <Label className="text-[10px] font-medium text-slate-500">Slide đích</Label>
                        <Select
                            value={props.targetSlideId || ""}
                            onValueChange={(val) =>
                                updateElement(element.id, {
                                    props: { ...props, targetSlideId: val },
                                })
                            }
                        >
                            <SelectTrigger className="bg-white border-slate-200">
                                <SelectValue placeholder="Chọn slide" />
                            </SelectTrigger>
                            <SelectContent>
                                {slides.map((slide) => (
                                    <SelectItem key={slide.id} value={slide.id}>
                                        {slide.title}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                )}

                {["show_element", "hide_element", "toggle_element"].includes(props.actionType) && (
                    <div className="grid gap-2 animate-in fade-in slide-in-from-top-1 duration-200">
                        <Label className="text-[10px] font-medium text-slate-500">Phần tử đích</Label>
                        <div className="grid gap-1.5 border bg-white border-slate-200 p-3 rounded-lg max-h-40 overflow-y-auto custom-scrollbar">
                            {elements.filter(e => e.id !== element.id && e.slideId === element.slideId).length === 0 ? (
                                <p className="text-[10px] text-slate-400 italic">Không có phần tử khác trên slide.</p>
                            ) : (
                                elements
                                    .filter(e => e.id !== element.id && e.slideId === element.slideId)
                                    .map((tgt) => {
                                        const isSelected = props.targetElementIds?.includes(tgt.id);
                                        const tgtLabel = tgt.name || `${tgt.type.toUpperCase()} (${tgt.id.slice(0, 5)})`;
                                        return (
                                            <label key={tgt.id} className="flex flex-row items-center space-x-2.5 text-xs font-medium cursor-pointer py-0.5 hover:text-blue-600 transition-colors">
                                                <input
                                                    type="checkbox"
                                                    className="rounded border-slate-300 w-3.5 h-3.5 text-blue-600 focus:ring-blue-500"
                                                    checked={isSelected || false}
                                                    onChange={(e) => {
                                                        let nextIds = [...(props.targetElementIds || [])];
                                                        if (e.target.checked) {
                                                            nextIds.push(tgt.id);
                                                        } else {
                                                            nextIds = nextIds.filter(id => id !== tgt.id);
                                                        }
                                                        updateElement(element.id, {
                                                            props: { ...props, targetElementIds: nextIds }
                                                        });
                                                    }}
                                                />
                                                <span className={isSelected ? "text-blue-600 font-bold" : "text-slate-600"}>{tgtLabel}</span>
                                            </label>
                                        );
                                    })
                            )}
                        </div>
                    </div>
                )}
            </div>
        </PropertyCard>
    );
}
