document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('pragaForm');
    const tabela = document.getElementById('pragaTable').querySelector('tbody');
    const exportarExcel = document.getElementById('exportarExcel');
    const proximaPlanta = document.getElementById('proximaPlanta');

    let numeroPlanta = 1; // Número da planta atual
    const dadosPragas = [];

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const nomePraga = document.getElementById('nomePraga').value.trim();
        const quantidade = parseInt(document.getElementById('quantidade').value);
        const imagemPraga = document.getElementById('imagemPraga').files[0];

        if (!nomePraga || quantidade <= 0) {
            alert('Preencha todos os campos corretamente.');
            return;
        }

        // Processa imagem (gera URL para visualização)
        let imagemURL = '';
        if (imagemPraga) {
            imagemURL = URL.createObjectURL(imagemPraga);
        }

        // Adiciona à tabela
        const novaLinha = document.createElement('tr');
        novaLinha.innerHTML = `
            <td>${numeroPlanta}</td>
            <td>${nomePraga}</td>
            <td>${quantidade}</td>
            <td>${imagemURL ? `<img src="${imagemURL}" alt="Imagem da Praga" style="max-width: 50px;">` : 'Sem imagem'}</td>
        `;
        tabela.appendChild(novaLinha);

        // Adiciona ao array de dados
        dadosPragas.push({
            Número: numeroPlanta,
            Nome: nomePraga,
            Quantidade: quantidade,
            Imagem: imagemPraga ? imagemPraga.name : 'Sem imagem'
        });

        // Limpa o formulário
        form.reset();
    });

    proximaPlanta.addEventListener('click', () => {
        numeroPlanta++;
        document.getElementById('numeroPlanta').value = numeroPlanta;
        alert(`Avançando para a planta ${numeroPlanta}`);
    });

    exportarExcel.addEventListener('click', () => {
        if (dadosPragas.length === 0) {
            alert('Nenhum dado para exportar.');
            return;
        }

        const worksheet = XLSX.utils.json_to_sheet(dadosPragas);
        const workbook = XLSX.utils.book_new();

        XLSX.utils.book_append_sheet(workbook, worksheet, "Pragas");

        // Salva como arquivo Excel
        XLSX.writeFile(workbook, "registro_pragas.xlsx");
    });

    // Inicializa o número da planta
    document.getElementById('numeroPlanta').value = numeroPlanta;
});
