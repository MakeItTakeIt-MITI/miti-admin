export interface PlayerProfile {
    gender: string | null;
    height: number | null;
    weight: number | null;
    position: string | null;
    role: string | null;
}

export interface User {
    id: number;
    email: string;
    nickname: string;
    name: string;
    birthday: string;
    signup_method: string;
    phone: string;
    player_profile: PlayerProfile;
}

export interface ParticipationStatus {
    id: number;
    participation_status: string;
    user: User;
}