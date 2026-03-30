import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus, Trash2 } from "lucide-react";
import type { PropertiesPanelProps } from "@/plugins/registry";
import { VisibilityProperties } from "./properties/VisibilityProperties";
import type { SortGameElement } from "@/store/types";

export default function SortGameProperties({ element, updateElement }: PropertiesPanelProps) {
  if (element.type !== "sort_game") {
    return null;
  }

  const sortElement = element as SortGameElement;

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateElement(element.id, {
      props: { ...sortElement.props, title: e.target.value },
    });
  };

  const handleCheckLabelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateElement(element.id, {
      props: { ...sortElement.props, checkLabel: e.target.value },
    });
  };

  const handleItemChange = (index: number, value: string) => {
    const newItems = [...sortElement.props.items];
    newItems[index] = value;
    updateElement(element.id, {
      props: { ...element.props, items: newItems },
    });
  };

  const handleAddItem = () => {
    if (sortElement.props.items.length >= 6) return;
    updateElement(element.id, {
      props: { ...sortElement.props, items: [...sortElement.props.items, "Bước mới"] },
    });
  };

  const handleRemoveItem = (index: number) => {
    const newItems = sortElement.props.items.filter((_: string, i: number) => i !== index);
    updateElement(element.id, {
      props: { ...sortElement.props, items: newItems },
    });
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Cài đặt chung */}
      <div className="grid gap-2">
        <Label>Tiêu đề Game</Label>
        <Input value={sortElement.props.title} onChange={handleTitleChange} />
      </div>

      <div className="grid gap-2">
        <Label>Chữ nút Kiểm tra</Label>
        <Input 
          value={sortElement.props.checkLabel || "Kiểm tra đáp án"} 
          onChange={handleCheckLabelChange} 
        />
      </div>

      <Separator />

      {/* Quản lý danh sách */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label>Danh sách Bước (Nhập ĐÚNG thứ tự)</Label>
          <span className="text-xs text-slate-500">
            {sortElement.props.items.length}/6
          </span>
        </div>

        <div className="space-y-2">
          {sortElement.props.items.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className="flex bg-slate-100 items-center justify-center w-6 h-8 shrink-0 rounded text-xs text-slate-500 font-semibold border">
                {index + 1}
              </div>
              <Input
                value={item}
                onChange={(e) => handleItemChange(index, e.target.value)}
                className="h-8"
              />
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 shrink-0 text-slate-400 hover:text-red-600"
                onClick={() => handleRemoveItem(index)}
                disabled={sortElement.props.items.length <= 2}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>

        {sortElement.props.items.length < 6 && (
          <Button variant="outline" size="sm" className="w-full mt-2" onClick={handleAddItem}>
            <Plus className="mr-2 h-4 w-4" />
            Thêm bước
          </Button>
        )}
      </div>

      {/* Tích hợp cấu hình thuộc tính hiển thị (Visibility + Animation) */}
      <VisibilityProperties element={element} updateElement={updateElement} />
    </div>
  );
}
