class Despesa {
    constructor(ano, mes, dia, tipo, descricao, valor) {
        this.ano = ano
        this.mes = mes
        this.dia = dia
        this.tipo = tipo
        this.descricao = descricao
        this.valor = valor
    }

    validarDados() {
        for (let i in this) {
            if (this[i] == undefined || this[i] == '' || this[i] == null) {
                return false
            }
        }
        return true
    }
}


class Bd {

    constructor() {
        let id = localStorage.getItem('id')

        if (id === null) {
            localStorage.setItem('id', 0)
        }
    }

    getNewId() {
        let nextId = localStorage.getItem('id')
        return parseInt(nextId) + 1
    }

    gravar(d) {

        let id = this.getNewId()
        localStorage.setItem(id, JSON.stringify(d))
        localStorage.setItem('id', id)
    }

    salvarLista() {
        let despesas = Array()

        let id = localStorage.getItem('id')

        for (let i = 1; i <= id; i++) {

            let despesa = JSON.parse(localStorage.getItem(i))

            if (despesa === null) {
                continue
            }
            despesa.id = i
            despesas.push(despesa)
        }

        return despesas
    }

    pesquisar(despesa) {

        let filtroDeDespesa = Array()

        filtroDeDespesa = this.salvarLista()

        // console.log(despesa)

        // console.log(filtroDeDespesa)

        if (despesa.ano != '') {
            // console.log('filtro de ano')
            filtroDeDespesa = filtroDeDespesa.filter(i => i.ano == despesa.ano)
        }

        if (despesa.mes != '') {
            // console.log('filtro de mes')
            filtroDeDespesa = filtroDeDespesa.filter(i => i.mes == despesa.mes)
        }
        if (despesa.dia != '') {
            // console.log('filtro de dia')
            filtroDeDespesa = filtroDeDespesa.filter(i => i.dia == despesa.dia)
        }
        if (despesa.tipo != '') {
            // console.log('filtro de tipo')
            filtroDeDespesa = filtroDeDespesa.filter(i => i.tipo == despesa.tipo)
        }
        if (despesa.descricao != '') {
            // console.log('filtro de descricao')
            filtroDeDespesa = filtroDeDespesa.filter(i => i.descricao == despesa.descricao)
        }
        if (despesa.valor != '') {
            // console.log('filtro de valor')
            filtroDeDespesa = filtroDeDespesa.filter(i => i.valor == despesa.valor)
        }

        return filtroDeDespesa
    }
    remover(id) {
        localStorage.removeItem(id)
    }
}

let bd = new Bd()


function cadastrarDespesa() {
    let ano = document.getElementById('ano')
    let mes = document.getElementById('mes')
    let tipo = document.getElementById('tipo')
    let descricao = document.getElementById('descricao')
    let valor = document.getElementById('valor')

    let despesa = new Despesa(
        ano.value,
        mes.value,
        dia.value,
        tipo.value,
        descricao.value,
        valor.value


    )
    if (despesa.validarDados()) {
        bd.gravar(despesa)
        document.getElementById('modal-title').innerHTML = "Cadastrado com suceso!!"
        document.getElementById('modal-div').className = 'modal-header text-success'
        document.getElementById('modal-body').innerHTML = " Suas despesas foram cadasdatras com sucesso!!"
        document.getElementById('modal-btn').innerHTML = "Cadastrado"
        document.getElementById('modal-btn').className = 'btn btn-success'
        $('#validacao').modal('show')


        ano.value = ''
        mes.value = ''
        dia.value = ''
        tipo.value = ''
        descricao.value = ''
        valor.value = ''


    } else {

        document.getElementById('modal-title').innerHTML = "Error"
        document.getElementById('modal-div').className = 'modal-header text-danger'
        document.getElementById('modal-body').innerHTML = "Existem campos a serem preenchidos!!"
        document.getElementById('modal-btn').innerHTML = "Corrigir"
        document.getElementById('modal-btn').className = 'btn btn-danger'
        $('#validacao').modal('show')
    }
}


function listarDespesas() {
    let despesas = Array()
    despesas = bd.salvarLista()

    let lista = document.getElementById('lista')

    despesas.forEach(function (i) {


        let tr = lista.insertRow()
        tr.insertCell(0).innerHTML = `${i.dia}/${i.mes}/${i.ano}`

        switch (i.tipo) {
            case '1': i.tipo = 'Alimentação'
                break
            case '2': i.tipo = 'Educação'
                break
            case '3': i.tipo = 'Lazer'
                break
            case '4': i.tipo = 'Saúde'
                break
            case '5': i.tipo = 'Transporte'
                break
        }

        tr.insertCell(1).innerHTML = i.tipo


        tr.insertCell(2).innerHTML = i.descricao
        tr.insertCell(3).innerHTML = i.valor
        tr.insertCell(4)

        // exclui
        let trash = document.createElement('button')
        trash.className = 'btn btn-danger'
        trash.innerHTML = '<i class="fa-solid fa-trash"></i>'
        trash.id = `id_despesa_${i.id}`
        trash.onclick = function() {
            let id = this.id.replace('id_despesa_', '')
          
            bd.remover(id)
            window.location.reload()
        }
        tr.insertCell(5).append( trash )
    })
}

function pesquisarDespesa() {
   
    let ano = document.getElementById('ano').value
    let mes = document.getElementById('mes').value
    let dia = document.getElementById('dia').value
    let tipo = document.getElementById('tipo').value
    let descricao = document.getElementById('descricao').value
    let valor = document.getElementById('valor').value


    let despesa = new Despesa(ano, mes, dia, tipo, descricao, valor)

    let despesas = bd.pesquisar(despesa)


    let lista = document.getElementById('lista')

    lista.innerHTML = ''

    despesas.forEach(function (i) {


        let tr = lista.insertRow()

        tr.insertCell(0).innerHTML = `${i.dia}/${i.mes}/${i.ano}`

        switch (i.tipo) {
            case '1': i.tipo = 'Alimentação'
                break
            case '2': i.tipo = 'Educação'
                break
            case '3': i.tipo = 'Lazer'
                break
            case '4': i.tipo = 'Saude'
                break
            case '5': i.tipo = 'Transporte'
                break
        }

        
        
        tr.insertCell(1).innerHTML = i.tipo
        tr.insertCell(2).innerHTML = i.descricao
        tr.insertCell(3).innerHTML = i.valor


        
    })
}
// }
