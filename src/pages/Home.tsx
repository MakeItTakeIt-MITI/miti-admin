import { Link } from "react-router-dom";

export default function Home() {
  const quickLinks = [
    {
      title: "회원 관리",
      description: "회원 목록 및 상세 정보 조회",
      href: "/users",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      ),
      color: "bg-blue-600/10 border-blue-600/20 hover:bg-blue-600/20 text-blue-400",
    },
    {
      title: "경기 관리",
      description: "경기 목록 및 참가자 관리",
      href: "/games",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
          />
        </svg>
      ),
      color: "bg-green-600/10 border-green-600/20 hover:bg-green-600/20 text-green-400",
    },
    {
      title: "코트 관리",
      description: "코트 등록 및 수정",
      href: "/courts",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
          />
        </svg>
      ),
      color: "bg-purple-600/10 border-purple-600/20 hover:bg-purple-600/20 text-purple-400",
    },
    {
      title: "문의 관리",
      description: "사용자 문의 및 답변",
      href: "/inquiry",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
      ),
      color: "bg-amber-600/10 border-amber-600/20 hover:bg-amber-600/20 text-amber-400",
    },
    {
      title: "익명 문의",
      description: "익명 문의 관리",
      href: "/anonymous-inquiry",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      color: "bg-orange-600/10 border-orange-600/20 hover:bg-orange-600/20 text-orange-400",
    },
    {
      title: "신고 관리",
      description: "신고 내역 및 처리",
      href: "/reports",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      ),
      color: "bg-rose-600/10 border-rose-600/20 hover:bg-rose-600/20 text-rose-400",
    },
    {
      title: "정산 관리",
      description: "정산 요청 및 처리",
      href: "/settlements",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      color: "bg-emerald-600/10 border-emerald-600/20 hover:bg-emerald-600/20 text-emerald-400",
    },
    // {
    //   title: "결제 내역",
    //   description: "경기 결제 내역 조회",
    //   href: "/payments",
    //   icon: (
    //     <svg
    //       className="w-8 h-8"
    //       fill="none"
    //       stroke="currentColor"
    //       viewBox="0 0 24 24"
    //     >
    //       <path
    //         strokeLinecap="round"
    //         strokeLinejoin="round"
    //         strokeWidth={2}
    //         d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
    //       />
    //     </svg>
    //   ),
    //   color:
    //     "bg-cyan-600/10 border-cyan-600/20 hover:bg-cyan-600/20 text-cyan-400",
    // },
  ];

  return (
    <section className="w-full min-h-screen p-8 bg-gray-950">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-white">MITI Admin</h1>
          <p className="text-sm text-gray-400">관리자 페이지에 오신 것을 환영합니다</p>
        </div>

        {/* Quick Access Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {quickLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`group block border rounded-lg p-6 transition-all ${link.color}`}
            >
              <div className="flex flex-col gap-4">
                <div className="group-hover:scale-110 transition-transform">{link.icon}</div>
                <div className="space-y-1">
                  <h3 className="text-lg font-semibold text-white group-hover:text-gray-100">
                    {link.title}
                  </h3>
                  <p className="text-xs text-gray-400">{link.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Info Card */}
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
          <div className="flex items-start gap-4">
            <svg
              className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div className="space-y-1">
              <h3 className="text-sm font-semibold text-white">시작하기</h3>
              <p className="text-xs text-gray-400">
                위의 메뉴에서 원하는 관리 페이지를 선택하세요. 각 페이지에서 필요한 작업을 수행할 수
                있습니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
