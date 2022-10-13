// CLASSES

// -----------------------------------------------------------------------------------------------------------------------------------


class Pessoa{
    nome
    nasci
    tipo
    senha
    email
    gen

    constructor(nome, nasci, tipo, senha, email, gen){
        
        this.nome = nome
        this.nasci = new Date(nasci)
        this.nasci.setDate(this.nasci.getMonth() + 1)
        this.tipo = tipo
        this.senha = senha
        this.email = email
        this.gen = gen


    }

}

class Aluno extends Pessoa {
    turma

    constructor(nome, nasci, tipo, senha, email, gen, turma){

        super(nome, nasci, tipo, senha, email, gen)

        this.turma = turma

    }

}

class Professor extends Pessoa {
    materia

    constructor(nome, nasci, tipo, senha, email, gen, materia){

        super(nome, nasci, tipo, senha, email, gen)

        this.materia = materia
        
    }
}

class Turma {

    nome
    tipo
    email
    senha
    materias
    quant
    alunos = []

    constructor(nome, tipo, email, senha, materias, quant){

        this.nome = nome
        this.tipo = tipo
        this.email = email
        this.senha = senha
        this.materias = materias
        this.quant = quant



    }





}



// -----------------------------------------------------------------------------------------------------------------------------------



// VARIAVEIS GLOBAIS


//------------------------------------------------------------------------------------------------------------------------------------

var home = document.getElementById("home")
var formpg = document.getElementById("form-register")
var formy = document.getElementById("schoolReg")
var nome = document.getElementById("iNome")
var gen = document.getElementById("iGen")
var genEl = document.getElementsByClassName("gend")
var nasci = document.getElementById("iAge")
var tipo = document.getElementById("iType")
var senha = document.getElementById("iSenha")
var mat = document.getElementById("iMat") //INPUT PARA PEGAR A MATERIA QUE O PROFESSOR ENSINA
var quant = document.getElementById("iQuant") //INPUT NUMERO DE ALUNOS
var turma = document.getElementById("iTurma")
var email = document.getElementById("iEmail")
var otherGen = document.getElementById("genOther")
var quantEl = document.getElementsByClassName("quant") // TUDO RELACIONADO AO DISPLAY DO INPUT DE QUANTIDADE DE ALUNOS
var turmasEl = document.getElementsByClassName("turmas")
var matEl = document.getElementsByClassName("mat") //TUDO RELACIONADO AO DISPLAY DA MATERIA QUE O PROFESSOR ENSINA
var pickClass = document.getElementById("selectClasses")
var registroPag = document.getElementById("showRegistry")
var nasciEl = document.getElementsByClassName("nasci") //TUDO RELACIONADO AO DISPLAY DO INPUT DE NASCIMENTO
var registros = []
var allmats = document.getElementsByClassName("form-check-input")

//------------------------------------------------------------------------------------------------------------------------------------



//FUNÇÕES

//------------------------------------------------------------------------------------------------------------------------------------



function transport(address){

    switch (address) {
        case "home": home.style.display = "block"; registroPag.style.display = "none"; formpg.style.display = "none"; break;
        case "former": home.style.display = "none"; registroPag.style.display = "none"; formpg.style.display = "block"; break;
        case "reg": home.style.display = "none"; formpg.style.display = "none";  registroPag.style.display = "block"; break;
    
        default:
            break;
    }

}




function hider(){

    switch (tipo.value) {
        case "Professor": vanisher(turmasEl); shower(matEl); shower(genEl); vanisher(otherGen);vanisher(pickClass); shower(nasciEl); vanisher(quantEl);break;
        case "Aluno": vanisher(matEl); shower(turmasEl); shower(genEl); vanisher(otherGen) ; vanisher(pickClass); shower(nasciEl);vanisher(quantEl);break;
        case "Turma": vanisher(matEl); shower(pickClass); vanisher(genEl); vanisher(otherGen); vanisher(nasciEl); vanisher(turmasEl); shower(quantEl); break;
    
        default:
            break;
    }

}

function vanisher(ellies){

    if(ellies.length == undefined){
        ellies.style.display = "none"
    } else {
        for(let i = 0; i < ellies.length; i++){
            ellies[i].style = "display: none!important;"
        }
    }



}

function shower(ellies){


    if(ellies.length == undefined){

        ellies.style.display = "block"
    
    } else {
        
        for(let i = 0; i < ellies.length; i++){
        
            ellies[i].style = "display: block!important;"
       
        }
    
    }

}

function registerClassroom(){

    let matSelected = []

    for(let i in allmats){
        if(allmats[i].checked){
            matSelected.push(allmats[i].value)
        }
    }

    let t1 = new Turma(nome.value, tipo.value, email.value, senha.value, matSelected, quant.value)

    if(validate(t1)[0] > 0){
            
        window.alert(validate(t1)[1])
        
        return
    }

    registros.push(t1)

    turma.innerHTML += `<option value="${t1.nome}">${t1.nome}</option>`
    
    formy.reset()

    hider()

}

function registerStudent(){

    if(gen.value == "outro"){
        let s1 = new Aluno(nome.value, nasci.value, tipo.value, senha.value, email.value, document.getElementById("genOther").value,turma.value)

        if(validate(s1)[0] > 0){
            
            window.alert(validate(s1)[1])
            
            return
        }

        for(let i in registros){
            if(s1.turma == registros[i].nome && registros[i].tipo == "Turma"){
    
                registros[i].alunos.push(s1)
    
            }
    

        }
    
        registros.push(s1)
    
        formy.reset()
    
        hider()
    
    } else {

        let s1 = new Aluno(nome.value, nasci.value, tipo.value, senha.value, email.value, gen.value, turma.value)

        if(validate(s1)[0] > 0){
            
            window.alert(validate(s1)[1])
            
            return
        }

        for(let i in registros){

        if(s1.turma == registros[i].nome && registros[i].tipo == "Turma"){

            registros[i].alunos.push(s1)

        }
    }

    registros.push(s1)

    formy.reset()

    hider()

    }


}

