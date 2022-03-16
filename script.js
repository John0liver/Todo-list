const form = document.getElementById('form')
const entrada = document.getElementById('entrada')
const tarefaUL = document.getElementById('tarefa')

const tarefa = JSON.parse(localStorage.getItem('tarefa'))

if(tarefa) {
    tarefa.forEach(tarefa => addTarefa(tarefa))
}

form.addEventListener('submit', (e) => {
    e.preventDefault()

    addTarefa()
})

function addTarefa(tarefa) {
    let tarefaTexto = entrada.value

    if(tarefa) {
        tarefaTexto = tarefa.text
    }

    if(tarefaTexto) {
        const tarefaEl = document.createElement('li')
        if(tarefa && tarefa.completed) {
            tarefaEl.classList.add('completed')
        }

        tarefaEl.innerText = tarefaTexto

        tarefaEl.addEventListener('click', () => {
            tarefaEl.classList.toggle('completed')
            atualizaLS()
        }) 

        tarefaEl.addEventListener('contextmenu', (e) => {
            e.preventDefault()

            tarefaEl.remove()
            atualizaLS()
        }) 

        tarefaUL.appendChild(tarefaEl)

        entrada.value = ''

        atualizaLS()
    }
}

function atualizaLS() {
    tarefaEl = document.querySelectorAll('li')

    const tarefa = []

    tarefaEl.forEach(tarefaEl => {
        tarefa.push({
            texto: tarefaEl.innerText,
            completed: tarefaEl.classList.contains('completed')
        })
    })

    localStorage.setItem('tarefa', JSON.stringify(tarefa))
}