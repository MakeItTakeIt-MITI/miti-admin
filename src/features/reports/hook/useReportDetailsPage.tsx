import { useQuery } from "@tanstack/react-query";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { getReportDetails } from "../api/report_details";
import { useDismissReportStatus } from "./mutation/useDismissReportStatus";
import { usePenalizeReportStatus } from "./mutation/usePenalizeReportStatus";
import { DismissPayload, PenalizePayload } from "../api/report_update";
import { ReportDetail, ReportStatus, ReportType } from "../interface/reports";

export const STATUS_LABEL: Record<ReportStatus, string> = {
  waiting: "대기중",
  evidence_requested: "자료 요청",
  investigation_in_progress: "조사진행중",
  concluded: "처리완료",
};

export const TYPE_LABEL: Record<ReportType, string> = {
  host_report: "호스트 신고",
  guest_report: "게스트 신고",
  post_report: "게시글 신고",
  team_schedule_host_report: "팀 일정 주최자 신고",
  user_report: "사용자 신고",
};

export const STATUS_BADGE: Record<ReportStatus, string> = {
  concluded: "bg-emerald-600/20 text-emerald-300 ring-1 ring-inset ring-emerald-500/30",
  waiting: "bg-amber-600/20 text-amber-300 ring-1 ring-inset ring-amber-500/30",
  evidence_requested: "bg-blue-600/20 text-blue-300 ring-1 ring-inset ring-blue-500/30",
  investigation_in_progress: "bg-purple-600/20 text-purple-300 ring-1 ring-inset ring-purple-500/30",
};

export const TYPE_BADGE: Record<ReportType, string> = {
  host_report: "bg-indigo-600/20 text-indigo-300 ring-1 ring-inset ring-indigo-500/30",
  guest_report: "bg-cyan-600/20 text-cyan-300 ring-1 ring-inset ring-cyan-500/30",
  post_report: "bg-rose-600/20 text-rose-300 ring-1 ring-inset ring-rose-500/30",
  team_schedule_host_report: "bg-orange-600/20 text-orange-300 ring-1 ring-inset ring-orange-500/30",
  user_report: "bg-yellow-600/20 text-yellow-300 ring-1 ring-inset ring-yellow-500/30",
};

export const useReportDetailsPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const reportId = searchParams.get("reportId");
  const [isModalOpen, setIsModalOpen] = useState<"approve" | "dismiss" | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ["report-detail", reportId],
    queryFn: () => getReportDetails(Number(reportId)),
    enabled: !!reportId,
  });

  const report: ReportDetail | undefined = data?.data;

  const { mutate: dismissMutate } = useDismissReportStatus();
  const { mutate: penalizeMutate } = usePenalizeReportStatus();

  const handleDismissReport = (payload: DismissPayload) => {
    dismissMutate({ reportId: Number(reportId), data: payload });
    setIsModalOpen(null);
  };

  const handlePenalizeReport = (payload: PenalizePayload) => {
    penalizeMutate({ reportId: Number(reportId), data: payload });
    setIsModalOpen(null);
  };

  return {
    report,
    isLoading,
    navigate,
    isModalOpen,
    setIsModalOpen,
    handleDismissReport,
    handlePenalizeReport,
  };
};
