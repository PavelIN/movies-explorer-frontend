import React from 'react';
import './NavTab.css';

function NavTab() {
  return (
    <section className='navigation-tab'>
      <nav className='navigation__container-tab'>
        <ul className='navigation__list'>
          <li className='navigation__item'>
            <a href='#about' className='navigation__link'>
              О проекте
            </a>
          </li>
          <li className='navigation__item'>
            <a href='#techs' className='navigation__link'>
              Технологии
            </a>
          </li>
          <li className='navigation__item'>
            <a href='#student-me' className='navigation__link'>
              Студент
            </a>
          </li>
        </ul>
      </nav>
    </section>
  );
}

export default NavTab;