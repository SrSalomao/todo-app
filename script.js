document.addEventListener("DOMContentLoaded", function() {
    const tarefaInput = document.getElementById("nova-tarefa");
    const adicionarButton = document.getElementById("adicionar-tarefa");
    const tarefasLista = document.getElementById("tarefas-lista");

    // Carregar tarefas do localStorage
    carregarTarefas();

    // Adicionar tarefa
    adicionarButton.addEventListener("click", function() {
        const tarefaTexto = tarefaInput.value.trim();
        if (tarefaTexto !== "") {
            adicionarTarefa(tarefaTexto);
            tarefaInput.value = "";
        }
    });

    function adicionarTarefa(texto) {
        const li = document.createElement("li");
        li.textContent = texto;

        // Botão de remover
        const removerButton = document.createElement("button");
        removerButton.textContent = "Remover";
        removerButton.addEventListener("click", function() {
            li.remove();
            salvarTarefas();
        });

        li.appendChild(removerButton);
        tarefasLista.appendChild(li);
        salvarTarefas();
    }

    function salvarTarefas() {
        const tarefas = [];
        tarefasLista.querySelectorAll("li").forEach(function(li) {
            tarefas.push(li.firstChild.textContent);
        });
        localStorage.setItem("tarefas", JSON.stringify(tarefas));
    }

    function carregarTarefas() {
        const tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
        tarefas.forEach(function(tarefaTexto) {
            adicionarTarefa(tarefaTexto);
        });
    }
});
