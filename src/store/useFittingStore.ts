import { create } from 'zustand'

export interface FittingState {
  photoFile: File | null;
  photoPreviewUrl: string | null;
  modelUrl: string | null;
  isLoading: boolean;
  setPhoto: (file: File | null, previewUrl: string | null) => void;
  setModelUrl: (url: string | null) => void;
  setIsLoading: (loading: boolean) => void;
}

export const useFittingStore = create<FittingState>((set) => ({
  photoFile: null,
  photoPreviewUrl: null,
  modelUrl: null, 
  isLoading: false,
  setPhoto: (file, previewUrl) => set({ photoFile: file, photoPreviewUrl: previewUrl }),
  setModelUrl: (url) => set({ modelUrl: url }),
  setIsLoading: (loading) => set({ isLoading: loading }),
}))
