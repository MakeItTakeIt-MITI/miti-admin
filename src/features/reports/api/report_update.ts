import axiosUrl from "../../../utils/axios"


interface PenalizeReportStatusData {
    result: string
    penalty: string
    report_status: string
    duration: string
    content: string
    refund_participation_payment?: boolean

}

interface DismissReportStatusData {
    result: string
    report_status: string
    content: string
}

type ReportType = "reports" | "host-reports" | "guest-reports" | "post-reports"



// /admin/reports/<int:report_id>/penalize
// /admin/host-reports/<int:report_id>/penalize
///admin/guest-reports/<int:report_id>/penalize
///admin/post-reports/<int:report_id>/penalize

export const penalizerReportStatus = async (report_type: ReportType, reportId: number, data: PenalizeReportStatusData) => {
    try {
        const response = await axiosUrl.post(`/admin/${report_type}/${reportId}/penalize`, data
        )
        return response.data
    } catch (error) {
        console.log(error)
    }
}



// }/admin/reports/<int:report>/dismiss 관리자 - 유저 신고 기각 API
// /admin/host-reports/<int:report_id>/dismiss 관리자 - 호스트 신고 기각 API
// /admin/guest-reports/<int:report_id>/dismiss 관리자 - 게스트 신고 기각 API																			
// /admin/post-reports/<int:report_id>/dismiss 관리자 - 게시글 신고 기각 API


export const dismissReportStatus = async (report_type: ReportType, reportId: number, data: DismissReportStatusData) => {
    try {
        const response = await axiosUrl.post(`/admin/${report_type}/${reportId}/dismiss`, data
        )
        return response.data
    } catch (error) {
        console.log(error)
        return error
    }
}
