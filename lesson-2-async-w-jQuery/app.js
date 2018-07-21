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
            let htmlContent = '';
            
            if (images.results && images.results[0]) {
                const firstImage = images.results[0];
            
                htmlContent = `<figure>
                        <img src="${firstImage.urls.regular}" alt="${searchedForText}" >
                        <figcaption>${searchedForText} by ${firstImage.user.name}</figcaption>
                    </figure>`);
            } else {
                htmlContent = '<div class="error-no-image">No images available</div>'
            }
            
            responseContainer.insertAdjacentHTML('afterbegin', htmlContent);
        }
        
        function addArticles(articles) {
            let htmlContent = '';
            
            if (articles.response && articles.response.docs && articles.response.docs[0]) {
            
            htmlContent = '<ul>' +
                    articles.response.docs.map( article => {
                        return `<li class="article"> 
                            <h2><a href="${article.web_url}">${article.headline.main}</a></h2>
                            <p>${article.snippet}</p>
                        </li>`;
                    }).join('') 
                    + '</ul>');
            } else {
                htmlContent = `<div class="error-no-articles">No articles available</div>`;
            }
            responseContainer.insertAdjacentHTML('beforeend', htmlContent);
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
