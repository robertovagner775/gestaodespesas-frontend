let alimentacaoTotal = 0;
let moradiaTotal = 0;
let lazerTotal = 0;
let transporteTotal = 0;
let saudeTotal = 0;



const recebeSaldo = async () => {
    const response = await fetch("https://gestaodespesas-api-production.up.railway.app/saldo");
    const valor = await response.text();

    document.getElementById("saudoDisponivel").innerHTML = "R$" + valor
}

const listTableDespesa = async () => {
    try {
           const response = await fetch("https://gestaodespesas-api-production.up.railway.app/despesa")
           const data = await response.json()
        
        
            const list = document.getElementById("tableDespesa")   
            data.map((item) => {
                const tr = document.createElement('tr')
                const td4 = document.createElement('td')
                const td1 = document.createElement('td')
                const td2 = document.createElement('td')
                const td3 = document.createElement('td')
                const td5 = document.createElement('td')
                const img1 = document.createElement('img')
                const img2 = document.createElement('img')
                img1.src = 'assets/edit.png'
                img2.src = 'assets/excluir.png'

                const button1 = document.createElement('button')
                button1.className =  'buttonTab'
                button1.id = 'btnExcluir'
                button1.append(img2)
                const button2 = document.createElement('button')
                button2.className = 'buttonTab'
                button2.append(img1)
                button2.id = 'btnAtualizar'
                const button3 = document.createElement('a')
                button3.className = 'buttonTab'
                button3.innerHTML = 'adicionar arquivo'
                td5.className = 'actions'

                button2.setAttribute("onclick", "abrirModalAtualizar("+item+")")
                button1.setAttribute("onclick", "abrirModalExcluir("+item+")")

                
                setarTotal(item.categoria, item.valor);

                td1.innerHTML = item.descricao
                td2.innerHTML = "R$ " + item.valor
                td3.innerHTML = item.categoria
                td4.innerHTML =  item.data


                td5.append(button1, button2)
                tr.append(td1, td2, td3, td4, td5)
                list.append(tr)

                button2.onclick = abrirModalAtualizar.bind(this, item)
                button1.onclick = abrirModalExcluir.bind(this, item)
            })
    

                 
    } catch (error) {
        console.log(error)
        
    }
}


function abrirModalExcluir(item) {
    const fecharModal = document.getElementById("fecharModalExcluir")
    const btnEnviar = document.getElementById("btnExcluir")
    const modal = document.getElementById("modalExcluirDespesa")
    modal.showModal()

    btnEnviar.onclick = function() {
        deletarDespesa(item)
    }

    fecharModal.onclick = function() {
        modal.close()
    }
}

function abrirModalAtualizar(item) {
    const fecharModal = document.getElementById("fecharModalAtualizar")
    const enviar = document.getElementById("emviarModalAtualizar")
    const modal = document.getElementById("modalAtualizarDespesa")

    document.getElementById("valorModal").value = item.valor
    document.getElementById("categoriaModal").value = item.categoria
    document.getElementById("descricaoModal").value = item.descricao
    document.getElementById("dataModal").value = item.data
    document.getElementById("idModal").value = item.id
    
    modal.showModal()
    

    fecharModal.onclick = function() {
        modal.close()
    }
}

function fecharModal() {
    document.getElementById("modalExcluirDespesa").close()
    document.getElementById("modalAtualizarDespesa").close()
}

