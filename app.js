import * as epubjs from "./node_modules/epubjs/dist/epub.js";
// Define the URL of the EPUB file you want to display
const epubUrl = "book.epub";
const viewerElement = document.getElementById("area");

// Load the EPUB file
const book = ePub(epubUrl);
const rendition = book.renderTo(viewerElement, {});
const displayed = rendition.display();

function nextPage() {
	rendition.next();
}

function prevPage() {
	rendition.prev();
}

function changeFontSize(fontSize) {
	rendition.themes.fontSize(fontSize);
}

function changeLineHeight(lineHeight) {
    rendition.themes.default({
		h2: {
		  'font-size': '32px',
		  color: 'purple'
		},
		p: {
		  "margin": '10px',
		  "line-height":lineHeight
		}
	  });
  }
  
  

let fontSize = 16;
const increaseFontSizeButton = document.getElementById(
	"increaseFontSizeButton"
);
increaseFontSizeButton.addEventListener("click", () => {
	fontSize += 4;
	changeFontSize(fontSize + "px");
});
const decreaseFontSizeButton = document.getElementById(
	"decreaseFontSizeButton"
);
decreaseFontSizeButton.addEventListener("click", () => {
	fontSize -= 4;
	changeFontSize(fontSize + "px");
});

const nextButton = document.getElementById("nextButton");
nextButton.addEventListener("click", nextPage);

const prevButton = document.getElementById("prevButton");
prevButton.addEventListener("click", prevPage);

let lineHeight = 10
document.querySelector("#increaseLineHeight").addEventListener("click",()=>{
	lineHeight+= 5;
	changeLineHeight(lineHeight + 'px')
})
document.querySelector("#decreaseLineHeight").addEventListener("click",()=>{
	lineHeight-= 5;
	changeLineHeight(lineHeight + 'px')
})

book.loaded.navigation.then(function(toc){
	var $nav = document.getElementById("toc"),
		docfrag = document.createDocumentFragment();
	var addTocItems = function (parent, tocItems) {
	  var $ul = document.createElement("ul");
	  tocItems.forEach(function(chapter) {
		var item = document.createElement("li");
		item.classList.add("opcion-con-desplegable")
		var link = document.createElement("a");
		link.textContent = chapter.label;
		link.href = chapter.href;
		item.appendChild(link);

		if (chapter.subitems) {
		  addTocItems(item, chapter.subitems)
		}

		link.onclick = function(){
		  var url = link.getAttribute("href");
		  rendition.display(url);
		  return false;
		};

		$ul.appendChild(item);
	  });
	  parent.appendChild($ul);
	};

	addTocItems(docfrag, toc);

	$nav.appendChild(docfrag);

	if ($nav.offsetHeight + 60 < window.innerHeight) {
	  $nav.classList.add("fixed");
	}

  });