function registerTeacher(){

    if(gen.value == "outro"){

        let t1 = new Professor(nome.value, nasci.value, tipo.value, senha.value, email.value, document.getElementById("genOther").value, mat.value)

        if(validate(t1)[0] > 0){
            
            window.alert(validate(t1)[1])
            
            return
        }

        registros.push(t1)
    
        formy.reset()
    
        hider()
    

    } else {

        let t1 = new Professor(nome.value, nasci.value, tipo.value, senha.value, email.value, gen.value, mat.value)

        if(validate(t1)[0] > 0){
            
            window.alert(validate(t1)[1])
            
            return
        }

        registros.push(t1)
    
        formy.reset()
    
        hider()
        
    }

}

function register(){

    switch(tipo.value){
        case "Turma":registerClassroom();break;
        case "Professor": registerTeacher(); break;
        case "Aluno":registerStudent();break;
    }


}

function checkAge(individuo){


    let idade

    if(new Date().getMonth() > individuo.nasci.getMonth()){
        idade = new Date().getFullYear() - individuo.nasci.getFullYear()
    } else if(new Date().getMonth() == individuo.nasci.getMonth()){
        if(new Date().getDate() > individuo.nasci.getDate()){
            idade = new Date().getFullYear() - individuo.nasci.getFullYear()
        } else {
            idade = (new Date().getFullYear() - individuo.nasci.getFullYear()) - 1
        }
    } else {
        idade = (new Date().getFullYear() - individuo.nasci.getFullYear()) - 1
    }


    return idade



}

function validate(obj){

    let erros = 0
    let msgErro = ""

    if(senha.value.length < 8){
        erros++
        msgErro = "Sua senha necessita possuir 8 ou mais caracteres \r\n"
    }

    if(obj.tipo == "Turma"){

        if(Number(quant.value) < 5 || Number(quant.value) == NaN || Number(quant.value) > 30){
            erros++
            msgErro += "Quantidade Invalida de Alunos: Aceitamos entre 5-30 alunos\r\n"
        }

        if(nome.value.length < 3 || nome.value.length > 6){
            erros++
            msgErro+= "Não aceitamos nomes de turma com menos de 3 números ou mais de 6 números\r\n"
        }

        if(isNaN(obj.nome)){
            erros++
            msgErro += `Utilizamos apenas números em nomes de turma\r\n`
        }

        if(obj.materias.length < 1){
            erros++
            msgErro += "Matérias Insuficientes\r\n"
        }

        if(obj.materias.includes("Química Org.") && obj.materias.includes("Química")){
            erros++
            msgErro += "Disponibizamos apenas um curso de química por Turma\r\n"

        }

        if(obj.materias.includes("Matemática Av.") && obj.materias.includes("Matemática")){
            erros++
            msgErro += "Disponibizamos apenas um curso de Matemática por Turma\r\n"

        }

    } else{

        if(nome.value.trim().indexOf(" ") < 0){
            erros++
            msgErro += "Digite seu nome completo \r\n"
        }

        if(nome.value.length < 1){
            erros++
            msgErro += "Não deixe o campo de nome vazio \r\n"
        }

        for(let i in registros){
            if(registros[i].nome == nome.value){
                erros++
                msgErro += "Nome já cadastrado \r\n"
            }
        }

        for(let i in registros){
            if(registros[i].email == email.value){
                erros++
                msgErro += "E-mail já cadastrado \r\n"
            }
        }

        for(let i in registros){
            if(obj.turma == registros[i].nome && registros[i].tipo == "Turma"){
                if(Number(registros[i].quant) < (Number(registros[i].alunos.length) + 1)) {
                    erros++
                    msgErro += "Não há mais espaço nesta turma \r \n"

                }
    
            }
    

        }

        if(turma.value == ""){
            erros++
            msgErro += "Não há turmas registradas \r \n"
        }

    }

    if(!email.value.includes("@") || !email.value.includes(".com")){
        erros++
        msgErro += "E-Mail inválido\r\n"
    }





    return([erros, msgErro])



}

function gender(){
    if(gen.value == "outro"){
        document.getElementById("genOther").style.display = "block"
    } else {
        document.getElementById("genOther").style.display = "none"
    }
}

function display(){

    let td = document.getElementById("turmasDisp")

    let pd = document.getElementById("profsDisp")

    let cardt = ""

    let cardp = ""

    for(let i in registros){

        if(registros[i].tipo == "Turma"){

            cardt+= `<div class="t${registros[i].nome}"> Turma: ${registros[i].nome} <br/>Email da Turma: ${registros[i].email}<br/> Matérias:  `

            for(let j in registros[i].materias){
                cardt += `<br/> • ${registros[i].materias[j]}`
            }

            cardt+= "<br/>Alunos: "

            for(let j in registros){
                if(registros[j].turma == registros[i].nome){
                    cardt += `<br/> • ${registros[j].nome} (${(checkAge(registros[j]) > 17 ? checkAge(registros[j]) + ": maior de idade" : checkAge(registros[j]) + ": menor de idade")})`
                }
            }

            cardt += "</div> <hr/>"

        }

        if(registros[i].tipo == "Professor"){

            cardp += `Professor: ${registros[i].nome} <br/>Materia: ${registros[i].materia} <br/>Idade: ${checkAge(registros[i])} <hr>`

        }

    }

    td.innerHTML = cardt

    pd.innerHTML = cardp


}

//------------------------------------------------------------------------------------------------------------------------------------
