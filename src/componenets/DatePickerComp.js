import React from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from  "react-datepicker";
import es from 'date-fns/locale/es';

registerLocale('es', es);

const DatePickerComp = (props) => {

    let formatDateHandleChange = (date) => {
        let formatDate = "";
        if(date) {
            formatDate =
                date.getFullYear() +
                "-" +
                (date.getMonth() + 1) +
                "-" +
                date.getDate();       
        }
        props.handleChange(date, formatDate);
    };

    return (
        <DatePicker 
            locale="es" 
            selected={props.startDate}
            onChange={date => formatDateHandleChange(date)} 
            dateFormat="yyyy-MM-dd"
            className="form-control"
            placeholderText="Seleccione fecha"
        />
    );
}

export default DatePickerComp;