import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, ContactShadows, useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import { useFittingStore } from '../../store/useFittingStore'

// 실제 GLB 렌더링 컴포넌트 (백엔드 연동 전 고품질 더미 모델 적용)
const MannequinModel = ({ url }: { url: string }) => {
  // 실제 서버 파일이 없을 땐 Three.js의 인체형 에셋(Michelle)을 더미로 불러옵니다.
  const loadUrl = url === '/mock/mock_mannequin.glb'
    ? 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/models/gltf/Xbot.glb'
    : url

  const { scene } = useGLTF(loadUrl)

  // 마네킹 프로토타입 느낌: 부드러운 무광 피부톤 재질로 교체
  scene.traverse((child) => {
    if ((child as THREE.Mesh).isMesh) {
      const mesh = child as THREE.Mesh
      mesh.material = new THREE.MeshStandardMaterial({
        color: '#d4c096', // 자연스러운 피부톤 베이지
        roughness: 0.7,
        metalness: 0.0,
      })
    }
  })

  return <primitive object={scene} position={[0, -1.2, 0]} scale={1.3} />
}

export const MannequinViewer: React.FC = () => {
  const { modelUrl, isLoading } = useFittingStore()

  return (
    <div className="w-full h-full bg-[#1a1a1a] rounded-2xl overflow-hidden relative">
      {isLoading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm">
          <div className="text-blue-400 font-semibold text-lg animate-pulse">Loading 3D Mannequin...</div>
        </div>
      )}

      <Canvas camera={{ position: [0, 1.5, 3.5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[5, 10, 5]} angle={0.25} penumbra={1} intensity={1} castShadow />
        <directionalLight position={[-5, 5, -5]} intensity={0.5} />

        <Environment preset="city" />

        <Suspense fallback={null}>
          {modelUrl ? (
            <MannequinModel url={modelUrl} />
          ) : (
            // 로드 전에는 스탠바이 용도의 심플 메쉬 (스케일 파악용) 표출
            <mesh position={[0, 1, 0]}>
              <boxGeometry args={[0.5, 2, 0.5]} />
              <meshStandardMaterial color="#4f46e5" wireframe />
            </mesh>
          )}
        </Suspense>

        <ContactShadows position={[0, 0, 0]} opacity={0.4} scale={5} blur={2} far={4} />
        <OrbitControls
          enablePan={false}
          minDistance={1.5}
          maxDistance={5}
          maxPolarAngle={Math.PI / 2 + 0.1}
        />
      </Canvas>
    </div>
  )
}
