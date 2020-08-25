import React, { Component } from "react";
import Recaptcha from "react-recaptcha";
import { connect } from "react-redux";

import Contact from "../../components/contact";
import "./style.scss";

import { onLoadedRecaptcha, onVerifyRecaptcha } from "../../actions/";

const mapStateToProps = (store) => ({
  recaptchaIsVerify: store.forms.recaptchaIsVerify,
});

const mapDispatchToProps = (dispatch) => ({
  onLoadedRecaptcha: () => dispatch(onLoadedRecaptcha()),
  onVerifyRecaptcha: () => dispatch(onVerifyRecaptcha()),
});

class FeedBack extends Component {
  constructor(props) {
    super(props);

    this.nameInputRef = null;
    this.setNameInputRef = (element) => {
      this.nameInputRef = element;
    };
  }

  activeOnSubmit(e) {
    const { recaptchaIsVerify } = this.props;

    e.preventDefault();
    if (!recaptchaIsVerify) {
      alert("Введите капчу");
      return;
    }

    const data = {
      name: e.target["name"].value,
      needed: e.target["needed"].value,
      coment: e.target["coment"].value,
    };
    const message = `name: ${data.name}\nneeded: ${data.needed}\ncoment: ${data.coment}`;
    console.log(message);

    // const token = "1130636586:AAEPeVDdOizEJuibZfG-y6Y4dRUqgEY3S0w";
    // const chatId = "-1001415430569";
    // fetch(`https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&parse_mode=html&text=${message}`);
  }

  componentDidMount() {
    if (this.nameInputRef) this.nameInputRef.focus();
  }

  render() {
    const { onLoadedRecaptcha, onVerifyRecaptcha } = this.props;

    return (
      <section id="feedback">
        <h1>FeedBack</h1>
        <p>Мы будем рады любому отзыву про наш продукт, спасибо за активность.</p>

        <Contact />
        <form onSubmit={(e) => this.activeOnSubmit(e)} id="form_feedback">
          <label htmlFor="name">Ваше имя:</label>
          <input
            type="text"
            ref={this.setNameInputRef}
            name=""
            id="name"
            required
            title="Введите свое имя, оно должно содержать более одного символа и не содержать цифры"
            pattern="\D{2,}"
          />
          <label htmlFor="needed">Насколько интересный этот проёкт? Оцените по шкале:</label>
          <p>
            💩 <input type="range" name="needed" min="0" defaultValue="5" max="10" id="mark" /> 🔥
          </p>
          <label htmlFor="coment">Если у вас есть идеи, как улучшить проект, пожалуйста, напишите:</label>
          <textarea name="coment" id="coment" cols="60" rows="10" title="Оставьте коментарий" required></textarea>

          <Recaptcha
            sitekey="6LeXXK4ZAAAAACJUGFHxzSHl6ZWW85zxCrj9q2oq"
            render="explicit"
            SameSite="None"
            onloadCallback={onLoadedRecaptcha}
            verifyCallback={onVerifyRecaptcha}
          />
          <input type="submit" value="Отправить" />
        </form>
      </section>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FeedBack);
