-- ✅ 1. 10 ta test user yaratamiz
INSERT INTO users (user_email, user_username, user_password, user_phone_number, user_img, user_gender, user_birth_date)
VALUES
  ('zakiyyullohm@gmail.com', 'ZakiyDev', 'zakiyyullohm15Zz', '998903083993', 'https://surl.li/lgqkxx', true, '24.04.2010')
-- ✅ 2. Har bir user uchun darling profile qo‘shamiz
-- 🧠 Username asosida user_id olish uchun temp SELECT ishlatamiz

-- Misol: jiggiy uchun profil
INSERT INTO players (user_id, darling_name, darling_image_url, bg_image_url, sound_url, click_count)
VALUES 
 ('bde8390326294779a7f3f4cceac674b5', 'My Darling', 'https://i.pinimg.com/736x/2e/2d/eb/2e2deb567ff58f74bff6c424d38d5060.jpg', 'https://surl.li/kztkdn', 'https://www.myinstants.com/media/sounds/pop-cat-original-meme_3ObdYkj.mp3', 250)

-- Qolganlar uchun
INSERT INTO players (user_id, darling_name, image_url, sound_url, click_count, user_phone_number)
SELECT uuid_generate_v4(), 'Dilshod Queen', 'https://cdn.example.com/dilshod.jpg', 'https://cdn.example.com/dilshod.mp3', '998903083993', 180
FROM users WHERE username = 'dilshod';

INSERT INTO players (user_id, darling_name, image_url, sound_url, click_count, user_phone_number)
SELECT uuid_generate_v4(), 'Madina Girl', 'https://cdn.example.com/madina.jpg', 'https://cdn.example.com/madina.mp3', '998903083993', 320
FROM users WHERE username = 'madina';

INSERT INTO players (user_id, darling_name, image_url, sound_url, click_count, user_phone_number)
SELECT uuid_generate_v4(), 'AsrorLove', 'https://cdn.example.com/asror.jpg', 'https://cdn.example.com/asror.mp3', '998903083993', 50
FROM users WHERE username = 'asror';

INSERT INTO players (user_id, darling_name, image_url, sound_url, click_count, user_phone_number)
SELECT uuid_generate_v4(), 'Gulbahor Princess', 'https://cdn.example.com/gulbahor.jpg', 'https://cdn.example.com/gulbahor.mp3', '998903083993' 470
FROM users WHERE username = 'gulbahor';

INSERT INTO players (user_id, darling_name, image_url, sound_url, click_count, user_phone_number)
SELECT uuid_generate_v4(), 'Lola Baby', 'https://cdn.example.com/lola.jpg', 'https://cdn.example.com/lola.mp3', '998903083993', 510
FROM users WHERE username = 'lola';

INSERT INTO players (user_id, darling_name, image_url, sound_url, click_count, user_phone_number)
SELECT uuid_generate_v4(), 'Javohir Sweetie', 'https://cdn.example.com/javohir.jpg', 'https://cdn.example.com/javohir.mp3', '998903083993', 60
FROM users WHERE username = 'javohir';

INSERT INTO players (user_id, darling_name, image_url, sound_url, click_count, user_phone_number)
SELECT uuid_generate_v4(), 'Mehriniso Janim', 'https://cdn.example.com/mehriniso.jpg', 'https://cdn.example.com/mehriniso.mp3', '998903083993', 220
FROM users WHERE username = 'mehriniso';

INSERT INTO players (user_id, darling_name, image_url, sound_url, click_count, user_phone_number)
SELECT uuid_generate_v4(), 'Doniyor Clicker', 'https://cdn.example.com/doniyor.jpg', 'https://cdn.example.com/doniyor.mp3', '998903083993', 360
FROM users WHERE username = 'doniyor';

INSERT INTO players (user_id, darling_name, image_url, sound_url, click_count, user_phone_number)
SELECT uuid_generate_v4(), 'Malika Queen', 'https://cdn.example.com/malika.jpg', 'https://cdn.example.com/malika.mp3', '998903083993', 420
FROM users WHERE username = 'malika';
