import { useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei'

const Dog = () => {

    useThree(({ camera, scene, gl }) => {
        console.log(camera.position);
    })

    return (
        <>
            <mesh>
                <meshBasicMaterial color={0x00FF00} />
                <boxGeometry args={[1, 1, 1]} />
            </mesh>
            <OrbitControls />
        </>
    )
}

export default Dog