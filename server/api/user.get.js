import db from "../db/db";
export default eventHandler(async (event) => {
  const { id } = getQuery(event);
  const data = await db("users")
    .where({
      id,
    })
    .leftJoin("work_experience", "users.id", "work_experience.user_id")
    .leftJoin("education", "users.id", "education.user_id")
    .select(
      "users.id",
      "users.first_name",
      "users.last_name",
      "users.job",
      "users.location",
      "users.has_full_information",
      "users.avatar_url",
      "users.email",
      "users.wants_referral",
      db.raw("ARRAY_AGG(work_experience.company_name) AS companies"),
      db.raw("ARRAY_AGG(education.school_name) AS education")
    )
    .groupBy("users.id");
  // console.log(data[0]);
  return {
    data: data[0],
  };
});
