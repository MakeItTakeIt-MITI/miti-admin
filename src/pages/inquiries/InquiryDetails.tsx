import { useParams } from "react-router-dom";
import { useInquiryDetailsHook } from "../../features/inquries/hooks/useInquiryDetailsHook";
import { useInquiryReplyHook } from "../../features/inquries/hooks/useInquiryReplyHook";
import { useState } from "react";
import { InquiryAnswerField } from "../../features/inquries/interface/inquries";

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
      <header className=" pt-[2rem] px-[2rem] w-full   bg-[#fff] ">
        <div className="shadow-md border w-full min-h-[80px] mx-auto px-4 py-6 bg-[#f5f5f5]  flex flex-col justify-between rounded-md">
          <h1 className="font-bold text-2xl">문의 상세</h1>
        </div>
      </header>

      {/* profile display */}
      <section className="pt-[2rem]   h-[18rem]  px-[2rem] w-full   bg-[#fff] ">
        <div className="shadow-md p-8 w-full h-full bg-[#f5f5f5]  flex justify-between rounded-md  ">
          <div className="flex items-center gap-4">
            <img
              src={inquiryDetails?.data.user.profile_image_url}
              alt="user profile img"
            />

            {/* info */}

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
          </div>
        </div>
      </section>

      <section className="pt-[2rem] px-[2rem] w-full   bg-[#fff] ">
        <div className="shadow-md w-full  min-h-[900px] px-4 py-6 bg-[#f5f5f5]  flex justify-between rounded-md  ">
          <div className="w-[60%] p-4 bg-[#fff] space-y-4">
            <h1 className="font-bold text-2xl">
              {" "}
              {inquiryDetails?.data.title}
            </h1>
            <hr />
            <p className="p-2">{inquiryDetails?.data.content}</p>
          </div>
          <div className="w-[38%]  flex flex-col justify-between ">
            <div
              style={{
                scrollbarWidth: "thin",
              }}
              className="bg-white h-[60%] overflow-y-auto  p-4"
            >
              {inquiryDetails?.data.num_of_answers === 0 && (
                <h1 className="flex items-center justify-center w-full h-full font-bold">
                  {" "}
                  아직 관리자 답변이 없습니다!
                </h1>
              )}
              <ul className="space-y-4 ">
                {inquiryDetails?.data.answers.map(
                  (answer: InquiryAnswerField) => (
                    <li className="border border-gray-200 rounded-md p-4 text-sm">
                      [{answer.created_at}] {answer.content}
                    </li>
                  )
                )}
              </ul>
            </div>
            <div className="bg-white h-[28%] p-4">
              <textarea
                onChange={(e) => setReplyContent(e.target.value)}
                className="w-full h-full border border-gray-400 p-2 resize-none"
              />
            </div>
            <button
              type="button"
              onClick={handleSubmitReply}
              className="bg-blue-600 h-[5%] rounded-lg text-white hover:brightness-105"
            >
              답변하기
            </button>
          </div>
        </div>
      </section>
    </>
  );
};
