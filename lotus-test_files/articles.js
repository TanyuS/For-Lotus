$(function(){

	const articlesNum=10;
	const parentBlock = $(".js-fill-by-articles");
	
	function articleTemplate(data) {
		return ($("<div class='article-block'>" +
			"<div class='article-block__title'>" + data.title + "</div>" +
			"<div class='article-block__text'>" + data.body + "</div>" +
			"</div>"));
	}

	function addLoader(parentEl) {
		const loader = $("<div class='loader'></div>");
		loader.appendTo(parentEl);
	}
	function removeLoader(parentEl) {
		parentEl.find(".loader").remove();
	}

	function getNArticles(n) {
		$.ajax({
				url: "https://jsonplaceholder.typicode.com/posts/",
				method: "GET",
				beforeSend: function() {
					addLoader(parentBlock);
				},
				success: function(data) {
				    const filteredData = data.slice(0, n).reverse();
				    let promises = [];
				    let result = '';
			    	filteredData.forEach(ele) {
			    		promises.push(
			    			result = result + articleTemplate(ele);
		    			);
				    }
				    Promise.all(promises).then(() => {
				    	removeLoader(parentBlock);
				    	result.appendTo(parentBlock);
				    });
					)
			    },
			    error: function() {
			    	setTimeout(getNArticles(articlesNum), 1500);
			    }
			})
	}
})


/*
.loader {
	border: 5px solid #f3f3f3;
	border-radius: 50%;
	border-top: 5px solid #009900;
	border-right: 5px solid #00cc00;
	border-bottom: 5px solid #003300;
	border-left: 5px solid #006600;
	width: 25px;
	height: 25px;
	-webkit-animation: spin 2s linear infinite;
	animation: spin 2s linear infinite;
	margin: 15px auto;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

*/