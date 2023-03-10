async function buscaEndereco (CEP) {
    const mensagemErro = document.querySelector('#erro');
    mensagemErro.innerHTML = '';
    try{
    let consultaCEP = await fetch(`https://viacep.com.br/ws/${CEP}/json/`);
    let consultaCEPConvertida = await consultaCEP.json();
    if(consultaCEPConvertida.erro)
        throw Error('CEP não existe');
    
    const cidade = document.querySelector('#cidade');
    const logradouro = document.querySelector('#endereco');
    const estado = document.querySelector('#estado');

    cidade.value = consultaCEPConvertida.localidade;
    logradouro.value = consultaCEPConvertida.logradouro;
    estado.value = consultaCEPConvertida.uf;

    console.log(consultaCEPConvertida);
    return consultaCEPConvertida;
    } catch (erro) {
        mensagemErro.innerHTML = `<p> CEP invalido. Tente novamente</p>`
        console.log(erro);
    }
}

const cep = document.querySelector('#cep');
cep.addEventListener('focusout', ()=> buscaEndereco(cep.value));