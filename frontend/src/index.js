function navegarViaAjax(url, seletor, push = true) {
    if (!url || !seletor) return
    const elemento = document.querySelector(seletor)
    fetch(url)
        .then(resp =>resp.text())
        .then(html => {
            elemento.innerHTML = html
            if (push) {
                history.pushState({ seletor }, null, url)
            }
        })
}

document.querySelectorAll('[got-link]').forEach(link => {
    const url = link.attributes['got-link'].value
    const seletorDestino = link.attributes['got-destino'].value

    link.onclick = e => {
        e.preventDefault()
        navegarViaAjax(url, seletorDestino)
    }
})

window.onpopstate = e => {
    if (e.state) {
        navegarViaAjax(window.location.href, e.state.seletor, false)
    }
}