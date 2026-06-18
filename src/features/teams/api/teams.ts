import axiosUrl from "../../../utils/axios";

export const getTeamsList = async (
  cursor: string | null,
  pageSize: number,
  searchKey: string | null,
  status: string[],
) => {
  try {
    const response = await axiosUrl.get("/admin/teams", {
      params: {
        cursor: cursor ?? undefined,
        page_size: pageSize,
        search_key: searchKey || undefined,
        status: status.length > 0 ? status : undefined,
      },
      paramsSerializer: (params) => {
        const searchParams = new URLSearchParams();
        Object.entries(params).forEach(([key, value]) => {
          if (value == null) return;
          if (Array.isArray(value)) {
            value.forEach((v) => searchParams.append(key, String(v)));
          } else {
            searchParams.set(key, String(value));
          }
        });
        return searchParams.toString();
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch teams list");
  }
};

export const getTeamDetail = async (teamId: number) => {
  try {
    const response = await axiosUrl.get(`/admin/teams/${teamId}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch team details");
  }
};

