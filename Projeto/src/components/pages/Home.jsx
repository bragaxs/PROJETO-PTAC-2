import { useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

export default function Home() {
  const [usuarios, setUsuarios] = useState([]);
  const [usuariosFiltrados, setUsuariosFiltrados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtroNome, setFiltroNome] = useState('');
  const [filtroEmail, setFiltroEmail] = useState('');

  useEffect(() => {
    const buscarUsuario = async () => {
      try {
        const resposta = await fetch("http://localhost:3000/usuarios");
        const dados = await resposta.json();
        setUsuarios(dados);
        setUsuariosFiltrados(dados);
      } catch {
        alert('Ocorreu um erro no app!');
      } finally {
        setLoading(false);
      }
    };
    buscarUsuario();
  }, []);

  const aplicarFiltros = () => {
    let filtrado = usuarios;

    if (filtroNome) {
      filtrado = filtrado.filter(usuario => 
        usuario.nome.toLowerCase().includes(filtroNome.toLowerCase())
      );
    }

    if (filtroEmail) {
      filtrado = filtrado.filter(usuario => 
        usuario.email.toLowerCase().includes(filtroEmail.toLowerCase())
      );
    }

    setUsuariosFiltrados(filtrado);
  };

  const removerpessoa = async (id) => {
    const confirmar = window.confirm("Tem certeza que deseja remover este usuário?");
    if (confirmar) {
      try {
        await fetch('http://localhost:3000/usuarios/' + id, {
          method: 'DELETE',
        });
        setUsuarios(usuarios.filter(usuario => usuario.id !== id));
        aplicarFiltros();
      } catch {
        alert('Falha');
      }
    }
  };

  const exportarPDF = () => {
    const doc = new jsPDF();
    const tabela = usuariosFiltrados.map(usuario => [
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

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Filtrar por nome"
          value={filtroNome}
          onChange={(e) => { setFiltroNome(e.target.value); aplicarFiltros(); }}
        />
        <input
          type="email"
          placeholder="Filtrar por e-mail"
          value={filtroEmail}
          onChange={(e) => { setFiltroEmail(e.target.value); aplicarFiltros(); }}
        />
      </div>

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
          {usuariosFiltrados.map((usuario) => (
            <tr key={usuario.id}>
              <td>{usuario.nome}</td>
              <td>{usuario.email}</td>
              <td>
                <button 
                  onClick={() => removerpessoa(usuario.id)} 
                  aria-label={`Remover ${usuario.nome}`}
                >
                  X
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
