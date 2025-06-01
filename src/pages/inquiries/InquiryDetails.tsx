import { useSearchParams } from "react-router-dom";
import { useInquiryDetailsHook } from "../../features/inquries/hooks/useInquiryDetailsHook";
import { useInquiryReplyHook } from "../../features/inquries/hooks/useInquiryReplyHook";
import { useState } from "react";
import { InquiryAnswerField } from "../../features/inquries/interface/inquries";

import { Button } from "../../components/ui/button";
import { Textarea } from "../../components/ui/textarea";

export const InquiryDetails = () => {
  const [searchParams] = useSearchParams();
  const inquiryId = searchParams.get("inquiryId");

  const [replyContent, setReplyContent] = useState("");

  const { data: inquiryDetails } = useInquiryDetailsHook(Number(inquiryId));
  const { mutate: replyToInquiry } = useInquiryReplyHook();

  const handleSubmitReply = () => {
    replyToInquiry({
      questionId: inquiryDetails?.data.id,
      content: replyContent,
    });
    setReplyContent("");
  };

  return (
    <section className=" w-full min-h-screen text-white p-8 space-y-8 ">
      <ul className="bg-[#1f2937] h-[6rem] rounded-lg p-8 flex items-center gap-10 text-sm ">
        <li className="flex flex-col gap-1">
          <span className="">사용자 ID</span>
          <span className="text-sm text-gray-400">
            {inquiryDetails?.data.user.id}
          </span>
        </li>
        <li className="flex flex-col gap-1">
          <span className="">이메일</span>
          <span className="text-sm text-gray-400">
            {inquiryDetails?.data.user.email}
          </span>
        </li>
        <li className="flex flex-col gap-1">
          <span className="">닉네임</span>
          <span className="text-sm text-gray-400">
            {inquiryDetails?.data.user.nickname}
          </span>
        </li>
        <li className="flex flex-col gap-1">
          <span className="">생년월일</span>
          <span className="text-sm text-gray-400">
            {inquiryDetails?.data.user.birthday}
          </span>
        </li>
        <li className="flex flex-col gap-1">
          <span className="">가입수단</span>
          <span className="text-sm text-gray-400">
            {inquiryDetails?.data.user.signup_method}
          </span>
        </li>
        <li className="flex flex-col gap-1">
          <span className="">연락처</span>
          <span className="text-sm text-gray-400">
            {inquiryDetails?.data.user.phone}
          </span>
        </li>
        <li className="flex flex-col gap-1">
          <span className="">가입 날짜</span>
          <span className="text-sm text-gray-400">
            {inquiryDetails?.data.user.created_at.slice(0, 10)}
          </span>
        </li>
      </ul>

      <article className="flex gap-10 ">
        {/* CONTENT */}
        <div className="p-8 bg-[#1f2937] w-[60%] h-[50rem]  rounded-lg ">
          {/* FLEX-BETWEEN CONTENT AND SUBMIT CONTAINER */}
          <div className="flex flex-col justify-between h-full">
            {/* user inquiry title and content */}
            <div className="space-y-4">
              <h1 className="font-semibold text-lg  text-wrap truncate">
                <span> {inquiryDetails?.data.title}</span>
              </h1>
              <hr />
              <p>
                <span className="text-gray-400">
                  {inquiryDetails?.data.content}
                </span>
              </p>
            </div>

            <div>
              <Textarea
                placeholder="답변을 입력하세요..."
                onChange={(e) => setReplyContent(e.target.value)}
              />
              <Button
                variant={"destructive"}
                type="button"
                onClick={handleSubmitReply}
                className="w-full mt-4"
              >
                답변하기
              </Button>
            </div>
          </div>
        </div>

        {/* textarea and submit buttions */}
        <div className="w-[40%] h-[45rem] overlfow-y-auto ">
          <ul className="space-y-4  h-full ">
            {inquiryDetails?.data.num_of_answers === 0 && (
              <li className="text-center text-gray-400">
                아직 관리자 답변이 없습니다!
              </li>
            )}
            {inquiryDetails?.data.answers.map((answer: InquiryAnswerField) => (
              <li
                key={answer.id}
                className="border text-wrap border-gray-200 rounded-md p-4 text-sm flex flex-col gap-2"
              >
                <span className="font-bold">
                  [{answer.created_at.slice(0, 10)}{" "}
                  {answer.created_at.slice(11, 16)}]
                </span>
                <span>{answer.content}</span>
              </li>
            ))}
          </ul>
        </div>
      </article>
    </section>
  );
};
