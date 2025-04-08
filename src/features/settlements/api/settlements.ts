import axiosUrl from "../../../utils/axios"

export const fetchPaymentsList = async () => {
    try {
        const response = await axiosUrl.get(`admin/transfer-requests`)
        return response.data
    } catch (error) {
        console.log(error)
    }
}
export const fetchSettlementDetails = async (settlementId: number) => {
    try {
        const response = await axiosUrl.get(`/admin/transfer-requests/${settlementId}s`)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

