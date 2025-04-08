export interface InquiryDataField {
    id: number;
    user: number;
    title: string;
    nickname: string;
    num_of_answers: number;
    created_at: string
    modified_at: string;
}

export interface InquiryAnswerField {
    id: number;
    content: string;
    created_at: string;
    modified_at: string
}