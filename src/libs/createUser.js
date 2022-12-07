import User from "../models/User.js";

export const createAdminUser = async () => {
  const userFound = await User.findOne({ email: "diplomadocomision@unilibre.edu.co", name:"Admin", lastname:"unilibre" });

  if (userFound) return;

  const newUser = new User({
    username: "admin",
    email: "diplomadocomision@unilibre.edu.co",
    name:"Admin", 
    lastname:"unilibre",
    estado: "Admin", 
    tarjeta: "00000",
    uegresados: "Ulibre",
    semestre: "0",
    uniEstu: "",
    pais: "COLOMBIA",
    ciudad: "BOGOTA"
  });

  newUser.password = await newUser.encryptPassword("Unilibre2022");
  const admin = await newUser.save();

  console.log("Admin user created", admin);
};
