<script>
        document.getElementById('menu-toggle').addEventListener('click', () => {
            document.getElementById('menu').classList.toggle('showing');
        });
        document.querySelectorAll('.menu-link').forEach(link => {
            link.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('data-target');
                document.querySelectorAll('.content').forEach(content => {
                    content.classList.remove('active');
                });
                document.getElementById(targetId).classList.add('active');
            });
        });
        document.getElementById('gerar-versiculo').addEventListener('click', function () {
            fetch('versiculos.json')
                .then(response => response.json())
                .then(data => {
                    const randomIndex = Math.floor(Math.random() * data.versiculos.length);
                    const versiculo = data.versiculos[randomIndex];
                    document.getElementById('versiculo').value = versiculo.texto;
                });
        });
        document.getElementById('enviar-whatsapp').addEventListener('click', function () {
            const versiculo = document.getElementById('versiculo').value;
            const url = https://api.whatsapp.com/send?text=${encodeURIComponent(versiculo)};
            window.open(url, '_blank');
        });
        document.addEventListener('DOMContentLoaded', function () {
            loadBible();
        });
        function loadBible() {
            fetch('https://raw.githubusercontent.com/thiagobodruk/biblia/master/xml/nvi.min.xml')
                .then(response => response.text())
                .then(data => {
                    const parser = new DOMParser();
                    const xmlDoc = parser.parseFromString(data, 'text/xml');
                    const books = xmlDoc.getElementsByTagName('book');
                    const bookList = document.getElementById('book-list');
                    for (let i = 0; i < books.length; i++) {
                        const book = books[i];
                        const listItem = document.createElement('li');
                        const bookLink = document.createElement('a');
                        bookLink.href = '#';
                        bookLink.textContent = book.getAttribute('name');
                        bookLink.setAttribute('data-book-id', i);
                        listItem.appendChild(bookLink);
                        bookList.appendChild(listItem);
                        bookLink.addEventListener('click', function (e) {
                            e.preventDefault();
                            const bookId = this.getAttribute('data-book-id');
                            const chapters = book.getElementsByTagName('c');
                            const chapterList = document.getElementById('chapter-list');
                            chapterList.innerHTML = '';
                            for (let j = 0; j < chapters.length; j++) {
                                const chapter = chapters[j];
                                const chapterLink = document.createElement('a');
                                chapterLink.href = '#';
                                chapterLink.textContent = Capítulo ${chapter.getAttribute('n')};
                                chapterLink.setAttribute('data-book-id', bookId);
                                chapterLink.setAttribute('data-chapter-id', j);
                                chapterList.appendChild(chapterLink);
                                chapterLink.addEventListener('click', function (e) {
                                    e.preventDefault();
                                    const bookId = this.getAttribute('data-book-id');
                                    const chapterId = this.getAttribute('data-chapter-id');
                                    const verses = chapter.getElementsByTagName('v');
                                    const verseList = document.getElementById('verse-list');
                                    verseList.innerHTML = '';
                                    for (let k = 0; k < verses.length; k++) {
                                        const verse = verses[k];
                                        const verseItem = document.createElement('p');
                                        verseItem.textContent = ${verse.getAttribute('n')}: ${verse.textContent};
                                        verseList.appendChild(verseItem);
                                    }
                                });
                            }
                        });
                    }
                });
        }
    </script>
