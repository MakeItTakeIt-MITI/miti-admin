import axios from "axios";

export const uploadNcpFile = async (uploadUrl: string, file: File, contentType: string) => {
    try {
        const res = await axios.put(uploadUrl, file, {
            headers: {
                'Content-Type': contentType,
            },
        });
        console.log(res);
        return res;
    } catch (error) {
        console.log(error);
        throw new Error('NCP 업로드 실패');
    }
};