import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

const NovaSerie = () => {
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({});
  const [generos, setGeneros] = useState([]);

  const onChange = field => evt => {
    setForm({
      ...form,
      [field]: evt.target.value
    });
  }

  useEffect(() => {
    axios
    .get('/api/genres')
    .then(res => {
      setGeneros(res.data.data);
    });
  }, []);

  const save = () => {
    axios.post('/api/series', form)
    .then(res => {
      setSuccess(true);
    })
  }

  if(success) {
    return <Redirect to='/series'/>
  }

  const seleciona = value => () => {
    setForm({
      ...form,
      status: value
    })
  }

  return (
    <div className='container'>
      <h1>Nova Série</h1>
      <form noValidate>
        <div className='form-group'>
          <label htmlFor='name'></label>
          <input type='text' onChange={onChange('name')} className='form-control' id='name' placeholder='Nome' required />
        </div>
        <div className='form-group'>
          <label htmlFor='comentario'>Comentário</label>
          <input type='text' onChange={onChange('comments')} className='form-control' id='name' placeholder='Comentários' />
        </div>
        <div className='form-group'>
          <label htmlFor='generos'>Gênero</label>
          <select className='form-control' id='generos' onChange={onChange('genre_id')}>
            <option value="">Selecione...</option>
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
          <button type="button" onClick={save} className="btn btn-success" style={{margin: '10px'}}>Salvar</button>
        </div>
      </form>
    </div>
  )
}

export default NovaSerie;
