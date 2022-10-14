/* getUserGalleryView */

    /* Create */
    SELECT
        gallery.u_id,
        gallery.g_name,
        gallery.g_date,
        gallery.g_rating,
        gallery.g_active
    FROM
        gallery
        JOIN "user" ON "user".u_id = gallery.u_id
    WHERE
        "user".u_id = gallery.u_id;

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