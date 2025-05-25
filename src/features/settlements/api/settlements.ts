import axiosUrl from "../../../utils/axios"
import { TransferField } from "../interface/settlements"

export const fetchPaymentsList = async (page: number) => {
    try {
        const response = await axiosUrl.get(`admin/transfer-requests?page=${page}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
}
export const fetchSettlementDetails = async (requestId: number) => {
    try {
        const response = await axiosUrl.get(`/admin/transfer-requests/${requestId}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
}


export const patchTransferStatus = async (requestId: number, data: TransferField) => {
    try {
        const response = await axiosUrl.get(`/admin/transfer-requests/${requestId}`, { data })
        return response.data
    } catch (error) {
        console.log(error)
    }
}