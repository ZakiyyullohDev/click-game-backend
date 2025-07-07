drop database if exists click_game;
create database click_game;

\c click_gamer

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

drop table if exists users cascade;
create table users(
    user_id varchar DEFAULT REPLACE(uuid_generate_v4() :: text, '-', '') primary key,
    user_email varchar(64) unique,
    user_username varchar(64) unique,
    user_password varchar(64),
    user_phone_number varchar(12) not null,
    user_img text,
    user_delete boolean default false,
    user_gender boolean not null,
    user_birth_date varchar(10) not null,
    user_createdat TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS players (
    player_id varchar DEFAULT REPLACE(uuid_generate_v4() :: text, '-', '') primary key,
    user_id varchar not null references users(user_id),
    darling_name VARCHAR(100) NOT NULL DEFAULT 'My Darling',
    darling_image_url TEXT,
    bg_image_url TEXT,
    sound_url TEXT,
    click_count INT DEFAULT 0,
    player_created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_players_user_id ON players(user_id);
CREATE INDEX IF NOT EXISTS idx_players_click_count ON players(click_count DESC);