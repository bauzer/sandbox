(function(undefined) {
  document.addEventListener("DOMContentLoaded", function(event) {
    var myState = new MyState();
  });

  function Error(errors) {
    this.errors_ = document.getElementById('errors');
    this.errorMessages_ = [];

    this.initialize = function(errors) {
      this.errorMessages_ = errors;
    }
    this.clear = function() {
      this.errors_.innerHTML = '';
      this.errors_.classList.remove('show');
    }
    this.show = function(errors) {
      var errorMessages;
      if (this.errorMessages_.length <= 0) {
        this.clear();
        return;
      }

      errorMessages = this.errorMessages_.map(function(element) {
        return element.message;
      });
      this.errors_.innerHTML = errorMessages.join('<br>');
      this.errors_.classList.add('show');
    }

    this.initialize(errors);
  }

  function Condition() {
    this.errors_ = [];
    this.mode_ = document.getElementById('mode');
    this.year_ = document.getElementById('year');
    this.month_ = document.getElementById('month');
    this.day_ = document.getElementById('day');

  }

  function MyState() {
    this.viewMode_ = 'conditions';
    this.conditionView = document.getElementById('conditions');
    this.graphView = document.getElementById('graph');

    this.condition = new Condition();
    this.errors_ = [];
    this.mode_ = document.getElementById('mode');
    this.year_ = document.getElementById('year');
    this.month_ = document.getElementById('month');
    this.day_ = document.getElementById('day');

    this.changeView = function() {
      this.viewMode_  = (this.viewMode_ === 'graph') ? 'conditions' : 'graph';
    }

    this.rebuildConditionView = function() {
      this.graphView.classList.remove('mode_graph');
      this.conditionView.classList.add('mode_condition');
      self_ = this;
      return {
        'none': function() {
          var now = new Date();
          self_.year_.value = now.getFullYear();
          self_.month_.value = now.getMonth() + 1;
          self_.day_.value = now.getDate();
        },
        'y': function() {
          var now = new Date();
          self_.year_.value = now.getFullYear();
          self_.month_.value = now.getMonth() + 2;
          self_.day_.value = now.getDate();
        },
        'm': function() {
          var now = new Date();
          self_.year_.value = now.getFullYear();
          self_.month_.value = now.getMonth() + 3;
          self_.day_.value = now.getDate();
        },
        'd': function() {
          var now = new Date();
          self_.year_.value = now.getFullYear();
          self_.month_.value = now.getMonth() + 4;
          self_.day_.value = now.getDate();
        }
      }[self_.mode_.value]();
    }
    this.rebuildGraphView = function() {
      var img = document.getElementById('graph_image');
      var self_ = this;
      img.src = 'images/96de817f.jpg';
      img.onload = function(event) {
        self_.conditionView.classList.remove('mode_condition');
        self_.graphView.classList.add('mode_graph');
      }
    }
    this.validate = function() {
      this.errors_= [];
      if (this.mode_.value === 'none') {
        this.errors_.push({
          field: this.mode_,
          message: 'モードを選択してください。'
        });
      }
    }
    this.isValid = function () {
      return this.errors_.length <= 0;
    }

    this.mode_.addEventListener('change', function(event) {
      var selected = event.srcElement;
      this.rebuildConditionView(selected.value);
    }.bind(this), false);

    document.getElementById('generate').addEventListener('click', function(event) {
      this.validate();
      var errors = new Error(this.errors_);
      errors.show();
      if (this.isValid()) {
        this.rebuildGraphView();
      }
    }.bind(this), false);
    document.getElementById('back').addEventListener('click', function(event) {
      this.rebuildConditionView();
    }.bind(this), false);
    this.rebuildConditionView();
  }
})();
