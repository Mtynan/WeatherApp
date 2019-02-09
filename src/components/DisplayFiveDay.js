import React from 'react';
import moment from "moment";


export default class DisplayFiveDay extends React.Component {

    render(){
        return(
            <div>
                { this.props.city && this.props.country && <button onClick={this.props.getFiveDayForecast}>Show Five Day Temperature</button>}
                {this.renderWeekDays() }
            </div>
        );
    }

    renderWeekDays() {
        if (this.props.fiveDay) {

            // // - - - - - - - - - - - - - - - - - - - - 

            const result =  this.props.fiveDay.map((weekDay, index) => {
                return this.renderWeekDay(weekDay, index);
            });

            return result;

            // // - - - - - - - - - - - - - - - - - - - - 

            // return this.props.fiveDay.map( (weekDay, index) => {
            //     return this.renderWeekDay(weekDay, index);
            // });

            // // - - - - - - - - - - - - - - - - - - - - 

            // return this.props.fiveDay.map( (weekDay, index) => this.renderWeekDay(weekDay, index));

            // - - - - - - - - - - - - - - - - - - - - 


        }        
    }

    renderWeekDay(weekday, index){
        return (
            <div key={index}>
                <p>{moment(weekday.dt_txt).format('dddd Do MMMM YYYY')}</p>
                <p>Temperature: {weekday.main.temp}</p>
                <p>Humidity: {weekday.main.humidity}</p>
                <p>Conditions: {weekday.weather[0].description}</p>
            </div>
        )
        
    }

}