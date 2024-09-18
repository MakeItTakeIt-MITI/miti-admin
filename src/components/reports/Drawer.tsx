import { ReportDetailField } from "../../interface/reports";

const Drawer = ({
  setOpenDrawer,
  reportDetailsData,
}: {
  setOpenDrawer: (arg: boolean) => void;
  reportDetailsData: {
    status_code: number;
    message: string;
    data: ReportDetailField;
  };
}) => {
  return (
    <aside
      onClick={() => setOpenDrawer(false)}
      className="z-[999] fixed right-0 top-0 bottom-0 left-0 h-full w-full bg-gray-800 bg-opacity-70"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          transition: "transform 0.3s ease-in-out",
          transform: "translateX(100%)",
        }}
        className="absolute top-0 right-0 bottom-0 bg-white w-[40rem] drawer-closing"
      >
        Drawer
        {reportDetailsData?.data.id}
      </div>
    </aside>
  );
};

export default Drawer;
