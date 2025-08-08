export interface TokenPayload {
    iss: string;
    sub: string;
    user_id: string;
    roles?: string[];
    exp: number;
}
