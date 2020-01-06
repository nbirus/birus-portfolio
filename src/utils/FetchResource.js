const srcMap = {
	script: getScript,
	style: getStyle,
}

export default function(src, type, id) {
	if (document.getElementById(id)) {
		return Promise.resolve()
	}
	return srcMap[type](src, id)
}

function getScript(src, id) {
	return new Promise(resolve => {
		let script = document.createElement('script')
		script.onload = () => {
			resolve()
		}
		script.async = true
		script.id = id
		script.src = src
		document.head.appendChild(script)
	})
}
function getStyle(src, id) {
	return new Promise(resolve => {
		let script = document.createElement('link')
		script.onload = () => {
			resolve()
		}
		script.async = true
		script.href = src
		script.id = id
		script.type = 'text/css'
		script.rel = 'stylesheet'
		document.head.appendChild(script)
	})
}
