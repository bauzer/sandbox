var LM = LM || {
  view: {
    mode: {}
  },
  fields: {
    errors: {},
    mode: {},
    year: {},
    month: {},
    day: {},
    image: {},
    gerate: {},
    back: {},
    validate: {},
    clear: {}
  },
  util: {
    toggleClass: {}
  }
};

LM.view.mode = (function() {
  var element_conditions = document.getElementById('conditions');
  var element_graph = document.getElementById('graph');
  condition = function() {
    element_conditions.classList.remove('mode_graph');
    element_graph.classList.remove('mode_graph');
    element_conditions.classList.add('mode_condition');
    element_graph.classList.add('mode_condition');
  },
  graph = function() {
    element_conditions.classList.remove('mode_condition');
    element_graph.classList.remove('mode_condition');
    element_conditions.classList.add('mode_graph');
    element_graph.classList.add('mode_graph');
  }
  return {
    condition: condition,
    graph: graph
  }
}());

LM.fields.errors = (function() {
  var element = document.getElementById('errors');
  var errors = [];
  addError = function(errorMessage) {
    errors.push(errorMessage);
  },
  clear = function() {
    errors = [];
    element.innerHTML = '';
    element.classList.remove('show');
    element.classList.add('hide');
  },
  show = function() {
    element.innerHTML = errors.join('<br>');
    element.classList.remove('hide');
    element.classList.add('show');
  }
  return {
    addError: addError,
    clear: clear,
    show: show
  }
}());

LM.fields.generate = (function() {
  var element = document.getElementById('generate');
  element.addEventListener('click', function(event) {
    // TODO validation
    LM.fields.errors.clear();
    if (!LM.fields.mode.valid()) {
      LM.fields.errors.show();
      return;
    }
    LM.fields.image.show();
  });
}());

LM.fields.back = (function() {
  var element = document.getElementById('back');
  element.addEventListener('click', function(event) {
    LM.view.mode.condition();
  });
}());

LM.fields.validate = function() {
  var targetFields = [this.fields.mode];
  this.errors.clear();
  targetFields.forEach(function(value) {
    var result = value.validate();
    if (!result.valid) {
      this.errors.push(result);
    }
  });
};

LM.fields.mode = (function() {
  var elemnt = document.getElementById('mode');
  value = function() {
    return elemnt.value;
  },
  clear = function() {
    elemnt.value = 'none';
  },
  valid = function() {
    if (!['y', 'm', 'd'].includes(this.value())) {
      LM.fields.errors.addError('modeを選択してください');
      return false;
    }
    return true;
  }
  return {
    value: value,
    clear: clear,
    valid: valid
  }
}());

LM.fields.year = (function() {
  var elemnt = document.getElementById('year');
  value = function() {
    return elemnt.value;
  },
  clear = function() {
    elemnt.value = '';
  },
  valid = function() {
    var year = this.value().trim();
    if (year === '') {
      LM.fields.errors.addError('年を入力してください');
      return false;
    }
    if (!year.match(/20[0123]\d/)) {
      LM.fields.errors.addError('年は2000から2039の間で入力してください');
      return false;
    }
    return true;
  }
  return {
    value: value,
    clear: clear,
    valid: valid
  }
}());

LM.fields.month = (function() {
  var elemnt = document.getElementById('month');
  value = function() {
    return elemnt.value;
  },
  clear = function() {
    elemnt.value = '';
  },
  valid = function() {
    var month = this.value().trim();
    if (month === '') {
      LM.fields.errors.addError('月を入力してください');
      return false;
    }
    if (!month.match(/\d{1,2}/)) {
      LM.fields.errors.addError('月は1から12の間で入力してください');
      return false;
    }
    if (parseInt(month) < 0 || parseInt(mont) > 12) {
      LM.fields.errors.addError('月は1から12の間で入力してください');
      return false;
    }
    return true;
  }
  return {
    value: value,
    clear: clear
  }
}());

LM.fields.day = (function() {
  var elemnt = document.getElementById('day');
  value = function() {
    return elemnt.value;
  },
  clear = function() {
    elemnt.value = '';
  }
  return {
    value: value,
    clear: clear
  }
}());

LM.fields.image = (function() {
  var element = document.getElementById('graph_image');
  show = function() {
    var mode = LM.fields.mode.value();
    var origin = [LM.fields.year.value(), LM.fields.month.value(), LM.fields.day.value()].join('');
    element.src = 'images/96de817f.jpg?mode=' + mode + '&origin=' + origin;
    element.onload = function(event) {
      LM.view.mode.graph();
    };
  }
  return {
    show: show
  }
}());

LM.fields.initialize = function() {
  this.clear();
}

LM.fields.clear = function() {
  this.mode.clear();
  this.year.clear();
  this.month.clear();
  this.day.clear();
};

(function() {
  LM.fields.initialize();
  // LM.fields.clear();
}());
