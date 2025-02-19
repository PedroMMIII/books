function SeletorCapitulo({capituloAtual}) {
    return (
        <button className="seletor">
            <i className="bi bi-list-task"></i>
            <p>{`Capitulo ${capituloAtual}`}</p>
        </button>
    )
}

export default SeletorCapitulo