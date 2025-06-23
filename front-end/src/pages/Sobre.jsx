import React from "react";
import "./Sobre.css";

function Sobre() {
  return (
    <div className="sobre-container">
      <h1>Toque de Esperança</h1>

      <section className="quem-somos">
        <h2>Quem somos?</h2>
        <p>
          O <strong>Projeto Toque de Esperança</strong> nasceu da vontade de
          transformar a realidade de milhares de famílias brasileiras que vivem
          em situação de vulnerabilidade social. Somos mais do que uma
          iniciativa: somos um movimento de solidariedade que conecta quem pode
          ajudar com quem mais precisa.
        </p>
        <p>
          Acreditamos que pequenas ações podem gerar grandes mudanças. Por isso,
          criamos uma plataforma digital que aproxima doadores, ONGs e
          comunidades carentes, facilitando o acesso a alimentos, roupas, itens
          de higiene e outros recursos essenciais.
        </p>
        <p>
          Estamos juntos nessa missão de construir um Brasil mais justo, humano
          e acolhedor.
        </p>
      </section>

      <section className="objetivos">
        <h2>Objetivos</h2>
        <ul>
          <li>
            Inicialmente beneficiar diretamente <strong>2</strong> instituições
            parceiras, podendo cadastrar diversas ONGs na nossa plataforma.
          </li>
          <li>
            Atender cerca de <strong>100</strong> pessoas de forma direta,
            alcançando aproximadamente <strong>300</strong> pessoas de forma
            indireta, incluindo familiares e comunidades próximas.
          </li>
          <li>
            Estar presença em todas as regiões do Brasil, conectando doadores e
            famílias em situação de vulnerabilidade de forma rápida, segura e
            transparente.
          </li>
        </ul>
      </section>

      <section className="problema">
        <h2>Por que existimos?</h2>
        <p>
          Vivemos em um país onde milhões de pessoas ainda enfrentam
          dificuldades para garantir suas necessidades básicas. Enquanto sobra
          em algumas casas, falta em tantas outras.
        </p>
        <p>
          Segundo a PNAD Contínua (IBGE, 2022), mais de{" "}
          <strong>33 milhões de brasileiros</strong> sofrem com a insegurança
          alimentar. Além disso, toneladas de alimentos e produtos em bom estado
          são desperdiçados diariamente.
        </p>
        <p>
          O <strong>Projeto Acolher</strong> surge para combater essa
          desigualdade, unindo tecnologia, solidariedade e ação social para
          construir pontes entre quem pode doar e quem precisa receber.
        </p>
      </section>

      <section className="missao">
        <h2>Nossa Missão</h2>
        <p>
          Promover o acesso a recursos essenciais para famílias em situação de
          vulnerabilidade, por meio de uma plataforma que conecta doadores,
          voluntários e instituições sociais. Criar uma cultura de doação
          consciente, combater o desperdício e incentivar o consumo responsável.
        </p>
      </section>

      <section className="valores">
        <h2>Nossos Valores</h2>
        <ul>
          <li>
            <strong>Solidariedade:</strong> Ajudar ao próximo é um dever
            coletivo.
          </li>
          <li>
            <strong>Transparência:</strong> Garantimos que cada doação chegue a
            quem realmente precisa.
          </li>
          <li>
            <strong>Sustentabilidade:</strong> Combatemos o desperdício e
            incentivamos o reaproveitamento responsável.
          </li>
          <li>
            <strong>Tecnologia a favor da inclusão:</strong> Tornamos o processo
            de doação mais fácil e acessível.
          </li>
          <li>
            <strong>Empatia:</strong> Cada família atendida é tratada com
            respeito, dignidade e cuidado.
          </li>
        </ul>
      </section>

      <section className="acoes">
        <h2>O que fazemos na prática?</h2>
        <ul>
          <li>
            Mapeamos as necessidades reais das instituições sociais cadastradas.
          </li>
          <li>
            Facilitamos o contato entre doadores e ONGs de forma simples e
            confiável.
          </li>
          <li>
            Organizamos campanhas solidárias como Inverno Solidário e Natal sem
            Fome.
          </li>
        </ul>
      </section>

      <section className="ods">
        <h2>Objetivos de Desenvolvimento Sustentável (ODS) que trabalhamos</h2>
        <ul>
          <p>
            O <strong>Projeto Toque de Esperança</strong> contribui ativamente
            para as seguintes ODS da ONU:
          </p>
          <li>
            <strong>ODS 1:</strong> Erradicação da Pobreza: Levamos recursos
            básicos para quem mais precisa.
          </li>
          <li>
            <strong>ODS 2:</strong> Fome Zero e Agricultura Sustentável: Atuamos
            diretamente no combate à fome.
          </li>
          <li>
            <strong>ODS 12:</strong> Consumo e Produção Responsáveis:
            Incentivamos a redução de desperdícios e a redistribuição de
            recursos.
          </li>
        </ul>
      </section>

      <section className="integrantes">
        <h2>Integrantes</h2>
        <ul>
          <li>Maria Eduarda Marques Silva</li>
          <li>Júlia Gabriely Pereira Rodrigues</li>
          <li>Igor Teles Lima</li>
          <li>Luis Fernando Monteiro de Assis Lourenço</li>
          <li>Lucas Ferreira Coelho</li>
          <li>Isabelle Louzada de Araújo</li>
        </ul>
      </section>
    </div>
  );
}

export default Sobre;
