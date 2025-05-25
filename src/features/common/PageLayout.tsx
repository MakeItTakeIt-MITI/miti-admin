export const PageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className=" min-h-screen w-full p-6   ">
      <div className="w-[1400px] py-4 min-h-[900px] mx-auto   flex flex-col justify-between rounded-md overflow-y-auto ">
        {children}
      </div>
    </section>
  );
};
