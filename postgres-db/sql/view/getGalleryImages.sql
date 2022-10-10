
/* getGalleryImagesView */
    /* Create */
SELECT
    i_id,
    i_name,
    gallery.g_id,
    gallery.g_name
FROM
    image
    JOIN gallery ON image.g_id = gallery.g_id
    /* Query with example u_id */
SELECT
    g_name,
    g_date,
    g_rating,
    g_active,
    g_path
FROM
    "getUserGalleries"
WHERE
    u_id = '68866309-361c-445b-a7d6-0093bbea0c14';

/**********************/