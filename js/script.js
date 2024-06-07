<script>
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle');
    const menu = document.getElementById('menu');
    const versiculoTextarea = document.getElementById('versiculo');

    // Carregar versículos de um arquivo JSON
    async function carregarVersiculos() {
        try {
            const response = await fetch('js/versiculos.json'); // Corrigido o caminho para versiculos.json
            return await response.json();
        } catch (error) {
            console.error('Erro ao carregar versículos:', error);
            return [];
        }
    }

    // Funcionalidade do menu
    menuToggle.addEventListener('click', () => {
        menu.classList.toggle('showing');
    });

    document.querySelectorAll('.menu-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('data-target');
            document.querySelectorAll('.content').forEach(section => {
                section.classList.remove('active');
            });
            document.getElementById(targetId).classList.add('active');
        });
    });

    // Funcionalidade de gerar versículo
    document.getElementById('gerar-versiculo').addEventListener('click', async () => {
        const versiculos = await carregarVersiculos();
        if (versiculos.length > 0) {
            const randomIndex = Math.floor(Math.random() * versiculos.length);
            versiculoTextarea.value = versiculos[randomIndex];
        } else {
            versiculoTextarea.value = "Erro ao carregar versículos.";
        }
    });

    // Funcionalidade de enviar para o WhatsApp
    document.getElementById('enviar-whatsapp').addEventListener('click', () => {
        const versiculo = versiculoTextarea.value;
        const url = `https://wa.me/?text=${encodeURIComponent(versiculo)}`;
        window.open(url, '_blank');
    });

    // Carregar a Bíblia (usando JSON para melhor desempenho)
    async function loadBible() {
        try {
            const response = await fetch('https://raw.githubusercontent.com/thiagobodruk/biblia/master/json/nvi.json');
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

    // Carregar capítulos de um livro
    function loadChapters(bookName) {
        chapterList.innerHTML = '';
        verseList.innerHTML = '';

        for (const chapterNum in bibleData[bookName]) {
            const chapterLink = document.createElement('a');
            chapterLink.href = '#';
            chapterLink.textContent = `Capítulo ${chapterNum}`;
            chapterLink.addEventListener('click', () => loadVerses(bookName, chapterNum));
            chapterList.appendChild(chapterLink);
        }
    }

    // Carregar versículos de um capítulo
    function loadVerses(bookName, chapterNum) {
        verseList.innerHTML = '';

        const verses = bibleData[bookName][chapterNum];
        for (const verseNum in verses) {
            const verseItem = document.createElement('p');
            verseItem.textContent = `${verseNum}: ${verses[verseNum]}`;
            verseList.appendChild(verseItem);
        }
    }

    // Iniciar o carregamento da Bíblia
    loadBible();
});

</script>
