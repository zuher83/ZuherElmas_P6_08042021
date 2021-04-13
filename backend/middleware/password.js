const passSchema = require("../models/password");

// logique du modele utiliser pour valider le mot de passe
module.exports = (req, res, next) => {
  if (!passSchema.validate(req.body.password)) {
    return res.status(400).json({
      error:
        "Le mot de passe doit comporter une minuscule et une majuscule, 8 caractères au min et 2 chiffres min" +
        passSchema.validate("Changez votre mot de passe", { list: true }),
    });
  } else {
    next();
  }
};
