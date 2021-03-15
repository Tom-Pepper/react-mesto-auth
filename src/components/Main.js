import React, {useContext} from 'react';
import Card from './Card';
import CurrentUserContext from "../contexts/CurrentUserContext";

function Main({ isEditAvatarPopupOpen, isEditProfilePopupOpen, isAddPlacePopupOpen, onCardClick, cards, onCardLike,
                onCardDelete }) {
  //Подписка на контекст CurrentUserContext
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__wrapper">
          <div className="profile__avatar-wrapper" onClick={isEditAvatarPopupOpen}>
            <button type="button" className="profile__avatar-edit-button"></button>
            <img className="profile__avatar" src={`${currentUser.avatar}`} alt="Аватар пользователя" />
          </div>
          <div className="profile__info">
            <h1 className="profile__info-name">{currentUser.name}</h1>
            <p className="profile__info-job">{currentUser.about}</p>
            <button type="button" className="profile__edit-button" onClick={isEditProfilePopupOpen}></button>
          </div>
        </div>
        <button type="button" className="profile__add-button" onClick={isAddPlacePopupOpen}></button>
      </section>
      <section className="elements">
        {
          cards.map(card => (
            <Card
              card={card}
              key={card._id}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))
        }
      </section>
    </main>
  );
}

export default Main;
