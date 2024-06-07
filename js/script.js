document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle');
    const menu = document.getElementById('menu');
    const versiculoTextarea = document.getElementById('versiculo');

    // Função para carregar versículos do arquivo JSON
    async function carregarVersiculos() {
        try {
            const response = await fetch('js/versiculos.json');
            return await response.json();
        } catch (error) {
            console.error('Erro ao carregar versículos:', error);
            return [];
        }
    }

    // Evento de clique no botão do menu hambúrguer
    menuToggle.addEventListener('click', () => {
        menu.classList.toggle('showing'); // Mostrar/esconder o menu
    });

    // Eventos de clique nos links do menu
    document.querySelectorAll('.menu-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); // Evitar o comportamento padrão do link

            // Remover a classe 'active' de todas as seções de conteúdo
            document.querySelectorAll('.content').forEach(section => {
                section.classList.remove('active');
            });

            // Adicionar a classe 'active' à seção de conteúdo correspondente ao link clicado
            const targetId = link.getAttribute('data-target');
            document.getElementById(targetId).classList.add('active');

            // Fechar o menu após clicar em um link
            menu.classList.remove('showing');
        });
    });

    // Evento de clique no botão "Gerar Versículo"
    document.getElementById('gerar-versiculo').addEventListener('click', async () => {
        const versiculos = await carregarVersiculos();
        if (versiculos.length > 0) {
            const randomIndex = Math.floor(Math.random() * versiculos.length);
            versiculoTextarea.value = versiculos[randomIndex];
        } else {
            versiculoTextarea.value = "Erro ao carregar versículos.";
        }
    });

    // Evento de clique no botão "Enviar para o WhatsApp" (CORRIGIDO)
    document.getElementById('enviar-whatsapp').addEventListener('click', () => {
        const versiculo = versiculoTextarea.value;
        const url = `https://wa.me/?text=${encodeURIComponent(versiculo)}`; 
        window.open(url, '_blank');
    });

    // Carregar a Bíblia (usando JSON para melhor desempenho)
    async function loadBible() {
        try {
            const response = await fetch('https://raw.githubusercontent.com/thiagobodruk/biblia/master/json/nvi.json'); // Alterado para JSON
            const bibleData = await response.json();

            const bookList = document.getElementById('book-list');
            const chapterList = document.getElementById('chapter-list');
            const verseList = document.getElementById('verse-list');

            // Popular a lista de livros
            for (const bookName in bibleData) {
                const listItem = document.createElement('li');
                const bookLink = document.createElement('a');
                bookLink.href = '#';
                bookLink.textContent = bookName;
                bookLink.addEventListener('click', () => loadChapters(bookName));
                listItem.appendChild(bookLink);
                bookList.appendChild(listItem);
            }
        } catch (error) {
            console.error('Erro ao carregar a Bíblia:', error);
        }
    }

    // Função para carregar capítulos 
    function loadChapters(bookName) {
        const chapters = bibleData[bookName];
        chapterList.innerHTML = ''; // Limpar a lista de capítulos anterior

        for (let chapterNum = 1; chapterNum <= chapters.length; chapterNum++) {
            const chapterLink = document.createElement('a');
            chapterLink.href = '#';
            chapterLink.textContent = `Capítulo ${chapterNum}`;
            chapterLink.addEventListener('click', () => loadVerses(bookName, chapterNum));
            chapterList.appendChild(chapterLink);
        }
    }

    // Função para carregar versículos
    function loadVerses(bookName, chapterNum) {
        const verses = bibleData[bookName][chapterNum - 1];
        verseList.innerHTML = ''; // Limpar a lista de versículos anterior

        verses.forEach((verseText, verseNum) => {
            const verseItem = document.createElement('p');
            verseItem.textContent = `${verseNum + 1}: ${verseText}`;
            verseList.appendChild(verseItem);
        });
    }

    // Chamar a função para carregar a Bíblia quando a página carregar
    loadBible(); 
});

</script>
