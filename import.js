// the scripts will be loaded just after this script tag
function loadScript(src) {
	document.write(`<script src="${src}"></script>`);
}

loadScript('Velegant.js')
loadScript('Vome.js')
loadScript('Dynamic.js')