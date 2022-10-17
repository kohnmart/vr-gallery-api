CREATE DATABASE vr - gallery;

DROP TABLE IF EXISTS user CASCADE;

CREATE TABLE user (
    u_id uuid DEFAULT gen_random_uuid(),
    u_name VARCHAR(100) NOT NULL,
    u_cred_id VARCHAR(100),
    CONSTRAINT pk_u PRIMARY KEY(u_id);

);

INSERT INTO
    user (u_id, u_name)
VALUES
    ('68866309-361c-445b-a7d6-0093bbea0c14', 'Martin'),
    ('5700ce15-af9b-44c2-aa84-3583151cdf95', 'Moritz'),
    ('1584b9b1-85bc-4a52-a8e7-83db6ebda8bb', 'Lea'),
    ('eea11661-d312-4dcc-83ef-3d2c25765133', 'Annika');

DROP TABLE IF EXISTS gallery CASCADE;

CREATE TABLE gallery (
    g_id uuid DEFAULT gen_random_uuid(),
    u_id uuid NOT NULL,
    g_name VARCHAR(30) NOT NULL,
    g_date DATE DEFAULT CURRENT_TIMESTAMP,
    g_rating INTEGER DEFAULT 0,
    g_active BOOLEAN NOT NULL DEFAULT true,
    CONSTRAINT pk_g PRIMARY KEY (g_id),
    CONSTRAINT fk_u FOREIGN KEY (u_id) REFERENCES user(u_id) ON DELETE CASCADE,
    CONSTRAINT unique_id UNIQUE (g_id);

);

DROP TABLE IF EXISTS image CASCADE;

CREATE TABLE image (
    i_id uuid NOT NULL DEFAULT gen_random_uuid(),
    g_id uuid NOT NULL,
    i_frame VARCHAR(20) NOT NULL,
    i_thumb uuid NOT NULL,
    i_name VARCHAR(100),
    CONSTRAINT pk_i_g PRIMARY KEY(i_id, g_id),
    CONSTRAINT unique_g_frame UNIQUE(g_id, i_frame),
    CONSTRAINT g_fk FOREIGN KEY (g_id) REFERENCES public.gallery (g_id) ON DELETE CASCADE;

);