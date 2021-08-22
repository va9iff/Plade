// the scripts will be loaded just after this script tag
function loadScript(src) {
	document.write(`<script src="${src}"></script>`);
}

loadScript('Vome.js')
loadScript('Velegant.js')
loadScript('Dynamic.js')
