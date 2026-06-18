import { useForm, SubmitHandler, useWatch } from "react-hook-form";
import { DismissPayload, PenalizePayload } from "../api/report_update";
import { ReportType } from "../interface/reports";

interface FormData {
  penalty: string;
  duration: string;
  content: string;
  refund_participation_payment: boolean;
  delete_post: boolean;
}

interface Props {
  isModalOpen: "approve" | "dismiss" | null;
  reportType: ReportType | null;
  setIsModalOpen: (arg: "approve" | "dismiss" | null) => void;
  handleDismissReport: (data: DismissPayload) => void;
  handlePenalizeReport: (data: PenalizePayload) => void;
}

const selectClassName =
  "w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500";

const inputClassName =
  "w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500";

export const ReportActionModal = ({
  isModalOpen,
  reportType,
  setIsModalOpen,
  handleDismissReport,
  handlePenalizeReport,
}: Props) => {
  const { register, handleSubmit, control } = useForm<FormData>({
    defaultValues: {
      penalty: "warning",
      duration: "",
      content: "",
      refund_participation_payment: true,
      delete_post: true,
    },
  });

  const penalty = useWatch({ control, name: "penalty" });
  const isSuspension = penalty === "suspension";
  const isHostOrTeam = reportType === "host_report" || reportType === "team_schedule_host_report";
  const isPost = reportType === "post_report";

  if (isModalOpen === null) return null;

  const onFormSubmit: SubmitHandler<FormData> = (data) => {
    if (isModalOpen === "dismiss") {
      handleDismissReport({ content: data.content });
    } else {
      const payload: PenalizePayload = {
        penalty: data.penalty,
        content: data.content,
      };
      if (isSuspension) {
        payload.duration = Number(data.duration);
      }
      if (isHostOrTeam) {
        payload.refund_participation_payment = data.refund_participation_payment;
      }
      if (isPost) {
        payload.delete_post = data.delete_post;
      }
      handlePenalizeReport(payload);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-lg overflow-hidden rounded-xl bg-gray-900 border border-gray-700 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-700 px-6 py-4">
          <h2 className="text-lg font-semibold text-white">
            {isModalOpen === "approve" ? "신고 인정" : "신고 기각"}
          </h2>
          <button
            onClick={() => setIsModalOpen(null)}
            className="rounded-full p-1 text-gray-400 hover:bg-gray-800 hover:text-gray-200"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit(onFormSubmit)} className="px-6 py-6 space-y-5">
          {/* 신고 인정 전용 필드 */}
          {isModalOpen === "approve" && (
            <>
              {/* 제재 수위 */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-300">제재 수위</label>
                <select {...register("penalty")} className={selectClassName}>
                  <option value="warning">서비스 경고</option>
                  <option value="suspension">이용 정지</option>
                  <option value="no_action">조치 없음</option>
                </select>
              </div>

              {/* 정지 기간 (suspension 선택 시에만) */}
              {isSuspension && (
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-300">
                    정지 기간 (일) <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="number"
                    min={1}
                    {...register("duration", { required: isSuspension })}
                    placeholder="예: 7"
                    className={inputClassName}
                  />
                </div>
              )}

              {/* 참가비 환불 (host_report / team_schedule_host_report) */}
              {isHostOrTeam && (
                <div className="flex items-center gap-3 rounded-lg border border-gray-700 p-3">
                  <input
                    id="refund_payment"
                    type="checkbox"
                    {...register("refund_participation_payment")}
                    className="h-4 w-4 rounded border-gray-600 bg-gray-800 text-blue-500 focus:ring-blue-500"
                  />
                  <label htmlFor="refund_payment" className="cursor-pointer text-sm font-medium text-gray-300">
                    참가비 환불
                  </label>
                </div>
              )}

              {/* 게시글 삭제 (post_report) */}
              {isPost && (
                <div className="flex items-center gap-3 rounded-lg border border-gray-700 p-3">
                  <input
                    id="delete_post"
                    type="checkbox"
                    {...register("delete_post")}
                    className="h-4 w-4 rounded border-gray-600 bg-gray-800 text-blue-500 focus:ring-blue-500"
                  />
                  <label htmlFor="delete_post" className="cursor-pointer text-sm font-medium text-gray-300">
                    신고된 게시글 삭제
                  </label>
                </div>
              )}
            </>
          )}

          {/* 처리 내용 */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-300">
              처리 내용 <span className="text-red-400">*</span>
            </label>
            <textarea
              {...register("content", { required: true })}
              rows={4}
              placeholder="사유를 입력하세요 (필수)"
              className={`${inputClassName} resize-none`}
            />
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setIsModalOpen(null)}
              className="rounded-lg border border-gray-600 bg-gray-800 px-4 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700"
            >
              취소
            </button>
            <button
              type="submit"
              className={`rounded-lg px-4 py-2 text-sm font-medium text-white ${
                isModalOpen === "approve"
                  ? "bg-red-600 hover:bg-red-500"
                  : "bg-blue-700 hover:bg-blue-600"
              }`}
            >
              {isModalOpen === "approve" ? "신고 인정" : "신고 기각"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
