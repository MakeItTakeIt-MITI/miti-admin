import { useEffect } from "react";
import { useUserStore } from "../store/useUserStore";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { useReportsListHook } from "../hook/useReportsListHook";
import search from "../assets/search.svg";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";

const Settlements = () => {
  const { isLoggedIn } = useUserStore();
  const navigate = useNavigate();

  const { data: reportsListData } = useReportsListHook();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [navigate, isLoggedIn]);

  return (
    <section className="flex h-screen bg-[#f8f8f9]">
      <Sidebar />
      <div className="p-10 space-y-6 w-full">
        <h1 className="font-bold text-[18px] bg-white rounded-[12px] p-4">
          정산금 목록
        </h1>
        <div className="flex flex-col gap-2 font-bold text-[18px] bg-white rounded-[12px] p-4">
          <h2>신고 카테고리 검색</h2>
          <div className="flex items-center gap-2">
            <Input
              type="text"
              className="w-[50%]"
              placeholder="아이디 / 카테고리로 검색해서 찾아보세요."
            />
            <Button type="button">찾기</Button>
          </div>
        </div>

        <div className="bg-white rounded-[12px] p-4 min-h-[30rem]">
          {reportsListData?.data && reportsListData.data.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow className="flex items-center justify-start gap-[7rem]">
                  <TableHead className="w-[100px] flex justify-center">
                    아이디
                  </TableHead>
                  <TableHead className="w-[100px]">카테고리</TableHead>
                  <TableHead className="w-[100px]">하위 카테고리</TableHead>
                  <TableHead className="w-[100px] flex justify-center">
                    처리 상태
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reportsListData.data.map(
                  (report: {
                    id: number;
                    category: string;
                    subcategory: string;
                  }) => (
                    <TableRow
                      key={report.id}
                      className="flex items-center justify-start gap-[7rem]"
                    >
                      <TableCell className="w-[100px] flex justify-center">
                        {report.id}
                      </TableCell>
                      <TableCell className="w-[100px] flex justify-center">
                        {report.category}
                      </TableCell>
                      <TableCell className="w-[100px]">
                        {report.subcategory}
                      </TableCell>
                      <div className="flex items-center gap-[2px]">
                        <TableCell className="w-[100px] flex justify-center text-red-500 font-[500]">
                          기각
                        </TableCell>
                        <TableCell className="w-[100px] flex justify-center">
                          <Link to={`${report.id}`} className="hover:underline">
                            <img src={search} alt="search" className="size-4" />
                          </Link>
                        </TableCell>
                      </div>
                    </TableRow>
                  )
                )}
              </TableBody>
            </Table>
          ) : (
            <h1>신고 목록을 찾을 수 없었습니다.</h1>
          )}
        </div>
      </div>
    </section>
  );
};

export default Settlements;
