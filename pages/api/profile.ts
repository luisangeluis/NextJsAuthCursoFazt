import { verify } from "jsonwebtoken";

const profileHandler = (req, res) => {
  try {
    console.log("req.cookies", req.cookies);
    const { token: myTokenName } = req.cookies;
    if (!myTokenName) return res.status(401).json({ error: "no token" });

    const user = verify(myTokenName, "secret");

    console.log(user);
    return res.json({ email: user.email, username: user.username });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error });
  }
};

export default profileHandler;
