import jwt from "jsonwebtoken";
import { serialize } from "cookie";

export default function loginHandler(req, res) {
  const { email, password } = req.body;

  if (email === "luis@correo.com" && password === "password") {
    const token = jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
        email: "luis@correo.com",
        username: "luis",
      },
      "secret",
    );

    const serialized = serialize("myTokenName", token, {
      httpOnly: true,
      //con esto, la cookie funciona solo si mi pagina es segura con ssl
      secure: process.env.NODE_ENV === "production",
      //sameSite en estric es para cuando todo está en el mismo servidor la api y el front
      //Podria poner el valor en "none" si mi api está separada.
      sameSite: "strict",
      //Tiempo de expiracion de la cookie
      maxAge: 1000 * 60 * 60 * 24 * 30,
      //ruta donde sera entregada la cookie
      path: "/",
    });

    res.setHeader("Set-Cookie", serialized);

    return res.json("login successfully");
  }

  return res.status(401).json({ error: "Invalid email or password" });
}
