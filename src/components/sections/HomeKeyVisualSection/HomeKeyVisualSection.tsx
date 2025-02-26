import { Canvas } from "@/components/unit/Canvas";
import {
  type FC,
  useCallback,
  useEffect,
  useRef,
} from "react";
import {
  Group,
  Scene,
  PointLight,
  AmbientLight,
  Vector3,
  HemisphereLight,
  Box3,
  MeshBasicMaterial,
  type Object3DEventMap,
  type Mesh,
  type BufferGeometry,
  type Object3D,
  AxesHelper,
  Color,
  Vector2,
  Raycaster,
} from "three";
import { useRenderer } from "@/components/hooks/useRenderer";
import { useResize } from "@/components/hooks/useResize";
import { GLTFLoader, OrbitControls } from "three/examples/jsm/Addons.js";
import { useCamera } from "../../hooks/useCamera";
import { useWindow } from "@/components/hooks/useWindow";
import { useCanvas } from "@/components/hooks/useCanvas";
import { useTheme } from "@/components/hooks/useTheme";
import { useInterval } from "@/components/hooks/useInterval";

const scene = new Scene();
const gltfLoader = new GLTFLoader();

const box = new Box3();
const size = new Vector3();
const group = new Group();
const raycaster = new Raycaster();
const mouse = new Vector2();

const lightModeWireColor = new Color(0x696969);
const darkModeWireColor = new Color(0xbdbdbd);
const wireMeshMaterial = new MeshBasicMaterial({
  wireframe: true,
  transparent: true,
  opacity: 1
});

const flushWireMaterial = () => {
  if (wireMeshMaterial.opacity === 0.8) {
    wireMeshMaterial.opacity = 0.4;
  } else {
    wireMeshMaterial.opacity = 0.8;
  }
}

export const HomeKeyVisualSection: FC = () => {
  console.log(scene);
  const cielRef = useRef<Object3D | null>(null);

  const theme = useTheme();
  const ref = useCanvas();
  const { setResizeFn } = useResize();
  const { innerWidth, innerHeight } = useWindow();
  const { renderer } = useRenderer({ ref, options: { alpha: true } });
  const { camera } = useCamera({
    aspect: innerWidth / innerHeight,
    position: new Vector3(0, 0, 32),
  });

  const wireColor = theme?.mode === "light" ? lightModeWireColor : darkModeWireColor;

  const rendering = useCallback(() => {
    if (renderer == null) {
      return;
    }

    renderer.render(scene, camera);
    requestAnimationFrame(rendering);
  }, [renderer, camera]);

  const handleOnLoad = useCallback(async () => {
    wireMeshMaterial.color = wireColor;
    flushWireMaterial();
    renderer?.setSize(innerWidth, innerHeight);

    const GLTFModel = await gltfLoader.loadAsync("/assets/hand.gltf");
    const model = GLTFModel.scene;

    /**
     * @see https://discourse.threejs.org/t/gltf-scene-traverse-property-ismesh-does-not-exist-on-type-object3d/27212
    */
    model.traverse((object) => {
      const obj = object as Mesh<BufferGeometry, MeshBasicMaterial, Object3DEventMap>;
      if (obj.isMesh) {
        obj.material = wireMeshMaterial;
      }
    });

    box.setFromObject(model)

    box.getSize(size);

    model.position.set(-size.x / 4, 0, -size.z / 2);

    group.add(model);
    group.rotation.set(-Math.PI / 2, -Math.PI / 4, Math.PI / 8);

    if (cielRef.current == null) {
      cielRef.current = group;
      scene.add(cielRef.current);
    }

    rendering();
  }, [wireColor, rendering, renderer, innerWidth, innerHeight]);

  const handleOnResize = useCallback(() => {
    renderer?.setSize(innerWidth, innerHeight);

    if (camera == null) {
      return;
    }

    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
  }, [renderer, innerWidth, innerHeight, camera]);

  useInterval({ fn: flushWireMaterial, delay: 30 });
  useEffect(() => {
    if (renderer == null) {
      return;
    }

    handleOnLoad();
    setResizeFn(handleOnResize);

    return () => {
      renderer.dispose(); // レンダラーのメモリ解放
    }
  }, [renderer, handleOnLoad, setResizeFn, handleOnResize]);

  return null;
}