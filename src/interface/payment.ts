enum TransferStatus {
    Waiting = "waiting",
    Completed = "completed",
    Failed = "failed",
}


export interface TransferField {
    id: number;
    amount: number;
    account_bank: string;
    account_holder: string;
    account_number: string;
    transfer_status: TransferStatus
    created_at: string;
    transferred_at: string | null;
}
