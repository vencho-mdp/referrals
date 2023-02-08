import db from "../db/db";
import scrapeLinkedin from "../utils/scrape-linkedin";
import getPercentageOfSimilarityBetweenStrings from "../utils/getPercentageOfSimilarityBetweenStrings";
import { getServerSession } from "#auth";

export default eventHandler(async (event) => {
  const [
    { profileUrl },
    {
      user: { id, name },
    },
  ] = await Promise.all([readBody(event), getServerSession(event)]);

  const {
    profile_name,
    profile_pic,
    experience,
    education,
    about,
    designation,
    location,
  } = await scrapeLinkedin(profileUrl);
  if (getPercentageOfSimilarityBetweenStrings(profile_name, name) < 0.7) {
    if (profile_name.trim() == "Join LinkedIn") {
      console.log("Alert: Need to change account used to log in");
    }
    return createError({
      message: "Profile name does not match with your name",
      statusCode: 400,
    });
  }

  await db.transaction(async (trx) => {
    await trx("users").where({ id }).update({
      job: designation,
      location,
      has_full_information: true,
    });

    if (experience.length > 0)
      await trx("work_experience").insert(
        experience.map((exp) => ({
          user_id: id,
          company_name: exp,
        }))
      );

    if (education.length > 0)
      await trx("education").insert(
        education.map((edu) => ({
          user_id: id,
          school_name: edu,
        }))
      );
  });
  return {
    message: "Profile validated",
  };
});
