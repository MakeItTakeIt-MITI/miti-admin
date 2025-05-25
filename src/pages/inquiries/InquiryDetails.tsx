import { useParams } from "react-router-dom";
import { useInquiryDetailsHook } from "../../features/inquries/hooks/useInquiryDetailsHook";
import { useInquiryReplyHook } from "../../features/inquries/hooks/useInquiryReplyHook";
import { useState } from "react";
import { InquiryAnswerField } from "../../features/inquries/interface/inquries";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";

export const InquiryDetails = () => {
  const [replyContent, setReplyContent] = useState("");
  const { id } = useParams();
  const idNumber = Number(id);

  const { data: inquiryDetails } = useInquiryDetailsHook(idNumber);
  const { mutate: replyToInquiry } = useInquiryReplyHook();

  const handleSubmitReply = () => {
    replyToInquiry({
      questionId: inquiryDetails?.data.id,
      content: replyContent,
    });
  };

  const headers = [
    "id",
    "email",
    "nickname",
    "name",
    "birthday",
    "signup_method",
    "phone",
    "created_at",
  ];

  return (
    <>
      {/* profile display */}
      <section className=" w-full space-y-4">
        {/* <section className="pt-[2rem]   h-[18rem]  px-[2rem] w-full   bg-[#fff] "> */}
        <Card>
          <CardHeader>
            <CardTitle>사용자 정보</CardTitle>
            {/* <CardDescription>Card Description</CardDescription> */}
          </CardHeader>
          <CardContent>
            {/* <p>Card Content</p> */}{" "}
            <table className="border-collapse    w-full ">
              <thead>
                <tr>
                  {headers.map((header, i) => (
                    <th
                      key={i}
                      className=" border-b w-[120px] px-4 py-1 bg-gray-100"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {/* {data.map((row, ri) => ( */}
                <tr key={inquiryDetails?.data.user.id}>
                  {/* {row.map((cell, ci) => ( */}
                  <td className="w-[120px] text-center px-4 py-1">
                    {inquiryDetails?.data.user.id}
                  </td>
                  <td className="w-[120px] text-center px-4 py-1">
                    {inquiryDetails?.data.user.email}
                  </td>
                  <td className="w-[120px] text-center px-4 py-1">
                    {inquiryDetails?.data.user.nickname}
                  </td>
                  <td className="w-[120px] text-center px-4 py-1">
                    {inquiryDetails?.data.user.name}
                  </td>
                  <td className="w-[120px] text-center px-4 py-1">
                    {inquiryDetails?.data.user.birthday}
                  </td>
                  <td className="w-[120px] text-center px-4 py-1">
                    {inquiryDetails?.data.user.signup_method}
                  </td>
                  <td className="w-[120px] text-center px-4 py-1">
                    {inquiryDetails?.data.user.phone}
                  </td>
                  <td className="w-[120px] text-center px-4 py-1">
                    {inquiryDetails?.data.user.created_at.slice(0, 10)}
                  </td>
                </tr>
                {/* ))} */}
              </tbody>
            </table>
          </CardContent>
        </Card>

        <Card className="h-[30%]">
          <CardHeader>
            <CardTitle>문의 내용</CardTitle>
          </CardHeader>
          <CardContent className="space-2">
            <h1 className="font-bold text-2xl">
              {" "}
              {inquiryDetails?.data.title}
            </h1>
            <hr />
            <p className="p-2">{inquiryDetails?.data.content}</p>
          </CardContent>
        </Card>

        <Card className="h-[30%]">
          <CardHeader>
            <CardTitle>관리자 답변</CardTitle>
          </CardHeader>
          <CardContent className="space-2">
            {inquiryDetails?.data.num_of_answers === 0 && (
              <h1 className="flex items-center justify-center w-full h-full font-bold">
                {" "}
                아직 관리자 답변이 없습니다!
              </h1>
            )}
            <ul className="space-y-4 ">
              {inquiryDetails?.data.answers.map(
                (answer: InquiryAnswerField) => (
                  <li className="border border-gray-200 rounded-md p-4 text-sm flex flex-col gap-2">
                    <span className="font-bold">
                      [{answer.created_at.slice(0, 10)}{" "}
                      {answer.created_at.slice(11, 16)}]
                    </span>

                    <span> {answer.content}</span>
                  </li>
                )
              )}
            </ul>
          </CardContent>
        </Card>
        <div>
          <textarea
            onChange={(e) => setReplyContent(e.target.value)}
            className="w-full border border-gray-400 p-2 resize-none"
            placeholder="답변"
          />
          <Button
            variant={"destructive"}
            type="button"
            onClick={handleSubmitReply}
            className="w-full"
          >
            답변하기
          </Button>
        </div>
      </section>
    </>
  );
};
