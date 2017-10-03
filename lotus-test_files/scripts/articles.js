$(function(){

	const articlesNum=10;
	const parentBlock = $(".js-fill-by-articles");

	getNArticles(articlesNum);
	
	function articleTemplate(data) {
		return ("<div class='article-block'><div class='article-block__header'>" + data.title + "</div>" +
			"<div class='article-block__text'>" + data.body + "</div></div>");
	}

	function addLoader(parentEl) {
		if($(parentEl).find(".loader").length == 0) {
			const loader = $("<div class='loader'></div>");
			loader.appendTo(parentEl);
		}
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
				    let result = '';
				    const buildResult = () => {
				    	filteredData.forEach(function(ele){
				    		result = result + articleTemplate(ele);
					    })
					    return result;
				    };

					async function showResult() {
					  try {
					    let articles = await buildResult();
					    removeLoader(parentBlock);
				    	$(articles).appendTo(parentBlock);
					  } catch(e) {
					    setTimeout(getNArticles(articlesNum), 1500);
					  }
					}
					showResult();
			    },
			    error: function() {
			    	setTimeout(getNArticles(articlesNum), 1500);
			    }
			})
	}
})
