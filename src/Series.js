import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Badge } from 'reactstrap';

const Series = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get('/api/series')
      .then(res => {
        setData(res.data.data);
      });
  }, []);

  const deleteSerie = id => {
    axios
      .delete('/api/series/' + id)
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
          { record.status === 'ASSISTIDO' && <Badge color='success'>Assistido</Badge>}
          { record.status === 'PARA_ASSISTIR' && <Badge color='warning'>Para assistir</Badge>}
        </td>
        <td><Badge color='info'>{record.genre}</Badge></td>
        <td>
          <Link to={'/series/' + record.id} className='btn btn-warning' style={{margin: '0 10px 0 0'}}>Info</Link>
          <button className='btn btn-danger' onClick={() => deleteSerie(record.id)}>Remover</button>
        </td>
      </tr>
    )
  }

  // if(data.length === 0) {
  //   return (
  //     <div className='container'>
  //       <h1>Séries</h1>
  //       <Link to='/series/nova' className='btn btn-primary' style={{margin: '10px'}}>Nova Série</Link>
        
  //     </div>
  //   );
  // }

  return (
    <div className='container'>
      <div style={{margin: '15px'}}>
        <h1>Séries</h1>
      </div>
      <Link to='/series/nova' className='btn btn-success' style={{margin: '10px'}}>Criar Série</Link>
      {
        data.length === 0 &&
        <div className='alert alert-warning' role='alert'>
          Você não possui séries criadas
        </div>
      }
      {
        data.length !== 0 &&
        <table className='table table-striped'>
          <thead>
            <tr>
              <th scope='col'>ID</th>
              <th scope='col'>Nome</th>
              <th scope='col'>Status</th>
              <th scope='col'>Gênero</th>
              <th scope='col'>Ações</th>
            </tr>
          </thead>
          <tbody className='align-items-center'>
            {data.map(renderizaLinha)}
          </tbody>
        </table>
      }
    </div>
  )
}

export default Series;
