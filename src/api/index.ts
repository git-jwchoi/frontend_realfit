/**
 * 3D 마네킹 생성 로직 (사용자 사진 하나만 전송)
 */
export const generate3DModel = async (userPhoto: File): Promise<string> => {
  return new Promise(async (resolve, reject) => {
    const formData = new FormData();
    formData.append('user_image', userPhoto);
    
    console.log('--- [API Request: Generate 3D Model] ---');
    console.log('Sending FormData:');
    
    try {
      const response = await fetch('http://localhost:8000/api/v1/generate-3d', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) throw new Error('API request failed');
      const data = await response.json();
      
      // 도커 백엔드의 응답은 '/static/dummy/...' 상대경로입니다. 앱 로드를 위해 절대 주소로 바꿉니다.
      const fullUrl = data.model_url.startsWith('http') ? data.model_url : 'http://localhost:8000' + data.model_url;
      console.log('--- [API Response: Success] 3D Model URL:', fullUrl);
      resolve(fullUrl); 
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
