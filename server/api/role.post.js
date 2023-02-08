import { getServerSession } from "#auth";
import db from "../db/db";

export default eventHandler(async (event) => {
  const { user } = await getServerSession(event);
  const body = await readBody(event);
  const { wants_referral } = body;
  await db("users").where({ id: user.id }).update({ wants_referral });
  return {
    message: "success",
  };
});
