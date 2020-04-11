import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Generos = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get('/api/genres')
      .then(res => {
        setData(res.data.data);
      });
  }, []);

  const deleteGenero = id => {
    axios
      .delete('/api/genres/' + id)
      .then(res => {
        const filtrado = data.filter(item => item.id !== id)
        setData(filtrado);
      })
  }

  const renderizaLinha = (record) => {
    return (
      <tr key={record.id}>
        <th scope='row'>{record.id}</th>
        <td>{record.name}</td>
        <td>
          <Link to={'/generos/' + record.id} className='btn btn-warning' style={{margin: '0 10px 0 0'}}>Editar</Link>
          <button className='btn btn-danger' onClick={() => deleteGenero(record.id)}>Remover</button>
        </td>
      </tr>
    )
  }

  return (
    <div className='container'>
      <div style={{margin: '15px'}}>
        <h1>Gêneros</h1>
      </div>
      <Link to='/generos/novo' className='btn btn-success' style={{margin: '10px'}}>Criar Gênero</Link>
      {
        data.length !== 0 &&
        <table className='table table-striped'>
          <thead>
            <tr>
              <th scope='col'>ID</th>
              <th scope='col'>Nome</th>
              <th scope='col'>Ações</th>
            </tr>
          </thead>
          <tbody>
            {data.map(renderizaLinha)}
          </tbody>
        </table>
      }
      {
        data.length === 0 &&
        <div className='alert alert-warning' role='alert'>
          Você não possui gêneros criados
        </div>
      }
    </div>
  )
}

export default Generos;
