import axiosUrl from "../../../utils/axios";

export const getCourtsList = async (
  cursor: null | string,
  limit: number,
  search: string | null,
  province: string | null,
) => {
  try {
    const response = await axiosUrl.get("/admin/courts", {
      params: {
        cursor,
        limit,
        search,
        province: province ?? undefined,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch courts list");
  }
};

interface CourtCreatePayload {
  address: string;
  address_detail?: string | null;
  name?: string | null;
  info?: string | null;
  images?: string[];
}

export const createCourt = async (data: CourtCreatePayload) => {
  const response = await axiosUrl.post("/admin/courts", data);
  return response.data;
};
export const getCourtsDetails = async (courtId: null | number) => {
  try {
    const response = await axiosUrl.get(`/admin/courts/${courtId}`);
    return response.data;
  } catch (error) {
    console.log(error);

    throw new Error("Failed to fetch court details");
  }
};

interface CourtPatchPayload {
  name?: string;
  address?: string;
  address_detail?: string | null;
  info?: string | null;
  images?: string[];
}

export const patchCourtsDetails = async (courtId: number, data: CourtPatchPayload) => {
  const response = await axiosUrl.patch(`/admin/courts/${courtId}`, data);
  return response.data;
};

//파일 업로드 url 조회 API
export const getFileUploadUrl = async (imageType: string) => {
  try {
    const response = await axiosUrl.get(`/file-upload-url?category=court_image&${imageType}=1`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
