import { useEffect, useRef } from "react";
import { PerspectiveCamera, Vector3 } from "three";

export interface UseCameraProps {
  fov?: number;
  aspect?: number;
  near?: number;
  far?: number;
  position?: Vector3;
  lookAt?: Vector3;
}

const defaultCameraOptions: Required<UseCameraProps> = {
  fov: 45,
  aspect: 1920 / 1080,
  near: 0.001,
  far: 10000,
  position: new Vector3(0, 0, 0),
  lookAt: new Vector3(0, 0, 0),
};
const defaultCamera = new PerspectiveCamera(
  defaultCameraOptions.fov,
  defaultCameraOptions.aspect,
  defaultCameraOptions.near,
  defaultCameraOptions.far,
);

export const useCamera = (props: UseCameraProps) => {
  const camera = useRef(defaultCamera);

  useEffect(() => {
    camera.current.fov = props.fov ?? defaultCameraOptions.fov;
    camera.current.aspect = props.aspect ?? defaultCameraOptions.aspect;
    camera.current.near = props.near ?? defaultCameraOptions.near;
    camera.current.far = props.far ?? defaultCameraOptions.far;

    if (props.position) {
      camera.current.position.set(
        props.position.x ?? defaultCameraOptions.position.x,
        props.position.y ?? defaultCameraOptions.position.y,
        props.position.z ?? defaultCameraOptions.position.z,
      );
    }

    if (props.lookAt) {
      camera.current.lookAt(
        props.lookAt.x ?? defaultCameraOptions.lookAt.x,
        props.lookAt.y ?? defaultCameraOptions.lookAt.y,
        props.lookAt.z ?? defaultCameraOptions.lookAt.z,
      );
    }

    camera.current.updateProjectionMatrix();
  }, [props]);

  return {
    camera: camera.current,
  };
};
