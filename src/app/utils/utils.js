export const validateEmail = email => {
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return emailRegex.test(String(email).toLowerCase())
}

export const validateCedula = cedula => {
  const cedulaRegex = /^\d{7,8}$/
  return cedulaRegex.test(cedula)
}

export const validateString = string => {
  const regExp = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/
  return regExp.test(string)
}
