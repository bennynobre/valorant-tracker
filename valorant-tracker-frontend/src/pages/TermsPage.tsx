import { useNavigate } from 'react-router-dom';
import { 
  TermsWrapper, 
  TermsBox, 
  AcceptButton 
} from '../styles/TermsPage.styles';

function TermsPage() {
  const navigate = useNavigate();

  const handleAccept = () => {
    localStorage.setItem('termsAccepted', 'true');
    navigate('/');
  };

  return (
    <TermsWrapper>
      <TermsBox>
        <h1>Termos de Uso</h1>
        <p>
          Este projeto, "Valorant Tracker", é uma aplicação desenvolvida exclusivamente para fins educacionais e de demonstração.
        </p>
        <p>
          O objetivo é praticar e exibir habilidades de desenvolvimento web, incluindo o consumo de APIs públicas. Nenhuma informação pessoal é coletada ou armazenada. O projeto não possui fins lucrativos e não é afiliado ou endossado pela Riot Games.
        </p>
        <AcceptButton onClick={handleAccept}>
          Eu entendo e aceito os termos
        </AcceptButton>
      </TermsBox>
    </TermsWrapper>
  );
}

export default TermsPage;