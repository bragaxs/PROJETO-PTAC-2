import { useState } from "react";
import { useNavigate } from 'react-router-dom';

export default function Registrar() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const navigation = useNavigate();

  const registrarPessoa = async(event) =>{
    event.preventDefault();
    try {
      const resposta = await fetch('http://localhost:3000/usuarios',{
          method: 'POST',
          headers: {'Content-type': 'Application/json'},
          body: JSON.stringify({
            nome: nome,
            email: email
          })
      });

      if (resposta.ok) {
        navigation('/')
      }

    } catch{
      alert('Ocorreu um erro na aplicação!');
    }
  }

  return (
        <main>
          <form onSubmit={registrarPessoa}>
            <input type="text" name="" id="" placeholder="Nome"   value={nome} onChange={(event=> setNome(event.target.value))}/>
            <input type="email" name="" id=""  placeholder="Email" value={email} onChange={(event)=> setEmail(event.target.value)}/>
            <button>Salvar</button>
          </form>
        </main>
  );
}