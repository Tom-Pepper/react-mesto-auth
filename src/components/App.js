import React, { useState, useEffect } from 'react';
import { Route, Switch, useHistory, withRouter } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import CurrentUserContext from "../contexts/CurrentUserContext";
import { register, login, getData } from '../utils/auth';
import api from "../utils/api";

import '../index.css';
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import Error from "./Error";

function App() {
  // Хуки

  // Стейт для данных пользователя
  const [currentUser, setCurrentUser] = useState({});

  // Cтейт для авторизации
  const [loggedIn, setLoggedIn] = useState(false);

  // Стейт для отображения InfoTooltip'а
  const [isTooltipOpened, setIsTooltipOpened] = useState(false);

  // Стейт для авторизации
  const [isAuth, setIsAuth] = useState(false);

  // Стейт для карточек
  const [cards, setCards] = useState([]);

  // Стейты для поп-апов (состояние - открыт / не открыт)
  const [isEditAvatarPopupOpen, setIsAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);

  // Стейт для выбранной карточки, исп. в поп-апе картинки в полном размере
  const [selectedCard, setSelectedCard] = useState(null);

  //Стейт для данных залогиненного пользователя
  const [userLoginData, setUserLoginData] = useState('');

  const history = useHistory();

  // Получение данных о пользователе
  useEffect(() => {
    api.getUserData()
      .then(res => {
        setCurrentUser(res)
      })
      .catch(err => console.log(err));
  }, []);

  // Получаем карточки с сервера
  useEffect(() => {
    api.getCards()
      .then(res => {
        setCards(res);
      })
      .catch((err) => console.log(err));
  }, []);

  // Обработчики

  // Обработчик клика по изображению карточки (открытие поп-апа картинки)
  function handleCardClick(props) {
    setSelectedCard(props);
    window.addEventListener('keydown', handleClosePopupWithEsc);
  }

  // Закрытие поп-апов клавишей Esc
  function handleClosePopupWithEsc (event) {
    if (event.keyCode === 27) {
      closeAllPopups();
    }
  }

  // Показ/скрытие модалки об успешной/ неудачной регистрации
  function openRegModal() {
    setIsTooltipOpened(!isTooltipOpened);
  }

  // Закрытие модалки об успешной/ неудачной регистрации с помощью кнопки (крестик)
  function closeRegModal() {
    setIsTooltipOpened(false);
    if (isAuth) {
      history.push('/sign-in')
    }
  }

  // Обработчик для отправки данных пользователя на сервер (редактирование данных профиля)
  function handleUpdateUser(user) {
    api.editProfile(user.name, user.about)
      .then(res => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(err => console.log(err))
  }

  // Обработчик для обновления аватарки пользователя (отправка на сервер через API)
  function handleUpdateAvatar(user) {
    api.uploadAvatar(user.avatar)
      .then(res => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(err => console.log(err))
  }

  // Обработчик кнопки редактирования аватарки
  function handleEditAvatarClick() {
    setIsAvatarPopupOpen(true);
    window.addEventListener('keydown', handleClosePopupWithEsc);
  }

  // Обработчик кнопки редактирования инф-ии профиля
  function handleEditProfileClick() {
    setIsProfilePopupOpen(true);
    window.addEventListener('keydown', handleClosePopupWithEsc);
  }

  // Обработчик кнопки добавления карточки
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
    window.addEventListener('keydown', handleClosePopupWithEsc);
  }

  // Обработчик закрытия поп-апов
  function closeAllPopups() {
    setIsAddPlacePopupOpen(false);
    setIsAvatarPopupOpen(false);
    setIsProfilePopupOpen(false);
    setSelectedCard(null);
    window.removeEventListener('keydown', handleClosePopupWithEsc);
  }

  // Регистрация и авторизация пользователя

  /**
   * Регистрация нового пользователя
   * @param data - введенные человеком логин и пароль
   */
  const handleRegister = (data) => {
    const { email, password } = data;
    return register(email, password)
      .then((res) => {
        if (res.data) {
          setIsAuth(true);
          openRegModal();
        }
      })
      .catch((err) => {
        setIsAuth(false);
        openRegModal();
        console.log(`Произошла ошибка: ${err}`);
        history.push('/sign-up');
      });
  };

  /**
   * Авторизация пользователя
   * @param data - введенные человеком логин и пароль
   */
  const handleLogin = (data) => {
    const { email, password } = data;
    return login(email, password)
      .then((res) => {
        if (res) {
          setLoggedIn(true);
          setIsAuth(true);
          history.push('/');
          localStorage.setItem('jwt', res.token);
        }
      })
      .catch((err) => {
        setIsTooltipOpened(true);
        console.log(`Произошла ошибка: ${err}`);
      });
  };

  useEffect(() => {
    if (localStorage.getItem('jwt')) {
      const jwt = localStorage.getItem('jwt');

      getData(jwt)
        .then((res) => {
          if(res) {
            setLoggedIn(true);
            setUserLoginData(res.data.email);
          }
        })
        .catch((err) => {
          setIsTooltipOpened(true);
          console.log(`Произошла ошибка: ${err}`);
        });
    }
  }, [history]);

  useEffect(() => {
    if(loggedIn) {
      history.push('/');
    }
  }, []);

  /**
   * Логаут пользователя
   */
  const handleLogout = () => {
    localStorage.removeItem('jwt');
    setIsAuth(false);
  };

  // Функциональности приложения

  /**
   * Функция лайка карточки
   * @param card - текущая карточка
   */
  function handleCardLike(card) {
    // Проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      // Формируем новый массив на основе имеющегося, подставляя в него новую карточку
      const newCards = cards.map((c) => c._id === card._id ? newCard : c);
      // Обновляем стейт
      setCards(newCards);
    })
      .catch((err) => console.log(err));
  }

  // Функция удаления карточки, по аналогии с функцией лайка
  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards(cards.filter(item => item._id !== card._id));
      })
      .catch((err) => console.log(err));
  }

  // Функция добавления карточки
  function handleAddPlace(card) {
    api.addNewCard(card.name, card.link)
      .then(res => {
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  /**
   * Отрисовка приложения
   */
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">

        <Switch>
          <ProtectedRoute
            exact path="/"
            loggedIn={loggedIn}
            component={Main}
            isEditAvatarPopupOpen={handleEditAvatarClick}
            isEditProfilePopupOpen={handleEditProfileClick}
            isAddPlacePopupOpen={handleAddPlaceClick}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            logout={handleLogout}
            userLoginData={userLoginData}
          />
          <Route path="/sign-in">
            <Login handleLogin={handleLogin} />
          </Route>
          <Route path="/sign-up">
            <Register handleRegister={handleRegister} />
          </Route>
          <Route path="*">
            <Error />
          </Route>
        </Switch>

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
        <InfoTooltip
          isOpen={isTooltipOpened}
          onClose={closeRegModal}
          isRegSuccess={isAuth}
          regSuccess="Вы успешно зарегестрировались!"
          regFailed="Что-то пошло не так! Попробуйте ещё раз."
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default withRouter(App);
