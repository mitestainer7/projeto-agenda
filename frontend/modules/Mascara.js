export default function mascaraInput() {
  const telefone = document.getElementById('telefone');

  if(telefone) {
    telefone.addEventListener('input', () => {
      let limpaValor = telefone.value.replace(/\D/g, "").substring(0,11);
  
      let numerosArray = limpaValor.split("")
      console.log(numerosArray);
  
      let numeroFormatado = '';
  
      if(numerosArray.length > 0) {
        numeroFormatado += `(${numerosArray.slice(0,2).join("")})`;
      }
  
      if(numerosArray.length > 2) {
        numeroFormatado += `${numerosArray.slice(2,7).join("")}`;
      }
  
      if(numerosArray.length > 7) {
        numeroFormatado += `-${numerosArray.slice(7,11).join("")}`;
      }
  
      telefone.value = numeroFormatado;
    })
  };
}