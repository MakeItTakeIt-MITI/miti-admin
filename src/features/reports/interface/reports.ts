export interface ReportsField {
    id: number;
    reportee: number;
    game: number;
    category: "intentional_cheating" | "abusive_language" | "unsportsmanlike_behavior"
    content: string;
    report_status: "pending" | "evidence_requested" | "resolved" | "rejected" | string;
    created_at: string;
}