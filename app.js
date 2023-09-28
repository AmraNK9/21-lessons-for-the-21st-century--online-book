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

function changeLineSpacing( lineHeight) {
	rendition.themes.register({ "body": { "color": "white"},"epub-view":{"line-height":"400"}})
	console.log("success")
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
	changeLineSpacing(lineHeight + 'px')
})
document.querySelector("#decreaseLineHeight").addEventListener("click",()=>{
	lineHeight-= 5;
	changeLineSpacing(lineHeight + 'px')
})