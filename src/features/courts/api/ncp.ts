import axios from "axios";

export const uploadNcpFile = async (uploadUrl: string, file: string | null, contentType: string) => {
    try {
        await axios.put(uploadUrl, file, {
            headers: {
                'Content-Type': contentType,
            },
        });
    } catch (error) {
        console.log(error);
        throw new Error('NCP 업로드 실패');
    }
};