import { Court } from "./court";
import { Game } from "./game";
import { UserField } from "./users";

export interface ReportField {
    id: number;
    reportee: number;
    game: number;
    category: string;
    content: string;
    report_status: string;
    created_at: string;
}


export interface ReportDetailField {
    id: number;
    reportee: UserField;
    game: Game;
    category: string;
    content: string;
    report_status: string;
    created_at: string;
}

export interface ReportersListField {
    id: number;
    game_status: string;
    title: string;
    startdate: string;
    starttime: string;
    enddate: string;
    endtime: string;
    min_invitation: number;
    max_invitation: number;
    fee: number;
    info: string;
    court: Court
    reports: ReportField[]
}