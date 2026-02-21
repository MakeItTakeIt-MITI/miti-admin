import { useForm, SubmitHandler } from "react-hook-form";

interface ReportStatusFormData {
  result: string;
  penalty: string;
  report_status: string;
  duration: string;
  refund_participation_payment: boolean;
  content: string;
}

interface Props {
  isModalOpen: "approve" | "dismiss" | null;
  reportType: string | null;
  setIsModalOpen: (arg: "approve" | "dismiss" | null) => void;
  handleDismissReport: (arg: {
    result: string;
    report_status: string;
    content: string;
  }) => void;
}

export const ReportActionModal = ({
  isModalOpen,
  reportType,
  setIsModalOpen,
  handleDismissReport,
}: Props) => {
  const { register, handleSubmit } = useForm<ReportStatusFormData>();

  if (isModalOpen === null) {
    return null;
  }

  const onFormSubmit: SubmitHandler<ReportStatusFormData> = (data) => {
    console.log(data);
    if (isModalOpen === "dismiss") {
      handleDismissReport(data);
    }
    setIsModalOpen(null);
  };

  const selectClassName =
    "w-full appearance-none rounded-lg border border-gray-300 bg-gray-50 bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%236b7280%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:0.7em_0.7em] bg-[right_0.75rem_center] bg-no-repeat px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-lg overflow-hidden rounded-xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
          <h2 className="text-lg font-semibold text-gray-900">
            {isModalOpen === "approve" ? "신고 인정" : "신고 기각"}
          </h2>
          <button
            onClick={() => setIsModalOpen(null)}
            className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit(onFormSubmit)} className="px-6 py-6">
          <div className="space-y-5">
            {/* Result */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                처리 결과
              </label>
              <select
                {...register("result", { required: true })}
                className={selectClassName}
              >
                {isModalOpen === "approve" ? (
                  <option value="penalized">신고 인정 </option>
                ) : (
                  <option value="dismissed">신고 기각 </option>
                )}
              </select>
            </div>

            <input
              {...register("content", { required: true })}
              className={selectClassName}
              placeholder={"사유를 입력하세요 (필수)"}
            />

            {/* Penalty */}
            {isModalOpen === "approve" && (
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  신고 내용
                </label>
                <select
                  {...register("penalty", { required: true })}
                  className={selectClassName}
                >
                  <option value="">선택안함</option>
                  <option value="suspension">이용 정지 </option>
                  <option value="warning">서비스 경고 </option>
                </select>
              </div>
            )}

            {/* Report Status */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                진행 상태
              </label>
              <select
                {...register("report_status", { required: true })}
                className={selectClassName}
              >
                <option value="">선택안함</option>
                <option value="waiting">대기중 </option>
                <option value="evidence_requested">자료 요청</option>
                <option value="investigation_in_progress">조사진행중</option>
                <option value="concluded">처리완료 </option>
              </select>
            </div>

            {/* Duration */}
            {isModalOpen === "approve" && (
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  신고 기간
                </label>
                <input
                  type="text"
                  {...register("duration")}
                  placeholder="숫제를 입력해 주세요 (예: 7)"
                  className="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            )}

            {/* Refund Checkbox */}
            {isModalOpen === "approve" && reportType === "host_report" && (
              <div className="flex items-center gap-3 rounded-lg border border-gray-200 p-3">
                <input
                  id="refund_payment"
                  type="checkbox"
                  {...register("refund_participation_payment")}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label
                  htmlFor="refund_payment"
                  className="cursor-pointer text-sm font-medium text-gray-700"
                >
                  참가비 환불
                </label>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="mt-8 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsModalOpen(null)}
              className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200"
            >
              취소
            </button>
            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              저장
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
