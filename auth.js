function entrar(){
  const d = document.getElementById("dia").value;
  const m = document.getElementById("mes").value;
  const a = document.getElementById("ano").value;

  if(!d || !m || !a){
    alert("Preencha sua data");
    return;
  }

  const nascimento = new Date(`${a}-${m}-${d}`);
  const hoje = new Date();

  let idade = hoje.getFullYear() - nascimento.getFullYear();
  const mes = hoje.getMonth() - nascimento.getMonth();

  if(mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())){
    idade--;
  }

  if(idade >= 18){
    document.getElementById("gate").style.display = "none";
    document.getElementById("container").classList.remove("hidden");
  } else {
    alert("Você precisa ter 18 anos");
  }
}
