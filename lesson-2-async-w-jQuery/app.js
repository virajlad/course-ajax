/* eslint-env jquery */

(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;
        
        function addImage(images) {
            const firstImage = images.results[0];
            
            responseContainer.insertAdjacentHTML('afterbegin', `<figure>
                    <img src="${firstImage.urls.regular}" alt="${searchedForText}" >
                    <figcaption>${searchedForText} by ${firstImage.user.name}</figcaption>
                </figure>`);
        }
        
        function addArticles(articles) {
            responseContainer.insertAdjacentHTML('beforeend', '<ul>' +
                    articles.response.docs.map( article => {
                        return `<li class="article"> 
                            <h2><a href="${article.web_url}">${article.headline.main}</a></h2>
                            <p>${article.snippet}</p>
                        </li>`;
                    }).join('') 
                    + '</ul>');
        }
        
        $.ajax({
            url: `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`,
            headers: {
                Authorization: 'Client-ID e773feaa9e6d9ebeb0b31622f72dcb785e89d6c2ff694059825416615d948b3c'
            }
        }).done(addImage);
        
        $.ajax({
            url: `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=d0555377b67b44119cff7b28b808e0e2`
        }).done(addArticles);
    });
})();
