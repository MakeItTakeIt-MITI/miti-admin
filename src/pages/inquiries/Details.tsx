import { useParams } from "react-router-dom";
import { PageHeader } from "../../features/common/PageHeader";
import { PageLayout } from "../../features/common/PageLayout";
import { usePrivateInquiryDetaisHook } from "../../hook/usePrivateInquiryDetaisHook";

export const Details = () => {
  const { id } = useParams();

  const { data } = usePrivateInquiryDetaisHook(Number(id));

  const content = data?.data;
  return (
    <>
      <PageHeader title={`문의 상세 정보 (${content?.id})`} />
      {/* <PageHeader title="경기 상세 " /> */}

      <PageLayout>
        <div className="space-y-4">
          <div className="h-[4rem] bg-white border-lg p-4 flex items-center gap-8">
            <span>닉네임: {content?.nickname}</span>
            <span>ID: {content?.id}</span>
          </div>
          <div
            style={{
              scrollbarWidth: "thin",
            }}
            className="h-[30rem] overflow-y-auto bg-white p-4 space-y-4 rounded-lg"
          >
            <h1 className="font-bold text-xl">{content?.title}</h1>
            <hr />
            <p className="text-sm">{content?.content} </p>
          </div>

          <h1 className="h-[6rem] bg-white rounded-lg flex items-center  justify-between font-bold text-lg px-8">
            <h2> 관리자 답변: {content?.answers.length}</h2>
          </h1>

          <div className="h-[25rem] bg-white rounded-lg flex flex-col gap-2  text-lg p-4">
            <textarea
              style={{
                resize: "none",
                scrollbarWidth: "thin",
                outlineStyle: "none",
              }}
              className="overflow-y-auto h-full w-full border border-gray-400 p-2 text-sm text-gray-800 font-semibold"
            />
            <button
              type="button"
              className="w-full h-14  text-sm  bg-blue-600 text-white rounded-md"
            >
              답변하기
            </button>
          </div>

          {/* <div
            style={{
              scrollbarWidth: "thin",
            }}
            className="h-[10rem] overflow-y-auto bg-white p-4 space-y-4 rounded-lg"
          >
            <h1 className="font-semibold text-right">[관리자 답변]</h1>
            <hr />
            <p>안녕하세요?</p>
          </div> */}
        </div>
      </PageLayout>
    </>
  );
};
