// import  from "./node_modules/epubjs/dist/epub.js"; 
// import { Layout } from "./node_modules/epubjs/dist/epub.legacy.js";

import * as epubjs from "./node_modules/epubjs/dist/epub.js";
var params = URLSearchParams && new URLSearchParams(document.location.search.substring(1));
var url = params && params.get("url") && decodeURIComponent(params.get("url"));
var currentSectionIndex = (params && params.get("loc")) ? params.get("loc") : undefined;

// Load the opf
var book = ePub(url || "book.epub");
var rendition = book.renderTo("area", {
	// manager: "continuous",
	flow: "scrolled",
	width: "100%",
	height: "100%"
  });
var displayed = rendition.display(currentSectionIndex);


displayed.then(function(renderer){
  // -- do stuff
});

// Navigation loaded
book.loaded.navigation.then(function(toc){
  // console.log(toc);
});



//   rendition.layout({flow:"scrolled"})
rendition.themes.default({

	body:{
		"overflow-x":"hidden",
		// "background-color":"#111"
	},
	h2: {
		"font-size": "32px",
		color: "purple",
	},
	p: {
		margin: "10px",
		"line-height": "35px",
		// "color":"#fff"
	},
});
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
			"font-size": "32px",
			color: "purple",
		},
		p: {
			margin: "10px",
			"line-height": lineHeight,
		},
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

let lineHeight = 35;
document.querySelector("#increaseLineHeight").addEventListener("click", () => {
	lineHeight += 5;
	changeLineHeight(lineHeight + "px");
});
document.querySelector("#decreaseLineHeight").addEventListener("click", () => {
	lineHeight -= 5;
	changeLineHeight(lineHeight + "px");
});

book.loaded.navigation.then(function (toc) {
	var $nav = document.getElementById("toc"),
		docfrag = document.createDocumentFragment();
	var addTocItems = function (parent, tocItems) {
		var $ul = document.createElement("ul");
		tocItems.forEach(function (chapter) {
			var item = document.createElement("li");
			item.classList.add("opcion-con-desplegable");
			var link = document.createElement("a");
			link.textContent = chapter.label;
			link.href = chapter.href;
			link.className += " block p-2 hover:bg-gray-700 flex items-center";
			item.appendChild(link);

			if (chapter.subitems) {
				addTocItems(item, chapter.subitems);
			}

			link.onclick = function () {
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

book.loaded.metadata.then(function(meta){
	var $title = document.getElementById("title");
	var $author = document.getElementById("author");
	var $cover = document.getElementById("cover");

	$title.textContent = meta.title;
	$author.textContent = meta.creator;
	if (book.archive) {
	  book.archive.createUrl(book.cover)
		.then(function (url) {
		  $cover.src = url;
		})
	} else {
	  $cover.src = book.cover;
	}

  });

document.getElementById("menu").addEventListener("click", () => {
	// if(window.outerWidth > 800){
	// 	document.querySelector(".container1").classList.toggle("margin")
	// }
	document.querySelector("aside").classList.toggle("hide");
});

let children = document.querySelector("aside").children;
let firstchild = document.querySelector("aside").firstElementChild;

let showMenu =function() {


	// Convert children to an array and iterate
	Array.from(children).forEach((value) => {
		if (value === firstchild) {
			console.log("first", value);
		} else {
			console.log("not first", value);
			value.style.display = "none";
		}
		document.querySelector("#toc").style.display = "block";
	});
}

let showSetting = function () {


	// Convert children to an array and iterate
	Array.from(children).forEach((value) => {
		if (value === firstchild) {
			console.log("first", value);
		} else {
			console.log("not first", value);
			value.style.display = "none";
		}
		document.querySelector("#setting").style.display = "block";
	});
}

let showDownload = function () {
	Array.from(children).forEach((value) => {
		if (value === firstchild) {
			console.log("first", value);
		} else {
			console.log("not first", value);
			value.style.display = "none";
		}
		document.querySelector("#download-content").style.display = "block";
	});
}

let showInfo = function (){
	Array.from(children).forEach((value) => {
		if (value === firstchild) {
			console.log("first", value);
		} else {
			console.log("not first", value);
			value.style.display = "none";
		}
		document.querySelector("#info-content").style.display = "block";
	});
}
document.getElementById("setting-btn").addEventListener('click',()=>{
	showSetting()
})

document.getElementById("show-menu").addEventListener('click',()=>{
	showMenu()
})

document.getElementById("download").addEventListener("click",()=>{
	showDownload()
})

document.getElementById("info").addEventListener("click",()=>{
	showInfo()
})
showMenu()

document.addEventListener("DOMContentLoaded",()=>{
	setTimeout(
		()=>{
			const loaderContainer = document.querySelector('.loader-container');
			loaderContainer.parentNode.removeChild(loaderContainer);
		},
		1000
	)

})