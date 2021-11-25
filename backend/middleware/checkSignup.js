// tests (à retirer)
console.log(` --------> checksignUp`);
// pour checker la solidité du mot de passe
// (et checker l'entrée mail)

module.exports = (req, res, next) => {
  const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  if (regexEmail.test(req.body.email)){
    if (regexPassword.test(req.body.password)){
      next();//ok si password&email ok
    }
    else{//si password pas ok
      res.status(400).json({message : "mot de passe insuffisant (au moins 8 caracteres, dont un chiffre/minuscule/majuscule/caracSpeciaux"});
    }
  }
  else{//si email pas ok
    res.status(400).json({message : "pas un email valide"});
  }
}