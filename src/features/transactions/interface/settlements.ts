export interface SettlementsField {
  id: number;
  account: number;
  transfer_status: "completed" | "pending" | "failed";
  amount: number;
  account_bank: string;
  account_holder: string;
  account_number: string;
  created_at: string;
}

export interface TransferField {
  transfer_status: "completed" | "pending" | "declined";
}
