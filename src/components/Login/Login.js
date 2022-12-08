import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';
import { useEffect, useState } from 'react';

import './Login.css';

const Login = ({ }) => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [emailDirty, setEmailDirty] = useState(false)
  const [passwordDirty, setPasswordDirty] = useState(false)

  const [emailError, setEmailError] = useState('Емеил не может быть пустым')
  const [passwordError, setPasswordError] = useState('Пароль не может быть пустым')

  const[FormValid,setFormValid]=useState(false)

  useEffect( () => {
    if(emailError||passwordError){
      setFormValid(false)
    }else{
      setFormValid(true)
    }
  },[emailError,passwordError])

const eamailHeandler = (e) =>{
    setEmail(e.target.value)
    let regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
    if(!regex.test(String(e.target.value).toLowerCase())){
       setEmailError('Некоректный емеил')
    } else{
      setEmailError('')
    }
}

const passwordHeandler =(e)=>{
  setPassword(e.target.value)
  if(e.target.value.length < 6 || e.target.value.length > 30){
    setPasswordError('Пароль должен быть длинее 6 и меньше 30 символов')
     if(!e.target.value){
      setPasswordError('Пароль не может быть пустым')
     }
  } else{
    setPasswordError('')
  }
}

  const blur = (e) => {
    // eslint-disable-next-line default-case
    switch (e.target.name) {
      case 'email':
        setEmailDirty(true)
        break
      case 'password':
        setPasswordDirty(true)
        break
    }
  }

  return (
    <div className='login__container'>
      <div className='login__header'>
        <Link to='/'>
          <img
            src={logo}
            alt='Логотип'
            className='login__logo'
          />
        </Link>

        <h1 className='login__title'>Рады видеть!</h1>
      </div>

      <form className='login__form form' >
        <label className='login__label' htmlFor='email'>E-mail</label>
        <input
          className='login__input'
          type='email'
          id='email'
          name='email'
          onBlur={e => blur(e)}
          value={email}
          onChange = {e=>eamailHeandler(e)}
        />
        {(emailDirty && emailError) && <span className='register__error'>{emailError}</span>}
        <label className='login__label' htmlFor='password'>Пароль</label>
        <input
          className='login__input'
          type='password'
          id='password'
          name='password'
          onBlur={e => blur(e)}
          value={password}
          onChange = {e=>passwordHeandler(e)}
        />
        {(passwordDirty && passwordError) && <span className='register__error'>{passwordError}</span>}
        <button disabled={!FormValid} className='login__button' type='submit'>Войти</button>
      </form>
      <div className='login__bottom'>
        <span>Ещё не зарегистрированы?</span>
        <Link to='signup' className='login__link'>Регистрация</Link>
      </div>
    </div>
  )
};

export default Login;