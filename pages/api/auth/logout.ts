import { verify } from "jsonwebtoken";
import { serialize } from "cookie";

export default function logoutHandler(req,res){
  const {myTokenName} = req.cookies;

  if(!myTokenName)
    return res.status(401).json({error:"no token"})

  try{
    verify(myTokenName,"secret");

    const serialized = serialize("myTokenName", null, {
      httpOnly: true,
      //con esto, la cookie funciona solo si mi pagina es segura con ssl
      secure: process.env.NODE_ENV === "production",
      //sameSite en estric es para cuando todo está en el mismo servidor la api y el front
      //Podria poner el valor en "none" si mi api está separada.
      sameSite: "strict",
      //Tiempo de expiracion de la cookie
      maxAge: 0,
      //ruta donde sera entregada la cookie
      path: "/",
    });

    res.setHeader("Set-Cookie", serialized);

    return res.json("logout successfully");
  }catch(error){
    return res.status(401).json({ error: "invalid token" });
  }

  
}