import { getServerSession } from "#auth";
import db from "../db/db";
export default eventHandler(async (event) => {
  const { get_those_who_want_referral } = getQuery(event);
  //   console.log(get_those_who_want_referral, await getServerSession(event));
  //   if (!(await getServerSession(event))?.user?.id) {
  // return createError({
  //   message: "You are not authorized to access this route",
  //   statusCode: 401,
  // });
  //   }
  const users = await db("users")
    .where({
      wants_referral: get_those_who_want_referral,
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
  return users;
});
