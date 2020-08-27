import React, { useState } from "react";
import { connect } from "react-redux";

import { addNonWorkingDate, removeNonWorkingDate } from "../../actions/app_settings";
import InputSelectDate from "../molecules/input_select_date";

const mapStateToProps = (store) => ({
  nonWorkingDays: store.appSettings.config.nonWorkingDays,
});

const mapDispatchToProps = (dispatch) => ({
  addNonWorkingDate: (date) => dispatch(addNonWorkingDate(date)),
  removeNonWorkingDate: (date) => dispatch(removeNonWorkingDate(date)),
});

function SetWeekend({ nonWorkingDays, addNonWorkingDate, removeNonWorkingDate }) {
  const [inputDateValue, setInputDateValue] = useState(
    `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`
  );
  const [inputDateValid, setInputDateValid] = useState(null);

  return (
    <div id="set_weekend">
      <h3>Weekend</h3>

      <p>Список уже назначиных выходных дней:</p>
      <ul
        style={{
          margin: "0px 20px 20px",
        }}
      >
        {nonWorkingDays.map((item) => (
          <li
            style={{
              margin: "0px 10px 0px 0px",
              padding: "3px",
              width: "200px",
              borderLeft: "1px solid var(--black_gray)",
              borderBottom: "1px solid var(--black_gray)",
              display: "flex",
              justifyContent: "space-between",
            }}
            key={item}
          >
            <span style={{ lineHeight: "30px" }}>{item}</span>
            <button
              className="button_text"
              style={{ padding: " 5px", fontSize: "0.8em" }}
              onClick={(e) => {
                e.preventDefault();
                removeNonWorkingDate(item);
              }}
            >
              ✕
            </button>
          </li>
        ))}
      </ul>

      <p>Введите дату на которую хотите назначить выходной день:</p>

      <InputSelectDate
        date={inputDateValue}
        valid={inputDateValid}
        onChangeValid={setInputDateValid}
        onChangeDate={setInputDateValue}
      />
      <button
        disabled={!inputDateValid}
        onClick={(e) => {
          e.preventDefault();
          addNonWorkingDate(inputDateValue);
        }}
      >
        Add Date
      </button>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(SetWeekend);
