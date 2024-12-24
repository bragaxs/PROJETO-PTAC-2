import { useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

export default function Home() {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const buscarUsuario = async () => {
      try {
        const resposta = await fetch("http://localhost:3000/usuarios");
        const dados = await resposta.json();
        setUsuarios(dados);
      } catch {
        alert('Ocorreu um erro no app!');
      }
    };
    buscarUsuario();
  }, []);

  const removerpessoa = async (id) => {
    try {
      await fetch('http://localhost:3000/usuarios/' + id, {
        method: 'DELETE',
      });
    } catch {
      alert('Falha');
    }
  };

  const exportarPDF = () => {
    const doc = new jsPDF();
    const tabela = usuarios.map(usuario => [
      usuario.nome,
      usuario.email
    ]);
    doc.text("Lista de Usuarios,", 10, 10);
    doc.autoTable({
      head: [["Nome", "E-mail"]],
      body: tabela
    });
    doc.save("alunos.pdf");
  };

  return (
    <div>
      <button onClick={() => exportarPDF()}>Gerar PDF</button>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario.id}>
              <td>{usuario.nome}</td>
              <td>{usuario.email}</td>
              <td>
                <button onClick={() => removerpessoa(usuario.id)}>X</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
