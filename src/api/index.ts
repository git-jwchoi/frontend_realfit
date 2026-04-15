import type { BodyMeasurements } from "../store/useFittingStore";
import { removeBackground } from '@imgly/background-removal';

/**
 * 3D 마네킹 생성 로직 (사용자 사진만 전송)
 */
export const generate3DModel = async (
  userPhoto: File
): Promise<{ url: string, measurements?: BodyMeasurements }> => {
  return new Promise(async (resolve) => {
    const formData = new FormData();
    formData.append('user_image', userPhoto);

    console.log('--- [API Request: Generate 3D Model] ---');
    console.log('Sending FormData...');

    try {
      const response = await fetch('http://localhost:8000/api/v1/generate-3d', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();

      // 서버에서 전달해준 상대 경로를 절대 경로(로컬 백엔드 기준)로 변환
      const fullUrl = data.model_url.startsWith('http') ? data.model_url : 'http://localhost:8000' + data.model_url;

      // Mock 측정 데이터를 임시로 생성 (실제론 서버가 자체 로직으로 도출해서 응답에 줬다고 가정)
      const mockMeasurements: BodyMeasurements = {
        height_cm: 175.0,
        model_height_unit: 1.82,
        scale_factor: 175.0 / 1.82,
        shoulder_width_cm: 45.0,
        chest_width_cm: 30.5,
        waist_width_cm: 26.0,
        hip_width_cm: 33.1
      };

      console.log('--- [API Response: Success] 3D Model URL:', fullUrl);
      resolve({ url: fullUrl, measurements: data.measurements || mockMeasurements });
    } catch (e) {
      console.warn('Backend unavailable, using local mock OBJ:', e);
      const mockMeasurementsFallback: BodyMeasurements = {
        height_cm: 175.0,
        model_height_unit: 1.82,
        scale_factor: 175.0 / 1.82,
        shoulder_width_cm: 45.0,
        chest_width_cm: 30.5,
        waist_width_cm: 26.0,
        hip_width_cm: 33.1
      };
      resolve({ url: '/mock/my_A_pose_mannequin%20(1).obj', measurements: mockMeasurementsFallback });
    }
  });
};

/**
 * 2D VTON(옷 입히기) 생성 로직 (사용자 사진 + 옷 사진 전송 + 디자인 색상)
 */
export const generateVTONResult = async (userPhoto: File, clothingPhoto: File, customColor: string): Promise<string> => {
  return new Promise(async (resolve, reject) => {
    const formData = new FormData();
    formData.append('user_image', userPhoto);
    formData.append('clothing_image', clothingPhoto);
    if (customColor !== 'transparent') {
      formData.append('custom_color', customColor); // 백엔드에 염색 색상 전달
    }

    console.log('--- [API Request: Generate VTON] ---');
    console.log('Sending FormData:');

    try {
      const response = await fetch('http://localhost:8000/api/v1/generate-vton', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('VTON Image generation failed');
      const data = await response.json();

      const fullUrl = data.result_image_url.startsWith('http') ? data.result_image_url : 'http://localhost:8000' + data.result_image_url;
      console.log('--- [API Response: Success] VTON URL:', fullUrl);
      resolve(fullUrl);
    } catch (e) {
      console.error('Backend connection error (VTON):', e);
      reject(e);
    }
  });
};

/**
 * 가상의 사이즈 추천 API 목업
 * (나중에 실제 백엔드 연동 시 endpoint 호출 로직으로 변경 가능합니다)
 */
export const getSizeRecommendation = async (
  chestWidth: number
): Promise<{ size: string; confidence: number; detail: string }> => {
  return new Promise((resolve) => {
    // API 레이턴시 시뮬레이션
    setTimeout(() => {
      let size = 'XXL';
      let confidence = 85;
      let detail = '체형을 넉넉하게 감싸는 오버핏을 추천합니다.';

      if (chestWidth < 24) { size = 'XS'; detail = '신체에 딱 맞는 타이트한 슬림핏이 예상됩니다.'; confidence = 88; }
      else if (chestWidth < 27) { size = 'S'; detail = '어깨와 가슴선이 단정한 정사이즈 핏입니다.'; confidence = 92; }
      else if (chestWidth < 30) { size = 'M'; detail = '가장 편안하고 세련된 스탠다드 핏입니다.'; confidence = 96; }
      else if (chestWidth < 33) { size = 'L'; detail = '활동성이 좋은 여유로운 루즈핏입니다.'; confidence = 89; }
      else if (chestWidth < 36) { size = 'XL'; detail = '트렌디하게 떨어지는 오버핏 실루엣입니다.'; confidence = 83; }

      resolve({ size, confidence, detail });
    }, 600);
  });
};

/**
 * 옷 사진 누끼 제거 및 로컬 상태(임시 DB) 저장
 * @imgly/background-removal을 활용하여 백엔드 없이 브라우저 내에서 직접 배경을 제거합니다.
 */
export const uploadAndRemoveBackground = async (clothingPhoto: File): Promise<string> => {
  console.log('--- [Client-Side AI: Background Removal] Starting ---');
  
  try {
    const config = {
      model: "isnet" as const, // 고품질 모델로 변경
      output: {
        format: "image/png" as const, // PNG 포맷 적용 (WebP의 알파채널 색상 손실 방지)
      },
      progress: (key: string, current: number, total: number) => {
         const percentage = Math.round((current / total) * 100);
         console.log(`AI Model Loading [${key}]: ${percentage}%`);
      }
    };
    
    // File 객체를 직접 라이브러리에 입력하여 배경 제거된 Blob 추출
    const blob = await removeBackground(clothingPhoto, config);
    
    // Blob을 가상의 상품 이미지 주소(Object URL)로 변환
    const transparentUrl = URL.createObjectURL(blob);
    console.log('--- [Client-Side AI: Background Removal] Success ---');
    
    return transparentUrl;
  } catch (err) {
    console.error('Background removal failed:', err);
    throw err;
  }
};
