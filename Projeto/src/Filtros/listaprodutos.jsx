import { useState, useEffect } from "react";
import styles from '../styles/Home.module.css'

export default function App() {

    const [lista, setLista] = useState([]);

    useEffect(() => {
        const receberListaProdutos = async () => {
            const resposta = await fetch('https://fakestoreapi.com/products');
            const dados = await resposta.json();
            setLista(dados);
        }

        receberListaProdutos();
    }, []);

    const orderaz = () => {
        const listaaux = [...lista].sort((a,b)=> a.title.localeCompare(b.title));
        setLista(listaaux)
    }
    const orderza = () => {
        const listaaux0 = [...lista].sort((a,b)=> b.title.localeCompare(a.title));
        setLista(listaaux0)
    }
    const pricemenor = () =>{
        const listaaux1 =[...lista].sort((a,b) => a.price - b.price)
        setLista(listaaux1)
    }
    const pricemaior = () =>{
        const listaaux2 =[...lista].sort((a,b) => b.price - a.price)
        setLista(listaaux2)
    }

    return (
        <>
        <header className={styles.header}>
            <h1 className={styles.logo}>Espelunca</h1>
            </header>
            <button onClick={() => orderaz()}>AZ</button>
            <button onClick={() => orderza()}>ZA</button>
            <button onClick={() => pricemenor()}>menor</button>
            <button onClick={() => pricemaior()}>maior</button>
            <div className={styles.container}>
                {lista.map(produto => (
                    <div className={styles.cardscontainer}>
                    <div className={styles.card}>
                    <img src={produto.image} alt={produto.title} className={styles.image} />
                    <div className={styles.content}>
                        <h2 className={styles.title}>{produto.title}</h2>
                        <p className={styles.description}>{produto.description}</p>
                        <p className={styles.price}>R$ {produto.price.toFixed(2)}</p>
                        <a href="#" className={styles.button}>Comprar</a>
                    </div>
                </div>
                </div>
                ))}
            </div>
        </>
    );
}