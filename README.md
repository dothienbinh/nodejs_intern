# Getting Started

```elm
npm i
npx sequelize-cli db:migrate
npm start
```

## Role

```
/*
Role :
    0: user - employee (update info)
    1: Manager (read for all staff)
    2: HR , Drirector (create form for all user)
    3: Admin (create user, create)

*/
```

Admin

- Tạo user, nâng quyền user, tạo ra tất cả các form
- Được phép xóa cứng user và khôi phục user
- Có thể thay đổi các field của user ngoại trừ UserName, Password, Avatar
- Có thể lấy tất cả user ( không có field UserName Password)
- Có tất cả các quyền

HR , Drirector

- Được phép xem và tạo tất cả các form
- Chỉ được phép xóa mềm user
- Không được phép tạo user
- Chỉ lấy được danh sach user tồn tại

Manager

- Chỉ được xem và tạo các form của user mà Manager là quản lý

User

- tất cả đều là Employee được phép tự tạo và xem form cho chính mình
- User nào chỉ có thể cập nhật avatar, UserName và Passowrd của chính nó

## Desc
![ImgDb](https://user-images.githubusercontent.com/84229533/189962129-a57018bf-8910-408c-85bc-96d8f28eea8b.png)

## database

![ImgDb](https://user-images.githubusercontent.com/84229533/183840686-e17ac9eb-d129-414b-a578-5076fa25f752.png)

## ApiDocs
![image](https://user-images.githubusercontent.com/84229533/189963187-deea241e-605b-4aff-875d-b0f5eebdf0e9.png)

