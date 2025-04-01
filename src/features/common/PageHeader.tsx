export const PageHeader = ({ title }: { title: string }) => {
  return (
    <header className=" pt-[2rem] px-[16rem] w-full   bg-[#fff] ">
      <div className="shadow-md border w-[72rem] min-h-[80px] mx-auto px-4 py-6 bg-[#f5f5f5]  flex flex-col justify-between rounded-md">
        <h1 className="font-bold text-2xl">{title}</h1>
      </div>
    </header>
  );
};
