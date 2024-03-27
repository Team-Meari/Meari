INSERT INTO Member(memberId, email, memberStatus, nickname, phone, password, createdAt, lastModifiedAt) VALUES
(1, 'meari@naver.com', 0, 'meari', '01011111111', '{bcrypt}$2a$10$9jJnmFjexL3nhKs20NtzDeLc.O1qZki5JLRSWHd8eNlIZebtGD4tC','2024-03-14T19:52:58.9517531', '2024-03-14T19:55:58.9517531'),
(2, 'meari2@naver.com', 0, 'meari2', '01022222222', '{bcrypt}$2a$10$9jJnmFjexL3nhKs20NtzDeLc.O1qZki5JLRSWHd8eNlIZebtGD4tC','2024-03-14T19:52:58.9517531', '2024-03-14T19:55:58.9517531');

INSERT INTO Member_roles(member_memberId, roles) VALUES
(1, 'USER'),
(2, 'USER');

INSERT INTO Chat(chatId, content, latitude, longitude, memberId, createdAt, lastModifiedAt) VALUES
(1, '안녕하세요. memberId가 1인 회원이 쓴 첫번째 게시물입니다.', 35.201494, 129.131622, 1, '2024-03-14T19:52:58.9517531', '2024-03-14T19:55:58.9517531'),
(2, '안녕하세요. memberId가 2인 회원이 쓴 첫번째 게시물입니다.', 35.201494, 129.121622, 2, '2024-03-14T19:53:58.9517531', '2024-03-14T19:55:58.9517531'),
(3, '안녕하세요. memberId가 1인 회원이 쓴 두번째 게시물입니다.', 35.201494, 129.131622, 1, '2024-03-15T19:52:58.9517531', '2024-03-15T19:55:58.9517531'),
(4, '안녕하세요. memberId가 2인 회원이 쓴 두번째 게시물입니다.', 35.201494, 129.121622, 2, '2024-03-15T19:53:58.9517531', '2024-03-15T19:55:58.9517531'),
(5, '안녕하세요. memberId가 1인 회원이 쓴 세번째 게시물입니다.', 35.201494, 129.131622, 1, '2024-03-16T19:52:58.9517531', '2024-03-16T19:55:58.9517531'),
(6, '안녕하세요. memberId가 2인 회원이 쓴 세번째 게시물입니다.', 35.201494, 129.121622, 2, '2024-03-16T19:53:58.9517531', '2024-03-16T19:55:58.9517531');