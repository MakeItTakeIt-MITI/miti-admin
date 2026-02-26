// enum TransferStatus {
//     Waiting = "waiting" | "이체",
//     Completed = "completed",
//     Failed = "declined",
// }

export interface TransferField {
  id: number;
  amount: number;
  account_bank: string;
  account_holder: string;
  account_number: string;
  transfer_status: string;
  created_at: string;
  transferred_at: string | null;
}
