import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { Badge } from 'reactstrap';

const InfoSerie = ({ match }) => {
  const [form, setForm] = useState({
    'name': '',
    'comments': ''
  });
  const [success, setSuccess] = useState(false);
  const [data, setData] = useState({});
  const [mode, setMode] = useState('INFO');
  const [generos, setGeneros] = useState({});

  useEffect(() => {
      axios
        .get('/api/series/' + match.params.id)
        .then(res => {
          setData(res.data);
          setForm(res.data);
        });
  }, [match.params.id])

  useEffect(() => {
    axios
    .get('/api/genres')
    .then(res => {
      setGeneros(res.data.data)
    });
  }, [data]);

  // custom header
  const masterHeader = {
    height: '50vh',
    minHeight: '500px',
    backgroundImage: `url('${data.background}')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  }

  const onChange = field => evt => {
    setForm({
      ...form,
      [field]: evt.target.value
    });
  }

  const seleciona = value => () => {
    setForm({
      ...form,
      status: value
    })
  }
  
  const save = () => {
    axios.put('/api/series/' + match.params.id, form)
    .then(res => {
      setSuccess(true);
    })
  }

  if(success) {
    return <Redirect to='/series' />
  }

  return (
    <div>
      <header style={masterHeader}>
        <div className='h-100' style={{ background: 'rgba(0,0,0,0.7)'}}>
          <div className='h-100 container'>
            <div className='row h-100 align-items-center'>
              <div className='col-3'>
                <img alt={data.name} className='img-fluid img-thumbnail' src={data.poster}/>
              </div>
              <div className='col-8'>
                <h1 className='font-weight-light text-white'>{data.name}</h1>
                <div className='lead text-white'>
                  { data.status === 'ASSISTIDO' && <Badge color='success'>Assistido</Badge>}
                  { data.status === 'PARA_ASSISTIR' && <Badge color='warning'>Para assistir</Badge>}
                </div>
                <div className='text-white'>
                  <p>Gênero: {data.genre}</p>
                </div>
                <div className='text-white'>
                  {
                    data.comments !== '' &&
                    <p>Comentários: {data.comments}</p>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div>
        <button className='btn btn-primary' style={{margin: '10px'}} onClick={() => mode === 'INFO' ? setMode('EDIT') : setMode('INFO')}>{mode === 'INFO' ? 'Editar' : 'Cancelar edição'}</button>
      </div>
      {
        mode === 'EDIT' &&
        <div className='container'>
          <h1>Editar Série</h1>
          <form>
            <div className='form-group'>
              <label htmlFor='name'>Nome</label>
              <input type='text' value={form.name} onChange={onChange('name')} className='form-control' id='name' placeholder='Nome do Gênero' />
            </div>
            <div className='form-group'>
              <label htmlFor='comentario'>Comentário</label>
              <input type='text' value={form.comments} onChange={onChange('comments')} className='form-control' id='name' placeholder='Comentários' />
            </div>
            <div className='form-group'>
              <label htmlFor='generos'>Gênero</label>
              <select className='form-control' id='generos' value={form.genre_id} onChange={onChange('genre_id')}>
                { generos.map(genero => <option key={genero.id} value={genero.id}>{genero.name}</option>) }
              </select>
            </div>
            <div className='form-check form-check-inline'>
              <input className='form-check-input' type='radio' name='status' id='assistido' value='ASSISTIDO' onChange={seleciona('ASSISTIDO')} checked={form.status === 'ASSISTIDO'}/>
              <label className='form-check-label' htmlFor='assistido'>
                Assistido
              </label>
            </div>
            <div className='form-check form-check-inline'>
            <input className='form-check-input' type='radio' name='status' id='paraAssistir' value='PARA_ASSISTIR' onChange={seleciona('PARA_ASSISTIR')} checked={form.status === 'PARA_ASSISTIR'} />
              <label className='form-check-label' htmlFor='paraAssistir'>
                Para assistir
              </label>
            </div>
            <div>
              <button type='button' onClick={save} className='btn btn-success' style={{margin: '10px'}}>Salvar</button>
            </div>
          </form>
        </div>
      }
    </div>
  )
}

export default InfoSerie;
