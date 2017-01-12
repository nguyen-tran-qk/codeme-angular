'use strict';

/**
 * @ngdoc function
 * @name app.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of app
 */
angular.module('appControllers')
  .controller('DashboardCtrl', function($scope, $state, $timeout, Utils) {

    var vm = this;
    vm.$state = $state;

    //// Create a random ID to use as our user ID (we must give this to firepad and FirepadUserList).

    vm.init = function() {
      var userId = Math.floor(Math.random() * 9999999999).toString();
      vm.mode = vm.mode || 'javascript';
      vm.firebaseApp = Utils.firebaseApp;

      //// Get Firebase Database reference.
      var firepadRef = Utils.firepadRefs;
      var hash = window.location.hash.replace(/#/g, '');
      if (hash) {
        firepadRef = firepadRef.child(hash);
      } else {
        firepadRef = firepadRef.child('file01');
        window.location = window.location + '#' + firepadRef.key; // add it as a hash to the URL.
      }

      // var firepadRef = getExampleRef();

      //// Create CodeMirror (with line numbers and the JavaScript mode).
      vm.codeMirror = CodeMirror(document.getElementById('firepad'), {
        lineNumbers: true,
        lineWrapping: true,
        extraKeys: {
          "Ctrl-Space": "autocomplete",
        },
        mode: vm.mode ? vm.mode : 'javascript',
        foldGutter: true,
        gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
        styleActiveLine: true,
        theme: 'material'
      });

      //// Create Firepad (with our desired userId).
      var defaultText = '// JavaScript Editing with Firepad!\nfunction go() {\n  var message = "Hello, world.";\n  console.log(message);\n}';
      if (vm.mode === 'htmlmixed') {
        defaultText = '<html>\n  <body>\n  </body>\n  </html';
      }
      var firepad = Firepad.fromCodeMirror(firepadRef, vm.codeMirror, {
        userId: userId,
        defaultText: defaultText
      });
      //// Create FirepadUserList (with our desired userId).
      var firepadUserList = FirepadUserList.fromDiv(firepadRef.child('users'),
        document.getElementById('userlist'), userId);

      //// Initialize contents.
      firepad.on('ready', function() {
        if (firepad.isHistoryEmpty()) {
          firepad.setText(defaultText);
        }
      });

      CodeMirror.commands.autocomplete = function(cm) {
        var doc = cm.getDoc();
        var POS = doc.getCursor();
        var mode = CodeMirror.innerMode(cm.getMode(), cm.getTokenAt(POS).state).mode.name;

        if (mode == 'xml') { //html depends on xml
          CodeMirror.showHint(cm, CodeMirror.hint.html);
        } else if (mode == 'javascript') {
          CodeMirror.showHint(cm, CodeMirror.hint.javascript);
        } else if (mode == 'css') {
          CodeMirror.showHint(cm, CodeMirror.hint.css);
        }
      };
    };

    vm.update = function() {
      vm.codeMirror.setOption('mode', vm.mode);
    };

    // Helper to get hash from end of URL or generate a random one.
    // function getExampleRef() {
    //   var ref = vm.firebaseApp.database().ref('firepadInstances');
    //   var hash = window.location.hash.replace(/#/g, '');
    //   if (hash) {
    //     ref = ref.child(hash);
    //   } else {
    //     ref = ref.child('file01');
    //     window.location = window.location + '#' + ref.key; // add it as a hash to the URL.
    //   }
    //   if (typeof console !== 'undefined') {
    //     console.log('Firebase data: ', ref.toString());
    //   }
    //   return ref;
    // }

    vm.init();
  });
