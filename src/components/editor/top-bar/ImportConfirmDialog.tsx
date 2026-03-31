"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type ImportConfirmDialogProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  onCancel: () => void;
};

export function ImportConfirmDialog({
  isOpen,
  onOpenChange,
  onConfirm,
  onCancel,
}: ImportConfirmDialogProps) {
  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Nhập dự án mới?</AlertDialogTitle>
          <AlertDialogDescription>
            Hành động này sẽ ghi đè toàn bộ dữ liệu hiện tại trong bài học của bạn. 
            Bạn nên xuất (Export) dự án hiện tại trước nếu muốn lưu lại. 
            Hành động này không thể hoàn tác.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel}>Hủy bỏ</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm} className="bg-slate-900 text-white hover:bg-slate-800">
            Tiếp tục và ghi đè
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
