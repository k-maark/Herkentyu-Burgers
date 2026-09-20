(function () {
  // index matches Date#getDay(): 0 = Sunday ... 6 = Saturday
  var HOURS = [
    { day: 'Vasárnap',    open: '12:00', close: '18:00' },
    { day: 'Hétfő',       open: '10:00', close: '20:00' },
    { day: 'Kedd',        open: '10:00', close: '20:00' },
    { day: 'Szerda',      open: '10:00', close: '20:00' },
    { day: 'Csütörtök',   open: '10:00', close: '20:00' },
    { day: 'Péntek',      open: '10:00', close: '21:00' },
    { day: 'Szombat',     open: '10:00', close: '21:00' },
  ];

  function toMinutes(hhmm) {
    var p = hhmm.split(':');
    return parseInt(p[0], 10) * 60 + parseInt(p[1], 10);
  }

  function findNextOpen(dayIdx, minutesNow) {
    for (var i = 0; i <= 7; i++) {
      var idx = (dayIdx + i) % 7;
      var d = HOURS[idx];
      if (!d || !d.open) continue;
      if (i === 0 && minutesNow >= toMinutes(d.open)) continue;
      return { day: d, daysAhead: i };
    }
    return null;
  }

  function getStatus(now) {
    now = now || new Date();
    var dayIdx = now.getDay();
    var minutesNow = now.getHours() * 60 + now.getMinutes();
    var today = HOURS[dayIdx];

    var isOpen = false;
    if (today && today.open) {
      isOpen = minutesNow >= toMinutes(today.open) && minutesNow < toMinutes(today.close);
    }

    var result = { isOpen: isOpen, dayIndex: dayIdx, today: today };

    if (isOpen) {
      result.short = 'Nyitva';
      result.message = 'Nyitva ' + today.close + '-ig';
    } else if (today && today.open && minutesNow < toMinutes(today.open)) {
      result.short = 'Zárva';
      result.message = 'Jelenleg zárva — ma ' + today.open + '-kor nyitunk.';
    } else {
      var next = findNextOpen(dayIdx, minutesNow);
      result.short = 'Zárva';
      if (next) {
        var when = next.daysAhead === 1 ? 'Holnap' : next.day.day + '-n';
        result.message = 'Jelenleg zárva — ' + when + ' ' + next.day.open + '-kor nyitunk.';
      } else {
        result.message = 'Jelenleg zárva vagyunk.';
      }
    }
    return result;
  }

  window.restaurantHours = { data: HOURS, getStatus: getStatus };
})();
