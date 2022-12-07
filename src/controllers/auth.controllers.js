import User from "../models/User.js";
import passport from "passport";

export const renderSignUpForm = (req, res) => res.render("auth/signup");

export const signup = async (req, res) => {
  let errors = [];
  const { 
    name, 
    lastname, 
    email, 
    tipodocumento, 
    password, 
    estado, 
    tarjeta, 
    uegresados, 
    uniegre, 
    semestre, 
    uniEstu, 
    uniestu,
    pais, 
    ciudad, 
    confirm_password } = req.body;
  if (password !== confirm_password) {
    errors.push({ text: "Números de documento no coinciden." });
  }

  if (password.length < 6) {
    errors.push({ text: "Escriba un número de documento de identidad valido." });
  }

  if (errors.length > 0) {
    return res.render("auth/signup", {
      errors,
      name, 
      lastname, 
      email,
      tipodocumento, 
      password,
      confirm_password, 
      estado, 
      tarjeta, 
      uegresados, 
      uniegre,
      semestre, 
      uniEstu, 
      uniestu,
      pais, 
      ciudad
    });
  }


  
  // Look for email coincidence
  const userFound = await User.findOne({ email: email });
  if (userFound) {
    req.flash("error_msg", "El correo ya esta registrado.");
    return res.redirect("/auth/signup");
  }

  //look for num id coincidence
  const userFound2 = await User.findOne({ password: password });
  if (userFound2) {
    req.flash("error_msg", "El número de documento ya esta registrado.");
    return res.redirect("/auth/signup");
  }

  // Saving a New User
  const newUser = new User({ 
    name, 
    lastname, 
    email, 
    tipodocumento, 
    password, 
    estado, 
    tarjeta, 
    uegresados, 
    uniegre, 
    semestre, 
    uniEstu,
    uniestu,
    pais, 
    ciudad });
  newUser.password = await (password);
  await newUser.save();
  req.flash("success_msg", "Registro existoso!.");
  res.redirect("/auth/signin");
};

export const renderSigninForm = (req, res) => res.render("auth/signin");

export const signin = passport.authenticate("local", {
  successRedirect: "/notes",
  failureRedirect: "/auth/signin",
  failureFlash: true,
});

export const logout = async (req, res, next) => {
  await req.logout((err) => {
    if (err) return next(err);
    req.flash("success_msg", "You are logged out now.");
    res.redirect("/auth/signin");
  });
};
