import React, { useState, forwardRef } from 'react';
import DatePicker from 'react-datepicker';
import InputMask from 'react-input-mask';
import "react-datepicker/dist/react-datepicker.css";
import './CustomDatePicker.css';
import ExpandDownIcon from '../../../assets/icons/ExpandDownIcon.svg';
import IconButton from '@mui/material/IconButton';
import EditIcon from "@mui/icons-material/Edit";
import dayjs from 'dayjs';


const CustomDatePicker = ({
  selectedDate,
  onDateChange,
  startYear = 1960,
  endYear = new Date().getFullYear(),
  minDate,
  shouldDisableDate,
  designType,
  className,
  showMonthYearPicker,
  dateFormat = "dd/MM/yyyy",
  widthFull = false,
  padding10 = false,
  textCenter = false,
  iconWidth = '16px',
  iconHeight = '16px',
  icon = '',
  isExpiryDate = false,
  isBirthDate = false,
  isCompletionDate = false
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleIconClick = () => {
    setIsOpen(!isOpen);
  };


  // Ensure selectedDate is a valid Date object
  const validSelectedDate = selectedDate instanceof Date && !isNaN(selectedDate) ? selectedDate : null;

  // Set minDate to today if isExpiryDate or isCompletionDate is true
  const minSelectableDate = (isExpiryDate || isCompletionDate) ? new Date() : minDate;

  // Set maxDate to 6 years from today if isExpiryDate is true
  const maxSelectableDate = isExpiryDate ? new Date(new Date().setFullYear(new Date().getFullYear() + 6)) : (isBirthDate ? new Date() : null);

  // Adjust startYear and endYear if isExpiryDate is true
  const currentYear = new Date().getFullYear();
  const adjustedStartYear = isExpiryDate ? currentYear : startYear;
  const adjustedEndYear = isExpiryDate ? currentYear + 6 : endYear;

  // Format the selected date for display
  const formattedDate = validSelectedDate ? dayjs(validSelectedDate).format(dateFormat) : null;


  return (
    <div className={`  ${designType} ${className}`} style={{ width: widthFull ? '100%' : '60%', position: 'relative' }}>
      <DatePicker
        className={`custom-date-picker  ${textCenter ? 'text-center' : ''}`}
        // customInput={<CustomInput value={formattedDate} />}
        // selected={selectedDate}
        selected={validSelectedDate}
        onChange={onDateChange}
        onClickOutside={() => setIsOpen(false)}
        onFocus={() => setIsOpen(true)}
        open={isOpen}
        dateFormat={dateFormat}
        placeholderText={dateFormat.toUpperCase()}
        showMonthDropdown={!showMonthYearPicker}
        showYearDropdown
        showMonthYearPicker={showMonthYearPicker}
        dropdownMode="select"
        minDate={minSelectableDate}
        maxDate={maxSelectableDate}
        popperPlacement="bottom" // Ensures dropdown appears below the input
  popperModifiers={[
    {
      name: 'offset',
      options: {
        offset: [0, 5], // Adjust dropdown's position (5px below the input)
      },
    },
  ]}
  
        renderCustomHeader={({ date, changeYear, changeMonth, decreaseMonth, increaseMonth, prevMonthButtonDisabled, nextMonthButtonDisabled }) => (
          <div className="custom-header">
            <IconButton onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
              <img src={ExpandDownIcon} alt="Previous Month" />
            </IconButton>
            <div>
              {!showMonthYearPicker && (
                <select value={date.getMonth()} onChange={({ target: { value } }) => changeMonth(value)}>
                  {[
                    "January", "February", "March", "April", "May", "June",
                    "July", "August", "September", "October", "November", "December"
                  ].map((option, index) => (
                    <option key={index} value={index}>{option}</option>
                  ))}
                </select>
              )}
              <select value={date.getFullYear()} onChange={({ target: { value } }) => changeYear(value)}>
                {Array.from({ length: adjustedEndYear - adjustedStartYear + 1 }, (_, i) => adjustedStartYear + i).map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
            <IconButton onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
              <img src={ExpandDownIcon} alt="Next Month" />
            </IconButton>
          </div>

        )}

        customInput={
          <InputMask
            style={{ padding: padding10 ? '10px' : '5.75px 10px', width: '100%' }}
            mask={dateFormat.replace(/[a-zA-Z]/g, '9')}
            maskChar={null}
            onChange={(e) => onDateChange(new Date(selectedDate?.getFullYear(), selectedDate?.getMonth(), e.target.value))}
          />
        }
      />
      {icon == 'edit' ?
        <EditIcon
          sx={{
            color: "#000",
            fontSize: "20px",
          }}
          onClick={handleIconClick}
          style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer' }}
        />
        :
        <IconButton
          onClick={handleIconClick}
          style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)' }}
        >
          <img src={ExpandDownIcon} alt="Expand" style={{ width: iconWidth, height: iconHeight }} />
        </IconButton>
      }
    </div>
  );
};

export default CustomDatePicker;