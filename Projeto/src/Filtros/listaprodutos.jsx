/* eslint-disable react/prop-types */
import styles from '../styles/listaprodutos.module.css'

export default function listaprodutos({ produtos }) {
  return (
    <>
      <ul className={styles.bloco}>
        {produtos.map(produto => (
          <li key={produto.id}>
            <h2>{produto.title}</h2>
            <p>{produto.description}</p>
            <p>Preço: {produto.price}</p>
            <img src={produto.image} alt={produto.title} width={100} />
          </li>
        ))}
      </ul>
    </>
  );
}