import axiosUrl from "../../../utils/axios"

interface UpdateReportStatusData {
result:string 
penalty: string
report_status: string
duration: string
refund_participation_payment?: boolean

}

export const updateReportStatus = async (report_type: string| null, reportId: number, data: UpdateReportStatusData) => {
    try {
        const response = await axiosUrl.post(`/admin/${report_type}/${reportId}`, data
        )
        return response.data
    } catch (error) {
        console.log(error)
    }
}