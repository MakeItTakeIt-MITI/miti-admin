import { Button } from "@mui/material";
import { useAnswerInquiryHook } from "../../hook/useAnswerInquiryHook";
import { useState } from "react";

const ReplyBox = ({
  setDisplayReplyBox,
  inquiryId,
}: {
  setDisplayReplyBox: (arg: boolean) => void;
  inquiryId: number | null;
}) => {
  const [content, setContent] = useState("");
  const { mutate } = useAnswerInquiryHook(inquiryId);

  const handleAnswerInquiry = () => {
    mutate({ content: content });
  };
  return (
    <section className="fixed top-0 right-0 bottom-0 left-0 h-full w-full flex items-center justify-center z-[888] bg-gray-800 bg-opacity-50 z-[9999]">
      <div className="w-[50rem] h-[30rem] bg-white p-6 space-y-4 rounded-xl">
        <h1 className="font-bold text-gray-600 text-xl">
          답변을 작성해 주세요
        </h1>
        <textarea
          onChange={(e) => setContent(e.target.value)}
          style={{
            scrollbarWidth: "thin",
          }}
          placeholder="문의에 대한 답변을 입력하세요."
          className="w-full h-[20rem] p-3 border border-gray-400 focus:border-gray-400 resize-none overflow-y-auto text-sm"
        />
        <div className="flex justify-center gap-4">
          <Button
            onClick={() => setDisplayReplyBox(false)}
            variant="outlined"
            className="w-[10rem]"
          >
            취소
          </Button>
          <Button
            onClick={() => {
              handleAnswerInquiry();
              setDisplayReplyBox(false);
            }}
            variant="contained"
            className="w-[10rem]"
          >
            답변 제출
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ReplyBox;
