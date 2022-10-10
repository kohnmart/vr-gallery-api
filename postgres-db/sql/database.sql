CREATE DATABASE vr-gallery;

DROP TABLE IF EXISTS user CASCADE;
CREATE TABLE user (
    u_id    uuid DEFAULT gen_random_uuid(),
    u_name  VARCHAR(30) NOT NULL,

    CONSTRAINT pk_u
        PRIMARY KEY(u_id);
);


INSERT INTO user (u_id, u_name) 
VALUES  ('68866309-361c-445b-a7d6-0093bbea0c14', 'Martin'), 
        ('5700ce15-af9b-44c2-aa84-3583151cdf95','Moritz'), 
        ('1584b9b1-85bc-4a52-a8e7-83db6ebda8bb', 'Lea'), 
        ('eea11661-d312-4dcc-83ef-3d2c25765133', 'Annika');


DROP TABLE IF EXISTS gallery CASCADE;
CREATE TABLE gallery (
    g_id        uuid DEFAULT gen_random_uuid(),
    u_id        uuid NOT NULL,
    g_name      VARCHAR(30) NOT NULL,
    g_date      DATE        DEFAULT CURRENT_TIMESTAMP,
    g_rating    INTEGER     DEFAULT 0,
    g_active    BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT pk_g
        PRIMARY KEY (g_id),
    
    CONSTRAINT fk_u
        FOREIGN KEY (u_id) REFERENCES user(u_id)
        ON DELETE CASCADE,

    CONSTRAINT unique_id
        UNIQUE (g_id);

);

INSERT INTO gallery(
	u_id, g_name, g_active)
	VALUES  ('68866309-361c-445b-a7d6-0093bbea0c14', 'Stadtfotografie', true);
            ('68866309-361c-445b-a7d6-0093bbea0c14', 'Sardinien', true),
            ('5700ce15-af9b-44c2-aa84-3583151cdf95', 'Weltreise', false),
            ('1584b9b1-85bc-4a52-a8e7-83db6ebda8bb', 'Frankreich Roadtrip', true);



DROP TABLE IF EXISTS image CASCADE;
CREATE TABLE image (
    i_id    uuid DEFAULT gen_random_uuid(),
    g_id    uuid NOT NULL,
    i_name  VARCHAR(30) NOT NULL,

    CONSTRAINT pk_i
        PRIMARY KEY (m_id),

    CONSTRAINT fk_g 
        FOREIGN KEY (g_id) REFERENCES gallery(g_id)
        ON DELETE CASCADE;
);

INSERT INTO image (g_id, i_name)
VALUES  ('19e7a1d1-10d5-40a5-b529-2bb74846736c', 'strand.jpg'),
        ('19e7a1d1-10d5-40a5-b529-2bb74846736c', 'meer.jpg'),
        ('19e7a1d1-10d5-40a5-b529-2bb74846736c', 'hotel.jpg'),
        ('fc33da70-835c-4964-8ac1-57a0c8b58864', 'augsburg.jpg'),
        ('fc33da70-835c-4964-8ac1-57a0c8b58864', 'muenchen.jpg'),
        ('fc33da70-835c-4964-8ac1-57a0c8b58864', 'berlin.jpg'),
        ('33e50201-58d6-4ba5-a18e-0aeda67762cf', 'australien.jpg'),
        ('33e50201-58d6-4ba5-a18e-0aeda67762cf', 'neuseeland.jpg'),
        ('a7c0f3f4-a2bd-45f5-a79e-1ae6cebed670', 'montpellier.jpg'),
        ('a7c0f3f4-a2bd-45f5-a79e-1ae6cebed670', 'paris.jpg'),
        ('a7c0f3f4-a2bd-45f5-a79e-1ae6cebed670', 'chamonix.jpg'),
        ('a7c0f3f4-a2bd-45f5-a79e-1ae6cebed670', 'lille.jpg');


