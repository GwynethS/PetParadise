export function validPattern(field, input, pattern) {
  if (!input.value.match(pattern)) {
    field.classList.remove("valid");
    field.classList.add("error");
  } else {
    field.classList.remove("error");
    field.classList.add("valid");
  }
}

export function validForm(fields){
  for (const field of fields) {
    if (!field.classList.contains("valid")) {
      return false;
    }
  }
  return true;
}

export function resetForm(inputs, fields) {
  inputs.forEach(input => {
    input.value = "";
  });

  fields.forEach(field => {
    field.classList.remove("valid");
  });
}