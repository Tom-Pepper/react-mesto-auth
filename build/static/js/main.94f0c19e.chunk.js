(this["webpackJsonpmesto-react"]=this["webpackJsonpmesto-react"]||[]).push([[0],{11:function(e,t,n){},31:function(e,t,n){"use strict";n.r(t);var a=n(1),c=n.n(a),o=n(12),s=n.n(o),r=(n(11),n(17)),i=n(2),u=n.p+"static/media/logo.a307e1c4.svg",l=n(0);var p=function(){return Object(l.jsx)("header",{className:"header",children:Object(l.jsx)("img",{className:"header__logo",src:u,alt:"\u041b\u043e\u0433\u043e\u0442\u0438\u043f \u043f\u0440\u043e\u0435\u043a\u0442\u0430 '\u041c\u0435\u0441\u0442\u043e'"})})},d=Object(a.createContext)();var j=function(e){var t=e.card,n=e.onCardClick,c=e.onCardLike,o=e.onCardDelete,s=Object(a.useContext)(d),r=t.owner._id===s._id,i="element__delete-button ".concat(r?"element__delete-button_visible":""),u=t.likes.some((function(e){return e._id===s._id})),p="element__like-button ".concat(u?"element__like-button_active":"");return Object(l.jsxs)("figure",{className:"element",children:[Object(l.jsx)("img",{className:"element__image",src:t.link,alt:t.name,onClick:function(){n(t)}}),Object(l.jsx)("button",{type:"button",className:i,onClick:function(){o(t)}}),Object(l.jsxs)("figcaption",{className:"element__caption",children:[Object(l.jsx)("h2",{className:"element__title",children:t.name}),Object(l.jsxs)("div",{className:"element__like-wrapper",children:[Object(l.jsx)("button",{type:"button",className:p,onClick:function(){c(t)}}),Object(l.jsx)("p",{className:"element__like-counter",children:t.likes.length})]})]})]})};var h=function(e){var t=e.isEditAvatarPopupOpen,n=e.isEditProfilePopupOpen,c=e.isAddPlacePopupOpen,o=e.onCardClick,s=e.cards,r=e.onCardLike,i=e.onCardDelete,u=Object(a.useContext)(d);return Object(l.jsxs)("main",{className:"content",children:[Object(l.jsxs)("section",{className:"profile",children:[Object(l.jsxs)("div",{className:"profile__wrapper",children:[Object(l.jsxs)("div",{className:"profile__avatar-wrapper",onClick:t,children:[Object(l.jsx)("button",{type:"button",className:"profile__avatar-edit-button"}),Object(l.jsx)("img",{className:"profile__avatar",src:"".concat(u.avatar),alt:"\u0410\u0432\u0430\u0442\u0430\u0440 \u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u044f"})]}),Object(l.jsxs)("div",{className:"profile__info",children:[Object(l.jsx)("h1",{className:"profile__info-name",children:u.name}),Object(l.jsx)("p",{className:"profile__info-job",children:u.about}),Object(l.jsx)("button",{type:"button",className:"profile__edit-button",onClick:n})]})]}),Object(l.jsx)("button",{type:"button",className:"profile__add-button",onClick:c})]}),Object(l.jsx)("section",{className:"elements",children:s.map((function(e){return Object(l.jsx)(j,{card:e,onCardClick:o,onCardLike:r,onCardDelete:i},e._id)}))})]})};var b=function(){return Object(l.jsx)("footer",{className:"footer",children:Object(l.jsxs)("p",{className:"footer__copyright",children:["\xa9 2020 - ",(new Date).getFullYear(),". Mesto Russia"]})})};var m=function(e){var t=e.isOpen,n=e.onClose,a=e.name,c=e.title,o=e.children,s=e.buttonName,r=e.onSubmit;return Object(l.jsx)("div",{className:"popup popup_type_".concat(a," ").concat(t&&"popup_is-opened"),children:Object(l.jsxs)("div",{className:"popup__container",children:[Object(l.jsx)("button",{type:"button",className:"popup__close",onClick:n}),Object(l.jsx)("h2",{className:"popup__title",children:c}),Object(l.jsxs)("form",{name:a,className:"popup__form",onSubmit:r,children:[o,Object(l.jsx)("button",{type:"submit",className:"popup__button",children:s})]})]})})};var f=function(e){var t=e.card,n=e.onClose;return Object(l.jsx)("div",{className:"popup-image popup ".concat(t&&"popup_is-opened"),children:Object(l.jsxs)("div",{className:"popup-image__container",children:[Object(l.jsx)("button",{className:"popup__close popup-image__close",onClick:n}),Object(l.jsx)("div",{className:"popup-image__content-container",children:Object(l.jsxs)("figure",{className:"popup-image__photo",children:[Object(l.jsx)("img",{src:t?t.link:"",alt:t?t.name:"",className:"popup-image__preview"}),Object(l.jsx)("figcaption",{className:"popup-image__title",children:t?t.name:""})]})})]})})},_=n(13),O=n(14),v=new(function(){function e(t){Object(_.a)(this,e),this._url=t.url,this._headers=t.headers}return Object(O.a)(e,[{key:"_getResponse",value:function(e){return e.ok?e.json():Promise.reject("\u041e\u0448\u0438\u0431\u043a\u0430: ".concat(e.status))}},{key:"getCards",value:function(){var e=this;return fetch("".concat(this._url,"/cards"),{headers:this._headers}).then((function(t){return e._getResponse(t)}))}},{key:"getUserData",value:function(){var e=this;return fetch("".concat(this._url,"/users/me"),{headers:this._headers}).then((function(t){return e._getResponse(t)}))}},{key:"getInitialData",value:function(){return Promise.all([this.getUserData(),this.getCards()])}},{key:"editProfile",value:function(e,t){var n=this;return fetch("".concat(this._url,"/users/me"),{method:"PATCH",headers:this._headers,body:JSON.stringify({name:e,about:t})}).then((function(e){return n._getResponse(e)}))}},{key:"addNewCard",value:function(e,t){var n=this;return fetch("".concat(this._url,"/cards"),{method:"POST",headers:this._headers,body:JSON.stringify({name:e,link:t})}).then((function(e){return n._getResponse(e)}))}},{key:"likeCard",value:function(e){var t=this;return fetch("".concat(this._url,"/cards/likes/").concat(e),{method:"PUT",headers:this._headers}).then((function(e){return t._getResponse(e)}))}},{key:"dislikeCard",value:function(e){var t=this;return fetch("".concat(this._url,"/cards/likes/").concat(e),{method:"DELETE",headers:this._headers}).then((function(e){return t._getResponse(e)}))}},{key:"deleteCard",value:function(e){var t=this;return fetch("".concat(this._url,"/cards/").concat(e),{method:"DELETE",headers:this._headers}).then((function(e){return t._getResponse(e)}))}},{key:"uploadAvatar",value:function(e){var t=this;return fetch("".concat(this._url,"/users/me/avatar"),{method:"PATCH",headers:this._headers,body:JSON.stringify({avatar:e})}).then((function(e){return t._getResponse(e)}))}},{key:"changeLikeCardStatus",value:function(e,t){var n=this;return fetch("".concat(this._url,"/cards/likes/").concat(e),{method:t?"PUT":"DELETE",headers:this._headers}).then((function(e){return n._getResponse(e)}))}}]),e}())({url:"https://mesto.nomoreparties.co/v1/cohort-18",headers:{authorization:"36f02e32-425e-4cd6-9a5e-ab45df68f83b","Content-Type":"application/json"}});var g=function(e){var t=e.isOpen,n=e.onClose,c=e.onUpdateUser,o=Object(a.useContext)(d),s=Object(a.useState)(""),r=Object(i.a)(s,2),u=r[0],p=r[1],j=Object(a.useState)(""),h=Object(i.a)(j,2),b=h[0],f=h[1];return Object(a.useEffect)((function(){p(o.name),f(o.about)}),[o]),Object(l.jsxs)(m,{isOpen:t,onClose:n,name:"edit-profile",title:"\u0420\u0435\u0434\u0430\u043a\u0442\u0438\u0440\u043e\u0432\u0430\u0442\u044c \u043f\u0440\u043e\u0444\u0438\u043b\u044c",buttonName:"\u0421\u043e\u0445\u0440\u0430\u043d\u0438\u0442\u044c",onSubmit:function(e){e.preventDefault(),c({name:u,about:b})},children:[Object(l.jsx)("input",{required:!0,name:"profile-name",type:"text",className:"popup__name popup__input",placeholder:"\u0418\u043c\u044f",onChange:function(e){p(e.target.value)},minLength:"2",maxLength:"40",value:u||""}),Object(l.jsx)("span",{id:"profile-name-error",className:"error"}),Object(l.jsx)("input",{required:!0,name:"profile-job",type:"text",className:"popup__job popup__input",placeholder:"\u041e \u0441\u0435\u0431\u0435",onChange:function(e){f(e.target.value)},minLength:"2",maxLength:"200",value:b||""}),Object(l.jsx)("span",{id:"profile-job-error",className:"error"})]})};var x=function(e){var t=e.isOpen,n=e.onClose,c=e.onUpdateAvatar,o=Object(a.useRef)("");return Object(a.useEffect)((function(){o.current.value=""}),[t]),Object(l.jsxs)(m,{isOpen:t,onClose:n,title:"\u041e\u0431\u043d\u043e\u0432\u0438\u0442\u044c \u0430\u0432\u0430\u0442\u0430\u0440",name:"edit-avatar",buttonName:"\u0421\u043e\u0445\u0440\u0430\u043d\u0438\u0442\u044c",onSubmit:function(e){e.preventDefault(),c({avatar:o.current.value})},children:[Object(l.jsx)("input",{className:"popup__name popup__input",type:"url",name:"avatar",required:!0,placeholder:"\u0421\u0441\u044b\u043b\u043a\u0430 \u043d\u0430 \u0444\u043e\u0442\u043e\u0433\u0440\u0430\u0444\u0438\u044e",ref:o}),Object(l.jsx)("span",{id:"avatar-error",className:"error"})]})};var C=function(e){var t=e.isOpen,n=e.onClose,c=e.onAddPlace,o=Object(a.useState)(""),s=Object(i.a)(o,2),r=s[0],u=s[1],p=Object(a.useState)(""),d=Object(i.a)(p,2),j=d[0],h=d[1];return Object(a.useEffect)((function(){h(""),u("")}),[t]),Object(l.jsxs)(m,{isOpen:t,onClose:n,title:"\u041d\u043e\u0432\u043e\u0435 \u043c\u0435\u0441\u0442\u043e",name:"add-place",buttonName:"\u0421\u043e\u0437\u0434\u0430\u0442\u044c",onSubmit:function(e){e.preventDefault(),c({name:r,link:j})},children:[Object(l.jsx)("input",{required:!0,name:"place-name",type:"text",className:"popup-new-place__description popup__input popup__name",placeholder:"\u041d\u0430\u0437\u0432\u0430\u043d\u0438\u0435",minLength:"2",maxLength:"30",onChange:function(e){u(e.target.value)},value:r||""}),Object(l.jsx)("span",{id:"place-name-error",className:"error"}),Object(l.jsx)("input",{required:!0,name:"place-link",type:"url",className:"popup-new-place__image-link popup__input popup__job",placeholder:"\u0421\u0441\u044b\u043b\u043a\u0430 \u043d\u0430 \u043a\u0430\u0440\u0442\u0438\u043d\u043a\u0443",onChange:function(e){h(e.target.value)},value:j||""}),Object(l.jsx)("span",{id:"place-link-error",className:"error"})]})};var k=function(){var e=Object(a.useState)({}),t=Object(i.a)(e,2),n=t[0],c=t[1];Object(a.useEffect)((function(){v.getUserData().then((function(e){c(e)})).catch((function(e){return console.log(e)}))}),[]);var o=Object(a.useState)(!1),s=Object(i.a)(o,2),u=s[0],j=s[1],_=Object(a.useState)(!1),O=Object(i.a)(_,2),k=O[0],N=O[1],y=Object(a.useState)(!1),w=Object(i.a)(y,2),P=w[0],E=w[1],S=Object(a.useState)(null),L=Object(i.a)(S,2),D=L[0],A=L[1];function R(e){27===e.keyCode&&T()}function T(){E(!1),j(!1),N(!1),A(null),window.removeEventListener("keydown",R)}var U=Object(a.useState)([]),q=Object(i.a)(U,2),F=q[0],J=q[1];return Object(a.useEffect)((function(){v.getCards().then((function(e){J(e)})).catch((function(e){return console.log(e)}))}),[]),Object(l.jsx)(d.Provider,{value:n,children:Object(l.jsxs)("div",{className:"page",children:[Object(l.jsx)(p,{}),Object(l.jsx)(h,{isEditAvatarPopupOpen:function(){j(!0),window.addEventListener("keydown",R)},isEditProfilePopupOpen:function(){N(!0),window.addEventListener("keydown",R)},isAddPlacePopupOpen:function(){E(!0),window.addEventListener("keydown",R)},onCardClick:function(e){A(e),window.addEventListener("keydown",R)},cards:F,onCardLike:function(e){var t=e.likes.some((function(e){return e._id===n._id}));v.changeLikeCardStatus(e._id,!t).then((function(t){var n=F.map((function(n){return n._id===e._id?t:n}));J(n)})).catch((function(e){return console.log(e)}))},onCardDelete:function(e){v.deleteCard(e._id).then((function(){J(F.filter((function(t){return t._id!==e._id})))})).catch((function(e){return console.log(e)}))}}),Object(l.jsx)(b,{}),Object(l.jsx)(x,{isOpen:u,onClose:T,onUpdateAvatar:function(e){v.uploadAvatar(e.avatar).then((function(e){c(e),T()})).catch((function(e){return console.log(e)}))},onClick:function(e){return e.stopPropagation()}}),Object(l.jsx)(C,{isOpen:P,onClose:T,onAddPlace:function(e){v.addNewCard(e.name,e.link).then((function(e){J([e].concat(Object(r.a)(F))),T()})).catch((function(e){return console.log(e)}))}}),Object(l.jsx)(g,{isOpen:k,onClose:T,onUpdateUser:function(e){v.editProfile(e.name,e.about).then((function(e){c(e),T()})).catch((function(e){return console.log(e)}))}}),Object(l.jsx)(m,{onClose:T,name:"confirm-delete",title:"\u0412\u044b \u0443\u0432\u0435\u0440\u0435\u043d\u044b?",buttonName:"\u0414\u0430"}),Object(l.jsx)(f,{card:D,onClose:T})]})})},N=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,32)).then((function(t){var n=t.getCLS,a=t.getFID,c=t.getFCP,o=t.getLCP,s=t.getTTFB;n(e),a(e),c(e),o(e),s(e)}))},y=n(16);s.a.render(Object(l.jsx)(y.a,{children:Object(l.jsx)(c.a.StrictMode,{children:Object(l.jsx)(k,{})})}),document.getElementById("root")),N()}},[[31,1,2]]]);
//# sourceMappingURL=main.94f0c19e.chunk.js.map