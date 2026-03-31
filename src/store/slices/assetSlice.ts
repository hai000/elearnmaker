import { StateCreator } from "zustand";
import { EditorState } from "../types";

export const createAssetSlice: StateCreator<EditorState, [], [], Pick<EditorState, 
  "assets" | "addAsset" | "deleteAsset"
>> = (set) => ({
  assets: [],
  addAsset: (asset) =>
    set((state) => ({
      isDirty: true,
      assets: [...state.assets, asset],
    })),
  deleteAsset: (id) =>
    set((state) => ({
      isDirty: true,
      assets: state.assets.filter((asset) => asset.id !== id),
    })),
});
