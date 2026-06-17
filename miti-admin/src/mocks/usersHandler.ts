import { http, HttpResponse } from 'msw'

export const usersHandler = [


    http.get('/admin/reports', () => {
        return HttpResponse.json({
            "status_code": 200,
            "message": "OK",
            "start_index": 1,
            "end_index": 5,
            "current_index": 1,
            "page_content": [
                {
                    "id": 2,
                    "reportee": 148,
                    "game": 28526,
                    "category": "intentional_cheating",
                    "content": "테스트용 신고입니다.",
                    "report_status": "evidence_requested",
                    "created_at": "2024-09-14T18:59:51.355420+09:00"
                },
                {
                    "id": 1,
                    "reportee": 148,
                    "game": 28527,
                    "category": "intentional_cheating",
                    "content": "테스트용 신고입니다.",
                    "report_status": "evidence_requested",
                    "created_at": "2024-09-14T18:58:46.013766+09:00"
                }]
        })
    }),
]