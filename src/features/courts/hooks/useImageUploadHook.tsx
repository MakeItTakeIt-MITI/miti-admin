import { useState } from "react";
// import { useGetFileUrl } from "./query/useGetFileUrl";

export const useImageUploadHook = () => {
  const [file, setFile] = useState<FileList | null>(null);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files);
  };

  // const { data: urlData } = useGetFileUrl();
  // console.log(urlData?.data.png[0].upload_url);
  // console.log(urlData?.data.png[0].file_url);
  // console.log(urlData?.data.png[0].content_type);

  return {
    file,
    onChangeHandler,
  };
};
