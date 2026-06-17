import { http, HttpResponse } from 'msw'

export const handlers = [
    http.get('/admin/users', () => {
        return HttpResponse.json({
            "status_code": 200,
            "message": "OK",
            "page_content": [
                {
                    "id": 2,
                    "signup_method": "email",
                    "email": "testuser1@makeittakeit.com",
                    "name": "박미티",
                    "nickname": "testtest",
                    "birthdate": "1996-05-19",
                    "contact": '010-2584-0519',
                    "suspended_until": null
                },

                {
                    "id": 2,
                    "signup_method": "email",
                    "email": "testuser1@makeittakeit.com",
                    "name": "박미티",
                    "nickname": "testtest",
                    "birthdate": "1996-05-19",
                    "contact": '010-2584-0519',
                    "suspended_until": null
                },
                {
                    "id": 2,
                    "signup_method": "email",
                    "email": "testuser1@makeittakeit.com",
                    "name": "박미티",
                    "nickname": "testtest",
                    "birthdate": "1996-05-19",
                    "contact": '010-2584-0519',
                    "suspended_until": null
                },
                {
                    "id": 2,
                    "signup_method": "email",
                    "email": "testuser1@makeittakeit.com",
                    "name": "박미티",
                    "nickname": "testtest",
                    "birthdate": "1996-05-19",
                    "contact": '010-2584-0519',
                    "suspended_until": null
                },
            ]
        })
    }),


]