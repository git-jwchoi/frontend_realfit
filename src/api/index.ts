import type { BodyMeasurements } from "../store/useFittingStore";

/**
 * 3D 마네킹 생성 로직 (사용자 사진만 전송)
 */
export const generate3DModel = async (
  userPhoto: File
): Promise<{ url: string, measurements?: BodyMeasurements }> => {
  return new Promise(async (resolve, reject) => {
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
      console.error('Backend connection error (3D):', e);
      reject(e);
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
