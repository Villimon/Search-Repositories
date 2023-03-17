const form = document.getElementById('form')
const repositories = document.querySelector('.repositories')


form.addEventListener('submit', async function (e) {
    e.preventDefault()

    const formData = new FormData(form)
    let repo = formData.get('repo');

    let result;

    while (repositories.firstChild) {
        repositories.removeChild(repositories.firstChild);
    }


    try {
        let response = await fetch(`https://api.github.com/search/repositories?q=${repo}&per_page=10`, {
            headers: {
                'accept': 'application/vnd.github+json',
                'Content-Type': 'application/json',
            }
        });
        result = await response.json()
    } catch (error) {
        alert(error);
    }


    if (result) {
        result.items.map(item =>
            repositories.insertAdjacentHTML(
                'beforeend',
                `
                <div class="repositories__body">
                    <a href=${item.html_url} target="_blank" class="repositories__name">${item.name}</a>
                    <div class="repositories__owner">
                        <img src=${item.owner.avatar_url} alt="" class="repositories__img">
                        <h3 class="repositories__login">${item.owner.login}</h3>
                    </div>
                </div>
                `
            )
        )
    }
    if (result.total_count === 0) {
        repositories.insertAdjacentHTML(
            'beforeend',
            `
            <div class="repositories__body">
                <h2 class="repositories__title">Ничего не найдено</h2>
            </div>
            `
        )
    }


    form.reset()
})













