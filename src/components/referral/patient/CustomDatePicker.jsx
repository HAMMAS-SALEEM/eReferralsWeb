import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import InputMask from 'react-input-mask';
import "react-datepicker/dist/react-datepicker.css";
import './PatientForm.css';

const CustomDatePicker = ({ selectedDate, onDateChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="react-datepicker-wrapper">
      <DatePicker
        className="custom-date-picker"
        selected={selectedDate}
        onChange={onDateChange}
        onClickOutside={() => setIsOpen(false)}
        onFocus={() => setIsOpen(true)}
        dateFormat="dd/MM/yyyy"
        placeholderText='DD/MM/YYYY'
        showMonthDropdown
        showYearDropdown
        dropdownMode="select"
        renderCustomHeader={({ date, changeYear, changeMonth, decreaseMonth, increaseMonth, prevMonthButtonDisabled, nextMonthButtonDisabled }) => (
          <div>
            <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>{"<"}</button>
            <div>
              <select value={date.getMonth()} onChange={({ target: { value } }) => changeMonth(value)}>
                {[
                  "January", "February", "March", "April", "May", "June",
                  "July", "August", "September", "October", "November", "December"
                ].map((option, index) => (
                  <option key={index} value={index}>{option}</option>
                ))}
              </select>
              <select value={date.getFullYear()} onChange={({ target: { value } }) => changeYear(value)}>
                {Array.from({ length: 31 }, (_, i) => 1990 + i).map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
            <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>{">"}</button>
          </div>
        )}
        customInput={
          <InputMask
            mask="99/99/9999"
            maskChar={null}
            onChange={(e) => onDateChange(new Date(selectedDate?.getFullYear(), selectedDate?.getMonth(), e.target.value))}
          />
        }
      />
    </div>
  );
};

export default CustomDatePicker;
