import { useQuery } from "@tanstack/react-query";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getReportDetails } from "../api/report_details";
import { useState } from "react";
import { useDismissReportStatus } from "./mutation/useDismissReportStatus";

export const useReportDetailsPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const reportId = searchParams.get("reportId");
  const reportType = searchParams.get("report_type");
  const [isModalOpen, setIsModalOpen] = useState<"approve" | "dismiss" | null>(
    null
  );

  const handleToggleApproveModal = () => {
    setIsModalOpen((prev) => (prev === "approve" ? null : "approve"));
  };

  const handleToggleDismissModal = () => {
    setIsModalOpen((prev) => (prev === "dismiss" ? null : "dismiss"));
  };

  const { data, isLoading } = useQuery({
    queryKey: ["report-detail", reportId],
    queryFn: () => getReportDetails(Number(reportId)),
    enabled: !!reportId,
  });

  const report = data?.data;

  interface DismissReportStatusData {
    result: string;
    report_status: string;
    content: string;
  }

  const reportTypeChange = () => {
    switch (reportType) {
      case "host_report":
        return "host-reports";
      case "guest_report":
        return "guest-reports";
      case "post_report":
        return "post-reports";
      case "user_report":
        return "reports";
      default:
        return "reports";
    }
  };

  const { mutate: dismissReportMutation } = useDismissReportStatus();

  const handleDismissReport = (payload: DismissReportStatusData) => {
    dismissReportMutation({
      report_type: reportTypeChange(),
      reportId: Number(reportId),
      data: payload,
    });
  };
  // 상태 한글 변환
  const statusLabel = (status: string) => {
    switch (status) {
      case "waiting":
        return "대기중";
      case "evidence_requested":
        return "자료 요청";
      case "investigation_in_progress":
        return "조사진행중";
      case "concluded":
        return "처리완료";
      default:
        return status;
    }
  };

  // 타입 한글 변환
  const typeLabel = (type: string) => {
    switch (type) {
      case "post_report":
        return "게시글 신고";
      case "user_report":
        return "사용자 신고";
      case "comment_report":
        return "댓글 신고";
      case "game_report":
        return "경기 신고";
      default:
        return type || "-";
    }
  };

  // 상태 뱃지 클래스
  const statusBadge = (status: string) => {
    switch (status) {
      case "concluded":
        return "bg-emerald-600/20 text-emerald-300 ring-1 ring-inset ring-emerald-500/30";
      case "waiting":
        return "bg-amber-600/20 text-amber-300 ring-1 ring-inset ring-amber-500/30";
      case "evidence_requested":
        return "bg-blue-600/20 text-blue-300 ring-1 ring-inset ring-blue-500/30";
      case "investigation_in_progress":
        return "bg-purple-600/20 text-purple-300 ring-1 ring-inset ring-purple-500/30";
      default:
        return "bg-gray-600/20 text-gray-300 ring-1 ring-inset ring-gray-500/30";
    }
  };

  // 타입 뱃지 클래스
  const typeBadge = (type: string) => {
    switch (type) {
      case "post_report":
        return "bg-indigo-600/20 text-indigo-300 ring-1 ring-inset ring-indigo-500/30";
      case "user_report":
        return "bg-rose-600/20 text-rose-300 ring-1 ring-inset ring-rose-500/30";
      case "comment_report":
        return "bg-yellow-600/20 text-yellow-300 ring-1 ring-inset ring-yellow-500/30";
      case "game_report":
        return "bg-teal-600/20 text-teal-300 ring-1 ring-inset ring-teal-500/30";
      default:
        return "bg-gray-600/20 text-gray-300 ring-1 ring-inset ring-gray-500/30";
    }
  };

  return {
    statusLabel,
    typeLabel,
    statusBadge,
    typeBadge,
    report,
    isLoading,
    navigate,
    isModalOpen,
    handleToggleApproveModal,
    handleToggleDismissModal,
    reportType,
    setIsModalOpen,
    handleDismissReport,
  };
};
