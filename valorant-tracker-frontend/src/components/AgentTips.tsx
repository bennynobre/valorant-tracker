import { tipsData } from '../data/tipsData';
import { TipsWrapper, TipsList, CompsList, CompItem } from '../styles/AgentTips.styles';

interface AgentTipsProps {
  agentName: string;
}

const AgentTips: React.FC<AgentTipsProps> = ({ agentName }) => {
  const tips = tipsData.get(agentName);

  if (!tips) {
    return null;
  }

  return (
    <TipsWrapper>
      <h5>Dicas para {agentName}</h5>
      <TipsList>
        {tips.general.map((tip, index) => (
          <li key={index}>{tip}</li>
        ))}
      </TipsList>

      <h5>Exemplos de Composições no Competitivo</h5>
      <CompsList>
        {tips.comps.map((comp, index) => (
          <CompItem key={index}>
            <strong>{comp.mapa}:</strong> {comp.composicao.join(', ')}
          </CompItem>
        ))}
      </CompsList>
    </TipsWrapper>
  );
};

export default AgentTips;