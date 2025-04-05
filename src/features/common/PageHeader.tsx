export const PageHeader = ({ title }: { title: string }) => {
  return (
    <header className=" pt-[2rem] px-[2rem] w-full   ">
      <div className="shadow-md border-b full min-h-[80px] mx-auto px-4 py-6 bg-[#fff]  flex flex-col justify-between rounded-md">
        <h1 className="font-bold text-2xl">{title}</h1>
      </div>
    </header>
  );
};
