import { create } from 'zustand'

export interface FittingState {
  // 1단계: 사용자 전신 사진
  photoFile: File | null;
  photoPreviewUrl: string | null;
  // 2단계: 의류 (옷) 사진 및 디자인 커스텀
  clothingFile: File | null;
  clothingPreviewUrl: string | null;
  customColor: string; // 새로 추가된 색상 커스텀 코드 (ex: #FFFFFF)
  
  // 결과물 URL (3D 마네킹과 2D 피팅 결과)
  modelUrl: string | null;
  vtonResultUrl: string | null;
  
  // 기타 UI 상태
  isLoading: boolean;
  activeTab: '3d' | '2d'; // 탭 토글 상태 ("3d" 또는 "2d")
  activeTool: 'VIEW' | 'SCULPT' | 'TEXTURE' | 'LIGHT'; // 좌측 네비버 툴 아이콘 활성화 관리

  // 1번 커스텀(Body Sculpting) 체형 비율
  bodyParams: {
    height: number;
    width: number;
    depth: number;
  };

  // 페이지 라우팅
  currentPage: 'HOME' | 'ATELIER' | 'ARCHIVE' | 'ABOUT';

  // 상태 변경 메서드
  setPhoto: (file: File | null, previewUrl: string | null) => void;
  setClothing: (file: File | null, previewUrl: string | null) => void;
  setCustomColor: (hexStr: string) => void;
  setModelUrl: (url: string | null) => void;
  setVtonResultUrl: (url: string | null) => void;
  setIsLoading: (loading: boolean) => void;
  setActiveTab: (tab: '3d' | '2d') => void;
  setActiveTool: (tool: 'VIEW' | 'SCULPT' | 'TEXTURE' | 'LIGHT') => void;
  setBodyParams: (params: { height?: number; width?: number; depth?: number }) => void;
  setCurrentPage: (page: 'HOME' | 'ATELIER' | 'ARCHIVE' | 'ABOUT') => void;
}

export const useFittingStore = create<FittingState>((set) => ({
  photoFile: null,
  photoPreviewUrl: null,
  clothingFile: null,
  clothingPreviewUrl: null,
  customColor: 'transparent',
  modelUrl: null, 
  vtonResultUrl: null,
  isLoading: false,
  activeTab: '3d', // 기본적으로 3D 마네킹을 보여줌
  activeTool: 'VIEW', // 기본 탭은 사진 업로드(VIEW) 창
  currentPage: 'HOME', // 앱 진입 첫 화면은 쇼핑몰 카탈로그
  
  bodyParams: {
    height: 1.0,
    width: 1.0,
    depth: 1.0,
  },

  setPhoto: (file, previewUrl) => set({ photoFile: file, photoPreviewUrl: previewUrl }),
  setClothing: (file, previewUrl) => set({ clothingFile: file, clothingPreviewUrl: previewUrl, customColor: 'transparent' }), // 옷이 바뀌면 컬러 리셋
  setCustomColor: (hexStr) => set({ customColor: hexStr }),
  setModelUrl: (url) => set({ modelUrl: url, bodyParams: { height: 1.0, width: 1.0, depth: 1.0 } }), // 모델 바뀌면 체형 리셋
  setVtonResultUrl: (url) => set({ vtonResultUrl: url }),
  setIsLoading: (loading) => set({ isLoading: loading }),
  setActiveTab: (tab) => set({ activeTab: tab }),
  setActiveTool: (tool) => set({ activeTool: tool }),
  setBodyParams: (params) => set((state) => ({ bodyParams: { ...state.bodyParams, ...params } })),
  setCurrentPage: (page) => set({ currentPage: page }),
}))
