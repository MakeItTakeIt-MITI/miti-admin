import { usePrivateInquiryDetaisHook } from "../../hook/usePrivateInquiryDetaisHook";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import CloseIcon from "@mui/icons-material/Close";
import { Button } from "@mui/material";
import { useState } from "react";
import ReplyBox from "./ReplyBox";
import { InquiryAnswerField } from "../../interface/support";

interface InquiryDetailProp {
  setDisplayModal: (arg: boolean) => void;
  inquiryId: number | null;
}

const InquiryDetail = ({ setDisplayModal, inquiryId }: InquiryDetailProp) => {
  const { data } = usePrivateInquiryDetaisHook(inquiryId);

  const [displayReplyBox, setDisplayReplyBox] = useState(false);

  return (
    <>
      {displayReplyBox && (
        <ReplyBox
          setDisplayReplyBox={setDisplayReplyBox}
          inquiryId={inquiryId}
        />
      )}
      <div
        onClick={() => {
          setDisplayModal(false);
          setDisplayReplyBox(false);
        }}
        className="fixed top-0 right-0 bottom-0 left-0 h-full w-full flex items-center justify-end z-[888] bg-gray-800 bg-opacity-50"
      >
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          style={{
            transition: "transform 0.3s ease-in-out",
            transform: "translateX(0)",
          }}
          className="w-[80rem] h-full bg-white border-l-2 drawer-closing flex flex-col"
        >
          <div className="flex justify-between p-4 border-b border-gray-400">
            <div className="flex items-center gap-2">
              <SupportAgentIcon />
              <h1 className="font-bold ">익명 문의 상세정보 </h1>
            </div>
            <div
              onClick={() => setDisplayModal(false)}
              className="cursor-pointer"
            >
              <CloseIcon />
            </div>
          </div>
          <div className="flex">
            <div className="p-5 w-[40rem] space-y-4">
              <div className="border border-gray-200 p-3 h-[40rem] rounded-xl flex flex-col justify-between">
                {/* content */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between px-1">
                    <h3 className="font-[500] text-xl">{data?.data.title}</h3>{" "}
                    <div className="flex items-center gap-4 text-xs font-[400]">
                      <p>
                        작성일: {data?.data.created_at.slice(0, 10)} (
                        {data?.data.created_at.slice(11, 16)})
                      </p>
                      <p>
                        {data?.data.modified_at.length > 1 && (
                          <>
                            수정일: {data?.data.modified_at.slice(0, 10)} (
                            {data?.data.modified_at.slice(11, 16)})
                          </>
                        )}
                      </p>
                    </div>
                    {/* <h3 className="font-[500] text-md"> #{data?.data.id}</h3> */}
                  </div>
                  <hr className="bg-gray-200 rounded-xl" />
                  <p
                    style={{
                      scrollbarWidth: "thin",
                    }}
                    className="text-[#555]  h-[20rem] overflow-y-auto px-2"
                  >
                    {data?.data.content}
                  </p>
                </div>
                {/* dates */}
              </div>
              <div className="w-full flex justify-end">
                <Button
                  onClick={() => setDisplayReplyBox(true)}
                  variant="contained"
                  className="w-full"
                >
                  답변하기
                </Button>
              </div>
            </div>
            {/* 답변 리스트 */}
            <div
              style={{
                scrollbarWidth: "thin",
              }}
              className="p-5  w-[50rem] space-y-4 h-[58rem]  overflow-y-auto"
            >
              <h1 className="font-bold text-sm ">관리자 답변</h1>
              {data?.data.answers.map((answer: InquiryAnswerField) => (
                <div
                  key={answer.id}
                  className="border border-gray-200  h-40 overflow-y-auto p-4 rounded-lg flex flex-col justify-between"
                >
                  <p className="text-sm"> {answer.content}</p>
                  <div className="flex items-center justify-end">
                    <span className="text-xs text-[#555]">
                      {answer.created_at.slice(0, 10)}{" "}
                      {answer.created_at.slice(11, 16)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InquiryDetail;
