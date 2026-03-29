import React, { Suspense, useMemo } from 'react'
import { Canvas, useLoader } from '@react-three/fiber'
import { OrbitControls, Environment, ContactShadows, useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js'
import { useFittingStore } from '../../store/useFittingStore'

// OBJ 파일 렌더링 컴포넌트 (버그 없는 자동 센터링 및 스케일링)
const ObjModel = ({ url }: { url: string }) => {
  const obj = useLoader(OBJLoader, url)

  // 1단계: 원본 캐시 오염을 막기 위한 복제 및 재질/법선 세팅
  const clonedObj = useMemo(() => {
    const clone = obj.clone(true)
    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh
        const geometry = mesh.geometry
        if (!geometry.attributes.normal) {
          geometry.computeVertexNormals()
        }
        if (geometry.attributes.color) {
          mesh.material = new THREE.MeshStandardMaterial({
            vertexColors: true,
            roughness: 0.6,
            metalness: 0.0,
          })
        } else {
          mesh.material = new THREE.MeshStandardMaterial({
            color: '#d4c096',
            roughness: 0.7,
            metalness: 0.0,
          })
        }
      }
    })
    return clone
  }, [obj])

  // 2단계: 크기와 중심점 계산 (단 1회)
  const { center, maxDim, minY } = useMemo(() => {
    const box = new THREE.Box3().setFromObject(clonedObj)
    const c = box.getCenter(new THREE.Vector3())
    const s = box.getSize(new THREE.Vector3())
    return {
      center: c,
      maxDim: Math.max(s.x, s.y, s.z),
      minY: box.min.y
    }
  }, [clonedObj])

  const targetSize = 3.0 // 뷰어 높이 (카메라 시야에 꽉 차게)
  const scale = maxDim > 0 ? targetSize / maxDim : 1.0

  // 3단계: 계층 구조로 완벽한 Transform 적용
  // Scale 적용 -> Y축 회전(정면) -> 기하학적 중심을 원점(Y=0)으로 이동
  // 최상단 그룹은 Y를 반만큼 내려서 카메라 시야의 정중앙에 전신이 오도록 맞춤
  return (
    <group position={[0, -targetSize / 2, 0]}>
      <group scale={scale}>
        <group rotation={[0, Math.PI, 0]}>
          <primitive 
            object={clonedObj} 
            position={[-center.x, -minY, -center.z]} 
          />
        </group>
      </group>
    </group>
  )
}

// GLB 파일 렌더링 컴포넌트
const GlbModel = ({ url }: { url: string }) => {
  const loadUrl = url === '/mock/mock_mannequin.glb'
    ? 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/models/gltf/Xbot.glb'
    : url

  const { scene } = useGLTF(loadUrl)

  useMemo(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh
        mesh.material = new THREE.MeshStandardMaterial({
          color: '#d4c096',
          roughness: 0.7,
          metalness: 0.0,
        })
      }
    })
  }, [scene])

  return <primitive object={scene} position={[0, -1.2, 0]} scale={1.3} />
}

// URL 확장자에 따라 적절한 로더를 선택하는 분기 컴포넌트
const MannequinModel = ({ url }: { url: string }) => {
  if (url.endsWith('.obj')) {
    return <ObjModel url={url} />
  }
  return <GlbModel url={url} />
}

export const MannequinViewer: React.FC = () => {
  const { modelUrl, isLoading } = useFittingStore()

  return (
    <div className="w-full h-full bg-[#1a1a1a] rounded-2xl overflow-hidden relative">
      {isLoading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="text-blue-400 font-semibold text-lg animate-pulse">Loading 3D Mannequin...</div>
        </div>
      )}

      <Canvas camera={{ position: [0, 0, 3.5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[5, 10, 5]} angle={0.25} penumbra={1} intensity={1} castShadow />
        <directionalLight position={[-5, 5, -5]} intensity={0.5} />

        <Environment preset="city" />

        <Suspense fallback={null}>
          {modelUrl ? (
            <MannequinModel url={modelUrl} />
          ) : (
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
