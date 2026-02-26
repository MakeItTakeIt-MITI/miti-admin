import useAuthPage from "../features/auth/hooks/useAuthPage";

const Auth = () => {
  const { register, handleSubmit, onSubmit, isValid, isPending, isLoggedIn, loginError } =
    useAuthPage();

  if (isLoggedIn) {
    return null;
  }

  return (
    <section className="min-h-screen w-full flex items-center justify-center bg-gray-950">
      <div className="w-full max-w-md px-8 flex flex-col gap-10">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-white">MITI Admin</h1>
          <p className="text-sm text-gray-400">관리자 로그인</p>
        </div>

        {/* Login Form */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 shadow-2xl">
          <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
            {/* Email Input */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-300">이메일</label>
              <input
                {...register("email", { required: true })}
                placeholder="example@makeittakeit.kr"
                type="email"
                autoComplete="email"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-300">비밀번호</label>
              <input
                {...register("password", { required: true })}
                placeholder="••••••••"
                type="password"
                autoComplete="current-password"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            {loginError && (
              <p className="rounded-lg border border-rose-500/40 bg-rose-500/10 px-3 py-2 text-xs text-rose-300">
                {loginError}
              </p>
            )}

            {/* Submit Button */}
            <button
              disabled={!isValid || isPending}
              type="submit"
              className="w-full h-11 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:text-gray-500 disabled:cursor-not-allowed text-white rounded-lg text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 flex items-center justify-center gap-2"
            >
              {isPending ? (
                <>
                  <div className="h-4 w-4 rounded-full border-2 border-t-transparent border-white animate-spin" />
                  로그인 중...
                </>
              ) : (
                "로그인"
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Auth;
