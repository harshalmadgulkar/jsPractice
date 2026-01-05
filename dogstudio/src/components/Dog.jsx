import * as THREE from 'three';
import { OrbitControls, Texture, useGLTF, useTexture, useAnimations } from '@react-three/drei'
import { useThree } from '@react-three/fiber';
import { useEffect } from 'react';

const Dog = () => {
    const model = useGLTF("./models/dog.drc.glb");

    useThree(({ camera, scene, gl }) => {
        camera.position.z = 0.55
        gl.toneMapping = THREE.ReinhardToneMapping
        gl.outputColorSpace = THREE.SRGBColorSpace
    })

    const { actions } = useAnimations(model.animations, model.scene)

    useEffect(() => {
        actions["Take 001"].play();
    }, [actions])

    const [normalMap, sampleMatCap, branchMap, branchNormalMap] = (useTexture([
        "./dog_normals.jpg",
        "/matcap/mat-2.png",
        "./branches_diffuse.jpeg",
        "branches_normals.jpeg"
    ])).map(texture => {
        texture.flipY = false
        texture.colorSpace = THREE.SRGBColorSpace

        return texture
    })

    const dogMaterial = new THREE.MeshMatcapMaterial({
        normalMap: normalMap,
        matcap: sampleMatCap
    })

    const branchMaterial = new THREE.MeshMatcapMaterial({
        normalMap: branchNormalMap,
        map: branchMap
    })

    model.scene.traverse((child) => {
        if (child.name.includes("DOG")) {
            child.material = dogMaterial
        }
        if (child.name.includes("BRANCHS")) {
            child.material = branchMaterial
        }
    })

    return (
        <>
            <primitive object={model.scene} position={[0.25, -0.55, 0]} rotation={[0, Math.PI / 4, 0]} />
            <directionalLight position={[0, 5, 5]} color={0xFFFFFF} intensity={10} />
            <OrbitControls />
        </>
    )
}

export default Dog