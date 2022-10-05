import pool from "./db.js";


export const getUserInfo = async (user_id) => {
    const result = await pool.query("SELECT * FROM public.user WHERE public.user.user_id = $1", [user_id]);
    return { status: 200, result: result.rows };
  };

  export const getUserGalleries = async (user_id) => {
    const result = await pool.query(
    "SELECT * FROM public.user JOIN public.gallery ON public.gallery.u_id = public.user.user_id WHERE public.user.user_id = $1", [user_id]);
    return { status: 200, result: result.rows };
  }

