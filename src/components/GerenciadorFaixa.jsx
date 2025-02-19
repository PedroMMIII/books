const GerenciadorFaixa = ({ faixa, referencia, setTempoTotalFaixa, setTempoAtualFaixa }) => {
  return (
    <audio
      src={faixa}
      ref={referencia}
      onLoadedMetadata={() => setTempoTotalFaixa(referencia.current.duration)}
      onTimeUpdate={() => setTempoAtualFaixa(referencia.current.currentTime)}
    />
  );
};

export default GerenciadorFaixa;
