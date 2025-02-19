import { useState, useRef, useEffect } from 'react';
import './App.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import brasCubasImg from './assets/bras_cubas.jpeg';
import Capa from './components/Capa';
import SeletorCapitulo from './components/SeletorCapitulos';
import BotoesControle from './components/BotoesControle';
import livro from './assets/capitulos/livro';
import GerenciadorFaixa from './components/GerenciadorFaixa';
import ContainerProgresso from './components/ContainerProgresso';

function App() {
  const [taTocando, setTaTocando] = useState(false);
  const [faixaAtual, setFaixaAtual] = useState(0);
  const [tempoTotalFaixa, setTempoTotalFaixa] = useState(0);
  const [tempoAtualFaixa, setTempoAtualFaixa] = useState(0);
  const tagAudio = useRef(null);
  const barraProgresso = useRef(null);

  useEffect(() => {
    if (taTocando) {
      tocarFaixa();
    }
  }, [faixaAtual]);

  const informacoesLivro = {
    nome: 'Memórias Póstulas de Brás Cubas',
    autor: 'Machado de Assis',
    totalCapitulo: 2,
    capa: brasCubasImg,
    capitulos: livro,
    textoAlternativo: 'Capa do livro Memórias Póstulas de Brás Cubas',
  };

  function tocarFaixa() {
    tagAudio.current.play();
    setTaTocando(true);
  }

  const pausarFaixa = () => {
    tagAudio.current.pause();
    setTaTocando(false);
  };

  const tocarOuPausarFaixa = () => {
    if (taTocando) {
      pausarFaixa();
    } else {
      tocarFaixa();
    }
  };

  const avancarFaixa = () => {
    if (informacoesLivro.totalCapitulo === faixaAtual + 1) {
      setFaixaAtual(0);
    } else {
      setFaixaAtual(faixaAtual + 1);
    }
  };

  const retrocederFaixa = () => {
    if (faixaAtual === 0) {
      setFaixaAtual(informacoesLivro.totalCapitulo - 1);
    } else {
      setFaixaAtual(faixaAtual - 1);
    }
  };

  const avancar15s = () => {
    tagAudio.current.currentTime += 15;
  };

  const retroceder15s = () => {
    tagAudio.current.currentTime -= 15;
  };

  const avancarPara = (event) => {
    const largura = barraProgresso.current.clientWidth;
    const novoTempo = (event.nativeEvent.offsetX / largura) * tempoTotalFaixa;
    tagAudio.current.currentTime = novoTempo;
  };

  return (
    <>
      <Capa imagemCapa={informacoesLivro.capa} textoAlternativo={informacoesLivro.textoAlternativo} />
      <SeletorCapitulo capituloAtual={faixaAtual + 1} />
      <GerenciadorFaixa
        faixa={informacoesLivro.capitulos[faixaAtual]}
        referencia={tagAudio}
        setTempoTotalFaixa={setTempoTotalFaixa}
        setTempoAtualFaixa={setTempoAtualFaixa}
      />
      <ContainerProgresso
        tempoTotalFaixa={tempoTotalFaixa}
        tempoAtualFaixa={tempoAtualFaixa}
        barraProgresso={barraProgresso}
        avancarPara={avancarPara}
      />
      <BotoesControle
        taTocando={taTocando}
        tocarOuPausarFaixa={tocarOuPausarFaixa}
        avancarFaixa={avancarFaixa}
        retrocederFaixa={retrocederFaixa}
        avancar15s={avancar15s}
        retroceder15s={retroceder15s}
      />
    </>
  );
}

export default App;
