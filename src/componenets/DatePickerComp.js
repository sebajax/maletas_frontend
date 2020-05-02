import React from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from  "react-datepicker";
import es from 'date-fns/locale/es';

registerLocale('es', es);

const DatePickerComp = (props) => (
        <DatePicker 
            locale="es" 
            selected={props.startDate} 
            onChange={date => props.handleChange(date)} 
            dateFormat="yyyy-MM-dd"    
            className="form-control"
        />
);

export default DatePickerComp;