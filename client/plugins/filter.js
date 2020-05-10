import Vue from 'vue';

Vue.filter('positionExtension', function(value) {
  let result;

  switch (value) {
  case 'FW': result = 'Foward'; break;
  case 'MF': result = 'Midfielder'; break;
  case 'DF': result = 'Defender'; break;
  case 'GK': result = 'Goalkeeper'; break;
  default: result = 'Unknown'; break;
  }
  return result;
});

Vue.filter('thousandSeparator', function(value) {
  if (!value)
    return 0;
  const rounded =  Math.round(value * 100) / 100;
  return rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
});

Vue.filter('abbrNum', function(number, decPlaces) {
  // 2 decimal places => 100, 3 => 1000, etc
  decPlaces = decPlaces || 0;
  decPlaces = Math.pow(10,decPlaces);

  // Enumerate number abbreviations
  var abbrev = [ 'k', 'M', 'B', 'T' ];

  // Go through the array backwards, so we do the largest first
  for (var i = abbrev.length - 1; i >= 0; i--) {

    // Convert array index to "1000", "1000000", etc
    var size = Math.pow(10, (i + 1) * 3);

    // If the number is bigger or equal do the abbreviation
    if (size <= number) {
      // Here, we multiply by decPlaces, round, and then divide by decPlaces.
      // This gives us nice rounding to a particular decimal place.
      number = Math.round(number * decPlaces / size) / decPlaces;

      // Handle special case where we round up to the next abbreviation
      if ((number == 1000) && (i < abbrev.length - 1)) {
        number = 1;
        i++;
      }

      // Add the letter for the abbreviation
      number += abbrev[i];

      // We are done... stop
      break;
    }
  }

  return number;
});