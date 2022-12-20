import React from 'react';
import './AboutMe.css';
import photo from '../../images/0000.jpg';

const AboutMe = () => {
    return (
        <div className='about-me' id="student-me">
            <h2 className='about-me__title'>Студент</h2>
            <div className='about-me__content'>
                <div className='about-me__info'>
                    <span className='about-me__name'>Павел</span>
                    <span className='about-me__job'>Фронтенд-разработчик, 26 лет</span>
                    <span className='about-me__bio'>
                        Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена
                        и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. 
                        С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, 
                        начал заниматься фриланс-заказами и ушёл с постоянной работы.
                    </span>
                    <a className='about-me__link' href='https://vk.com/oranlo' target='_blank' rel='noreferrer'>Вконтакте</a>
                    <a className='about-me__link' href='https://github.com/PavelIN' target='_blank' rel='noreferrer'>Github</a>
                </div>
                <img
                    className='about-me__photo'
                    src={photo}
                    alt='Мое фото'
                />
            </div>
        </div>
    )
};

export default AboutMe;