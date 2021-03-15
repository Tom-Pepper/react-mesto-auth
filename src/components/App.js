import React, {useState, useEffect} from 'react';
import '../index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import api from "../utils/api";
import CurrentUserContext from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";

function App() {
  //Стейт для данных пользователя
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    api.getUserData()
      .then(res => {
        setCurrentUser(res)
      })
      .catch(err => console.log(err));
  }, [])

  //Стейты для поп-апов (состояние - открыт / не открыт)
  const [isEditAvatarPopupOpen, setIsAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);

  //Стейт для выбранной карточки, исп. в поп-апе картинки в полном размере
  const [selectedCard, setSelectedCard] = useState(null);

  //Обработчик клика по изображению карточки (открытие поп-апа картинки)
  function handleCardClick(props) {
    setSelectedCard(props);
    window.addEventListener('keydown', handleClosePopupWithEsc);
  }

  //Закрытие поп-апов клавишей Esc
  function handleClosePopupWithEsc (event) {
    if (event.keyCode === 27) {
      closeAllPopups();
    }
  }

  //Обработчик для отправки данных пользователя на сервер (редактирование данных профиля)
  function handleUpdateUser(user) {
    api.editProfile(user.name, user.about)
      .then(res => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(err => console.log(err))
  }

  //Обработчик для обновления аватарки пользователя (отправка на сервер через API)
  function handleUpdateAvatar(user) {
    api.uploadAvatar(user.avatar)
      .then(res => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(err => console.log(err))
  }

  //Обработчик кнопки редактирования аватарки
  function handleEditAvatarClick() {
    setIsAvatarPopupOpen(true);
    window.addEventListener('keydown', handleClosePopupWithEsc);
  }

  //Обработчик кнопки редактирования инф-ии профиля
  function handleEditProfileClick() {
    setIsProfilePopupOpen(true);
    window.addEventListener('keydown', handleClosePopupWithEsc);
  }

  //Обработчик кнопки добавления карточки
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
    window.addEventListener('keydown', handleClosePopupWithEsc);
  }

  //Обработчик закрытия поп-апов
  function closeAllPopups() {
    setIsAddPlacePopupOpen(false);
    setIsAvatarPopupOpen(false);
    setIsProfilePopupOpen(false);
    setSelectedCard(null);
    window.removeEventListener('keydown', handleClosePopupWithEsc);
  }

  //Стейт для карточек
  const [cards, setCards] = useState([]);

  //Получаем данные по пользователю и карточки с сервера
  useEffect(() => {
    api.getCards()
      .then(res => {
        setCards(res);
      })
      .catch((err) => console.log(err));
  }, []);

  //Функция лайка карточки
  function handleCardLike(card) {
    //Проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      // Формируем новый массив на основе имеющегося, подставляя в него новую карточку
      const newCards = cards.map((c) => c._id === card._id ? newCard : c);
      // Обновляем стейт
      setCards(newCards);
    })
      .catch(err => console.log(err));
  }

  //Функция удаления карточки, по аналогии с функцией лайка
  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards(cards.filter(item => item._id !== card._id));
      })
      .catch(err => console.log(err));
  }

  //Функция добавления карточки
  function handleAddPlace(card) {
    api.addNewCard(card.name, card.link)
      .then(res => {
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch(err => console.log(err))
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />

        <Main
          isEditAvatarPopupOpen={handleEditAvatarClick}
          isEditProfilePopupOpen={handleEditProfileClick}
          isAddPlacePopupOpen={handleAddPlaceClick}
          onCardClick={handleCardClick}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
        />

        <Footer />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          onClick={(e) => e.stopPropagation()}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlace}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <PopupWithForm
          onClose={closeAllPopups}
          name="confirm-delete"
          title="Вы уверены?"
          buttonName="Да"
        >
        </PopupWithForm>

        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
