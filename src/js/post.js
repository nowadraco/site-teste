document.addEventListener('DOMContentLoaded', () => {
    const postsSection = document.getElementById('posts');
    const postPaths = ['src/post/post1.html', 'src/post/post2.html', 'src/post/post4.html', 'src/post/post.html']; // Caminhos corretos dos posts

    postPaths.forEach(path => {
        fetch(path)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                console.log(`Successfully fetched: ${path}`);
                return response.text();
            })
            .then(html => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                const titleElement = doc.querySelector('title');
                const sectionElement = doc.querySelector('section');

                if (!titleElement || !sectionElement) {
                    throw new Error(`Missing title or section in ${path}`);
                }

                const title = titleElement.innerText;
                const content = sectionElement.innerText.slice(0, 200); // Pega os primeiros 200 caracteres da seção

                const postDiv = document.createElement('div');
                postDiv.innerHTML = `<h2>${title}</h2><p>${content}...</p>`;
                postsSection.appendChild(postDiv);
            })
            .catch(error => console.error(`Error fetching post from ${path}:`, error));
    });
});
