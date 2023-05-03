import { useState } from "react";
import Img from "../public/foto.jpg";
import Image from "next/image";
import Head from "next/head";

export default function Home() {
  const [valor1, setValor1] = useState("");
  const [valor2, setValor2] = useState("");
  const [result, setResult] = useState(0);

  function mask(e, setValor) {
    let v = e.target.value;

    v = v.replace(/\D/g, "");
    v = v.replace(/(\d)(\d{8})$/, "$1.$2");
    v = v.replace(/(\d)(\d{5})$/, "$1.$2");

    v = v.replace(/(\d)(\d{2})$/, "$1,$2");

    if (v.length > 5) {
      return;
    }

    setValor(v);
  }

  function moneyToFloat(v) {
    v = v.replace(/\D/g, "");
    v = v.replace(/(\d)(\d{2})$/, "$1.$2");
    return parseFloat(v);
  }

  function handleCalc() {
    const resultDiv = moneyToFloat(valor2) / moneyToFloat(valor1);
    if (resultDiv >= 0.7) {
      setResult(1);
    } else {
      setResult(2);
    }
    setValor1("");
    setValor2("");
  }

  return (
    <main className="wrapper">
      <Head>
        <title>Conversor de Gasolina</title>
      </Head>
      <div className="bomb-photo">
        <Image src={Img} alt="celular" />
      </div>
      <div className="description">
        <div className="group-description">
          <h3 className="not-account">
            Qual combustivel está compensando usar?
          </h3>
          <p className="not-account">
            A principal diferença entre os dois combustíveis está na proporção
            entre o preço e o desempenho de cada um.
            <br /> Esta calculadora compara o preço do litro do Etanol e da
            Gasolina e mostra qual é o combustível mais vantajoso,
            financeiramente, no momento.
            <br />
            <br />
            O Etanol vale a pena quando custar até 70% do valor da Gasolina.
            <br />
          </p>
          <p className="not-account">
            Preencha os campos abaixo com os preços dos combustíveis que você
            encontra hoje nos postos e clique no botão “calcular” para saber
            qual é a melhor opção.
          </p>
        </div>
        <div className="group-input">
          <div className="group-input2">
            <h3>Qual a melhor opção?</h3>
            <h4>Calcule aqui!!</h4>
            <div className="inputs">
              <p>Etanol (preço por litro)</p>
              <input
                className="form-control"
                type="text"
                inputMode="numeric"
                onChange={(event) => mask(event, setValor2)}
                value={valor2}
                id="Preco1"
                placeholder="R$ 0.00"
              />
            </div>
            <div className="inputs">
              <p>Gasolina (preço por litro)</p>
              <input
                className="form-control2"
                type="text"
                inputMode="numeric"
                onChange={(event) => mask(event, setValor1)}
                value={valor1}
                id="Preco2"
                placeholder="R$ 0.00"
              />
            </div>
            <button className="botao" onClick={handleCalc}>
              Calcular
            </button>
          </div>

          <div className="group-input3">
            {result == 1 && (
              <div className="message1">
                <h2>Vale mais a pena usar Gasolina!!!</h2>
              </div>
            )}
            {result == 2 && (
              <div className="message2">
                <h2>Vale mais a pena usar Etanol!!!</h2>
              </div>
            )}

            <h3>Entenda como o cálculo é feito</h3>
            <p>Dividimos o valor do litro do Etanol pelo da Gasolina.</p>
            <br />
            <p>
              Quando o resultado é menor que 0,7, a recomendação é abastecer com
              Etanol. Se maior, a recomendação é escolher a Gasolina.
            </p>
            <br />
            <p>
              {" "}
              <b>Exemplo:</b> se o Etanol custa R$ 3,29 e a Gasolina R$ 4,92, o
              resultado da divisão do primeiro pelo segundo é 0,67, menor que
              0,7. Portanto, é mais vantajoso abastecer com Etanol.
            </p>
            <br />
          </div>
        </div>
      </div>
    </main>
  );
}
