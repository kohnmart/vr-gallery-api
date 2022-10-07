// get User Information
router.get("/:id", async (req, res) => {
  try {
    //  const responseDb = await getUserInfo(req.params.id);
    res.status(responseDb.status).json(responseDb.result);
  } catch (err) {
    console.log(err.message);
  }
});
