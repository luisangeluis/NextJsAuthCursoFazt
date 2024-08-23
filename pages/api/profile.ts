import { verify } from "jsonwebtoken";

const profileHandler = (req, res) => {
  try {
    const {myTokenName } = req.cookies;
    console.log("token llegó a servidor",myTokenName)
    if (!myTokenName) return res.status(401).json({ error: "no token" });

    const user = verify(myTokenName, "secret");

    return res.json({ email: user.email, username: user.username });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error });
  }
};

export default profileHandler;
