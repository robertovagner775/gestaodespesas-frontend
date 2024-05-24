


const input_busca = document.getElementById("busca")
const tabela = document.getElementById("tableDespesa")
const btnFiltro = document.getElementById("btnFiltro")
const modalFiltro = document.getElementById("modalFiltro")
const btnRestaurarTabela = document.getElementById("btnRestaurar")

btnFiltro.onclick = function() {    
    modalFiltro.showModal()
}


const formFiltro = document.getElementById("formFiltro");
const btFiltrar = document.getElementById("btnFiltrarDataCategoria");
  
formFiltro.addEventListener("submit", (e) => {
    e.preventDefault();
    const dataInicialInput = document.getElementById('dataInicial');
    const dataFinalInput = document.getElementById('dataFinal');
    const categoriaInput = document.getElementById('categoriaFiltro');
    var tbody = document.getElementById('tableDespesa');
    var linhas = tbody.getElementsByTagName('tr');
    if(validarFiltro(categoriaInput, dataInicialInput, dataFinalInput)){
        modalFiltro.close();
        let dataInicial = new Date(dataInicialInput.value)
        let dataFinal = new Date(dataFinalInput.value)
        let categoria = categoriaInput.value
        for (var i = 0; i < linhas.length; i++) {
            var dataTd = linhas[i].getElementsByTagName('td')[3];
            var categoriaTd = linhas[i].getElementsByTagName('td')[2];
            var data = new Date(dataTd.textContent || dataTd.innerText);
            var linhaCategoria = categoriaTd.textContent || categoriaTd.innerText;

            console.log(data);

            var dataComparacao = (isNaN(dataInicial.getTime()) || data >= dataInicial) && (isNaN(dataFinal.getTime()) || data <= dataFinal);
            var categoriaComparacao = categoria === '' || linhaCategoria === categoria;

            if (categoriaComparacao && dataComparacao) {
                linhas[i].style.display = '';
            } else {
                linhas[i].style.display = 'none';
            }
        }
    }
})


function validarFiltro(categoria, dataInicial, dataFinal) {
    let i = 0;
    i += validDataInicialFinal(dataInicial, dataFinal);
    i += validCategoria(categoria)

    return i === 2;
}

function validDataInicialFinal(dataInicial, dataFinal) {
    if(dataFinal.value == "" || dataInicial.value == "") {
        setError(dataFinal, "preencha esse campo")
        setError(dataInicial, "preencha esse campo")
        return 0
    } 
    if (new Date(dataFinal.value) < new Date(dataInicial.value)) {
        setError(dataFinal, "data final maior que a inicia. !!!")
        setError(dataInicial, "data inicial maior que a final. !!!")
        return 0
    } 
    return 1
    
}

btnRestaurarTabela.onclick = function() { 
    const linhas = document.querySelectorAll('#tableDespesa tr');

    linhas.forEach(function(linha) {
        linha.style.display = ''; 
    });

    
}



input_busca.addEventListener("keyup", () => {
    let valorDigitado = input_busca.value.toLowerCase()

    let linhas = tabela.getElementsByTagName("tr")
    for (let posicao in linhas) {
        if(true == isNaN(posicao)) {
            continue;
        }
        let conteudoDaLinha = linhas[posicao].innerHTML.toLowerCase();

        if(true === conteudoDaLinha.includes(valorDigitado)) {
            linhas[posicao].style.display = '';
        } else {
            linhas[posicao].style.display = 'none';
        }
    }
    
})



const buttonOpenDefinir = document.getElementById("btnOpenDefinir");
const modalDefinir = document.getElementById("modalDefinir");
const buttonCloseDefinir = document.getElementById("mdCloseDefinir")


buttonOpenDefinir.onclick = function() {
    modalDefinir.showModal();
}
buttonCloseDefinir.onclick = function() {
    modalDefinir.close();
}


const buttonOpenAtualizar = document.getElementById("btnOpenAtualizar");
const modalAtualizar = document.getElementById("modalAtualizar");
const buttonCloseAtualizar = document.getElementById("mdCloseAtualizar");

buttonOpenAtualizar.onclick = function() {
    console.log("test")
    modalAtualizar.showModal();
}
buttonCloseAtualizar.onclick = function() {
    modalAtualizar.close();
}

const limpar = document.getElementById("btnLimpar");

limpar.onclick = function() {
    document.getElementById("categoria").value = ""
    document.getElementById("data").value = ""
    document.getElementById("valor").value = ""
    document.getElementById("descricao"). value = ""
}

const formAtualizarModal = document.getElementById("formAtualizarModal")

formAtualizarModal.addEventListener("submit", (e) => {

    const valor = document.getElementById("valorSaldo");
    e.preventDefault() 


    if(validValor(valor) == 1) {
    modalAtualizar.close()

    const url = "https://gestaodespesas-api-production.up.railway.app/saldo"     
              
    
            fetch(url, {
                method: 'PUT',
                mode: 'cors',        
                headers: {         
                    'Accept' : 'application/json',
                'Content-Type' : 'application/json'            
                },
                body: JSON.stringify({
                        id: null,
                        valor: valor.value
                        
                    }),
                
            }).then(response => response.json())
            .then(data => {
                if(data.error) {
                    console.log("error");
                    Swal.fire({
                        title: "",
                        text: data.error,
                        icon: "warning",
                        showCancelButton: true
                      });
                } else {
                    console.log("correct");
                    Swal.fire({
                        title: "",
                        text: data.mensagem,
                        icon: "success",
                        showCancelButton: true
                      });
                }
            }).catch(data => {
            
            })            
  
        }
})




const formDefinirModal = document.getElementById("formDefinirModal")

formDefinirModal.addEventListener("submit", (e) => {

    const valor = document.getElementById("saldoDefinir");
    e.preventDefault() 

    if(validValor(valor) == 1) {
    modalDefinir.close()

    const url = "https://gestaodespesas-api-production.up.railway.app/saldo"     
              
    
            fetch(url, {
                method: 'POST',
                mode: 'cors',        
                headers: {         
                    'Accept' : 'application/json',
                'Content-Type' : 'application/json'            
                },
                body: JSON.stringify({
                        id: null,
                        valor: valor.value
                        
                    }),
                
            }).then(response => response.json())
            .then(data => {
                if(data.error) {
                    console.log("error");
                    Swal.fire({
                        title: "Erro ao Atualizar Saldo",
                        text: data.error,
                        icon: "warning",
                        showCancelButton: true
                      });
                } else {
                    console.log("correct");
                    Swal.fire({
                        title: "Saldo Atualizado",
                        text: data.mensagem,
                        icon: "success",
                        showCancelButton: true
                      });
                }
            }).catch(data => {
            
            })            
  
        }

 
    
})
