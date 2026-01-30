import { useEffect, useState } from "react";
import { loadImageAsync } from "@/util/image/loader";

type Status = "idle" | "loading" | "success" | "error";

export interface UseImageResult {
  data?: HTMLImageElement[];
  error?: unknown;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
}

type ImageProp = {
  url: string;
  width?: number;
};

type Props = {
  images: ImageProp[];
};

export const useLoadImages = (props: Props): UseImageResult => {
  const [status, setStatus] = useState<Status>("idle");
  const [data, setData] = useState<HTMLImageElement[]>([]);
  const [error, setError] = useState<unknown>(undefined);

  useEffect(() => {
    let canceled = false;

    setData([]);
    setStatus("loading");
    setError(undefined);

    const tasks = props.images.map((prop) => loadImageAsync(prop.url, prop.width));
    Promise.all(tasks)
      .then((imgs) => {
        if (canceled) return;
        setData(imgs);
        setStatus("success");
      })
      .catch((err) => {
        if (canceled) return;
        setError(err);
        setStatus("error");
      });

    return () => {
      canceled = true;
    };
  }, [props.images]);

  return {
    data,
    error,
    isLoading: status === "loading",
    isError: status === "error",
    isSuccess: status === "success",
  };
};
