export function convertNumToTime(number) {
    let sign = (number >= 0) ? 1 : -1;
    number = number * sign;

    const hour = Math.floor(number);
    let decpart = number - hour;

    const min = 1 / 60;
    // Round to nearest minute
    decpart = min * Math.round(decpart / min);

    let minute = Math.floor(decpart * 60) + '';

    // Add padding if need
    if (minute.length < 2) {
    minute = '0' + minute; 
    }

    // Add Sign in final result
    sign = sign === 1 ? '' : '-';

    const time = sign + hour + ':' + minute;

    return time;
}

export function convertTimeToNum(time) {

	// Number of decimal places to round to
	const decimal_places = 2;

	// Maximum number of hours before we should assume minutes were intended. Set to 0 to remove the maximum.
	const maximum_hours = 15;

	// 3
	const int_format = time.match(/^\d+$/);

	// 1:15
	const time_format = time.match(/([\d]*):([\d]+)/);

	// 10m
	const minute_string_format = time.toLowerCase().match(/([\d]+)m/);

	// 2h
	const hour_string_format = time.toLowerCase().match(/([\d]+)h/);

    let hours, minutes;

	if (time_format != null) {
		hours = parseInt(time_format[1]);
		minutes = parseFloat(time_format[2]/60);
		time = hours + minutes;
	} else if (minute_string_format != null || hour_string_format != null) {
		if (hour_string_format != null) {
			hours = parseInt(hour_string_format[1]);
		} else {
			hours = 0;
		}
		if (minute_string_format != null) {
			minutes = parseFloat(minute_string_format[1]/60);
		} else {
			minutes = 0;
		}
		time = hours + minutes;
	} else if (int_format != null) {
		// Entries over 15 hours are likely intended to be minutes.
		time = parseInt(time);
		if (maximum_hours > 0 && time > maximum_hours) {
			time = (time/60).toFixed(decimal_places);
		}
	}

	// make sure what ever we return is a 2 digit float
	time = parseFloat(time).toFixed(decimal_places);

	return time;
}