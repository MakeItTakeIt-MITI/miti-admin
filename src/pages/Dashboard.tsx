import { useEffect, useState } from "react";
import { useUsersListHook } from "../hook/useUsersListHook";

const Dashboard = () => {
  const [usersPage, setUsersPage] = useState<number | null>(null);
  const { data: usersData } = useUsersListHook(usersPage);
  const usersEndIndex = usersData?.data.end_index;
  console.log("data", usersEndIndex);

  useEffect(() => {
    setUsersPage(usersEndIndex);
  }, [usersEndIndex]);

  return (
    <section className=" min-h-screen p-16  bg-gray-50 text-black w-full ">
      {/* <h1>MITI Admin Page</h1> */}

      <div className="border border-gray-400 p-4 space-y-2 rounded-md bg-white w-1/2 ">
        <h2 className="font-bold text-lg">새로 가입한 유저</h2>
        <ul>
          {usersData?.data.page_content.map((user) => (
            <li key={user.id} className="flex gap-8">
              <span>{user.id}</span>
              <span>{user.name}</span>
              <span className="truncate w-40">{user.email}</span>
              <span>{user.phone}</span>
              <span>{user.signup_method}</span>
              <span>{user.created_at}</span>
            </li>
          ))}
        </ul>
      </div>

      {/*  */}
      {/* <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table> */}

      {/*  */}
    </section>

    // <section className="min-h-screen bg-[#fff] pt-[6rem] py-[4rem]">
    //   <div className="max-w-[62rem]  mx-auto space-y-4 ">
    //     <h1 className="font-bold text-3xl">바로가기</h1>
    //     <div className="flex gap-4 ">
    //       <div className="bg-[#000] text-white  w-[15rem] h-[6rem] rounded-xl p-3 flex  items-center  justify-center drop-shadow-sm">
    //         <Link to="/users" className="flex flex-col gap-1 items-center">
    //           {" "}
    //           <GroupIcon />
    //           <span>회원</span>
    //         </Link>
    //       </div>
    //       <div className="bg-[#000] text-white w-[15rem] h-[6rem] rounded-xl p-3 flex  items-center  justify-center drop-shadow-sm">
    //         <Link to="/reports" className="flex flex-col gap-1 items-center">
    //           <FlagIcon /> <span> 신고</span>
    //         </Link>
    //       </div>
    //       <div className="bg-[#000] text-white w-[15rem] h-[6rem] rounded-xl p-3 flex  items-center  justify-center drop-shadow-sm">
    //         <Link
    //           to="/settlements"
    //           className="flex flex-col gap-1 items-center"
    //         >
    //           <PaymentIcon /> <span> 정산</span>
    //         </Link>
    //       </div>
    //       <div className="bg-[#000] text-white w-[15rem] h-[6rem] rounded-xl p-3 flex  items-center  justify-center drop-shadow-sm">
    //         <Link to="/games" className="flex flex-col gap-1 items-center">
    //           <SportsBasketballIcon /> <span> 경기</span>
    //         </Link>
    //       </div>
    //     </div>
    //     <div className="flex gap-4 ">
    //       <div className="bg-[#000] text-white w-[15rem] h-[6rem] rounded-xl p-3 flex  items-center justify-center drop-shadow-sm">
    //         <Link to="/support" className="flex flex-col gap-1 items-center">
    //           <SupportAgentIcon /> <span>문의</span>
    //         </Link>
    //       </div>
    //       <div className="bg-[#000] text-white w-[15rem] h-[6rem] rounded-xl p-3 flex  items-center justify-center drop-shadow-sm">
    //         <Link to="/payments" className="flex flex-col gap-1 items-center">
    //           <ReceiptIcon /> <span>결제</span>
    //         </Link>
    //       </div>
    //     </div>
    //   </div>
    // </section>
  );
};

export default Dashboard;