function deletarDespesa(item) {
            const url = "https://gestaodespesas-api-production.up.railway.app/despesa"    
            
            fecharModal()
            
            fetch(url, {
                method: 'DELETE',
                mode: 'cors',        
                headers: {         
                    'Accept' : 'application/json',
                'Content-Type' : 'application/json'            
                },
                body: JSON.stringify({
                        id: item.id,
                        descricao: item.descricao,
                        valor: item.valor,
                        categoria: item.categoria,
                        data : item.data
                        
                    }),
                
            }).then(response => response.json())
            .then(data => {
                if(data.error) {
                    
                    Swal.fire({
                        title: "",
                        text: data.error,
                        icon: 'warning',
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


const formAtualizarDespesa = document.getElementById("formAtualizarDespesa")

formAtualizarDespesa.addEventListener("submit", (e) => {
    const id = document.getElementById("idModal");
    const valor = document.getElementById("valorModal");
    const descricao = document.getElementById("descricaoModal");
    const categoria = document.getElementById("categoriaModal");
    const data = document.getElementById("dataModal") 

    
    e.preventDefault() 
    
    if(campsValidationAtualizar()) { 
    fecharModal()
    const url = "https://gestaodespesas-api-production.up.railway.app/despesa?id=" + id.value             
    
            fetch(url, {
                method: 'PUT',
                mode: 'cors',        
                headers: {         
                    'Accept' : 'application/json',
                'Content-Type' : 'application/json'            
                },
                body: JSON.stringify({
                        id: null,
                        descricao: descricao.value,
                        valor: valor.value,
                        categoria: categoria.value,
                        data : data.value
                        
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
        
        function campsValidationAtualizar() {
            var i = 0;
            i += validDescricao(descricao);
            i += validValor(valor)
            i += validData(data)
            i += validCategoria(categoria)
            return i === 4;
        }
    
})




const formDespesa = document.getElementById("formDespesa")

formDespesa.addEventListener("submit", (e) => {
    const valor = document.getElementById("valor");
    const descricao = document.getElementById("descricao");
    const categoria = document.getElementById("categoria");
    const data = document.getElementById("data") 

    e.preventDefault() 

    if(campsValidationAdicionar()) {
    const url = "https://gestaodespesas-api-production.up.railway.app/despesa"             
    
            fetch(url, {
                method: 'POST',
                mode: 'cors',        
                headers: {         
                    'Accept' : 'application/json',
                'Content-Type' : 'application/json'            
                },
                body: JSON.stringify({
                        id: null,
                        descricao: descricao.value,
                        valor: valor.value,
                        categoria: categoria.value,
                        data : data.value
                        
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

        
        function campsValidationAdicionar() {
            var i = 0;
            i += validDescricao(descricao);
            i += validValor(valor)
            i += validData(data)
            i += validCategoria(categoria)
            return i === 4;
        }
    })

function validDescricao(descricao) {
    if(descricao.value == "" || descricao.value.lentgh < 9) {
        setError(descricao, "digite uma descricao para despesa!!")
        return 0;
    } else {
        remove(descricao)
        return 1;
    } 
}

function validCategoria(categoria) {
    if(categoria.value === "") {
        setError(categoria, "selecione uma categoria!!")
        return 0;
    } else {
        remove(categoria)
        return 1;
    } 
}

function validValor(valor) {
    if(valor.value === "" || valor.value === 0 || isNaN(valor.value)) {
        setError(valor, "digite um valor")
        return 0;
    } else {
        remove(valor)
        return 1;
    } 
}

function validData(data) {
    if(data.value === "") {
        setError(data, "data invalida")
        return 0
    } 
    remove(data)
    return 1
  }


function setError(input, message) {
    const inputBox = input.parentElement;
    console.log(inputBox)
    const span = inputBox.querySelector("span");
    span.innerText = message;
    span.style.display = "block";
    span.style.color = "red"
    span.style.fontSize = "10px"
    input.style.border = "1px solid red"
}

function remove(input) {
    const inputBox = input.parentElement;
    console.log(inputBox)
    const span = inputBox.querySelector("span");
    span.style.display = "none";
    input.style.border = "1px solid green"
}


function setarTotal(categoria, valor) {
    if (categoria === "ALIMENTACAO") {
        alimentacaoTotal += valor;
    } else if (categoria === "MORADIA") {
        moradiaTotal += valor;
    } else if (categoria === "TRANSPORTE") {
        transporteTotal += valor;
    } else if (categoria === "LAZER") {
        lazerTotal += valor;
    } else if (categoria === "SAUDE") {
        saudeTotal += valor;
    }

     
     document.getElementById("totalAlimentacao").innerHTML ="R$" + alimentacaoTotal
     document.getElementById("totalSaude").innerHTML = "R$" + saudeTotal
     document.getElementById("totalTransporte").innerHTML = "R$" + transporteTotal
     document.getElementById("totalMoradia").innerHTML = "R$" + moradiaTotal
     document.getElementById("totalLazer").innerHTML = "R$" + lazerTotal


}







listTableDespesa()
recebeSaldo()