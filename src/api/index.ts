

/**
 * 3D 마네킹 생성 로직 (사용자 사진 하나만 전송)
 */
export const generate3DModel = async (userPhoto: File): Promise<string> => {
  return new Promise((resolve) => {
    // 1. 서버로 전송할 FormData 생성
    const formData = new FormData();
    formData.append('user_image', userPhoto);
    
    console.log('--- [API Request: Generate 3D Model] ---');
    console.log('Sending FormData:');
    for (let [key, value] of formData.entries()) {
      console.log(`- ${key}:`, value instanceof File ? `File(${value.name}, ${value.type})` : value);
    }
    
    // 2. 가짜 통신 지연 (3초)
    setTimeout(() => {
      console.log('--- [API Response: Success] ---');
      // 성공 시 백엔드에서 생성된 3D OBJ의 고유 ULR을 문자열로 반환한다고 가장
      resolve('/mock/test_0.obj'); 
    }, 3000);
  });
};

/**
 * 2D VTON(옷 입히기) 생성 로직 (사용자 사진 + 옷 사진 전송 + 디자인 색상)
 */
export const generateVTONResult = async (userPhoto: File, clothingPhoto: File, customColor: string): Promise<string> => {
  return new Promise((resolve) => {
    // 1. 서버로 전송할 FormData 생성
    const formData = new FormData();
    formData.append('user_image', userPhoto);
    formData.append('clothing_image', clothingPhoto);
    if (customColor !== 'transparent') {
      formData.append('custom_color', customColor); // 백엔드에 염색 색상 전달
    }
    
    console.log('--- [API Request: Generate VTON] ---');
    console.log('Sending FormData:');
    for (let [key, value] of formData.entries()) {
      console.log(`- ${key}:`, value instanceof File ? `File(${value.name}, ${value.type})` : value);
    }
    
    // 2. 가짜 통신 지연 (3초)
    setTimeout(() => {
      console.log('--- [API Response: Success] ---');
      // VTON 결과를 나타내는 목업 2D 이미지 반환 (현재는 테스트 이미지 사용)
      resolve('https://dummyimage.com/600x800/2a2a2a/ffffff.png&text=VTON+Result+Mock'); 
    }, 3000);
  });
};
