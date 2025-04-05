export const PageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="pt-[2rem] px-[2rem] w-full min-h-screen  bg-[#fff] ">
      <div className="shadow-md w-full min-h-[900px] mx-auto px-4 py-6 bg-[#f5f5f5]  flex flex-col justify-between rounded-md overflow-y-auto ">
        {children}
      </div>
    </section>
  );
};
