  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBAN1J8AFMyuZKNTiNBxacM-jzblpKb3Fs",
    authDomain: "chat-46755.firebaseapp.com",
    databaseURL: "https://chat-46755.firebaseio.com",
    projectId: "chat-46755",
    storageBucket: "",
    messagingSenderId: "1044565057094"
  };
  firebase.initializeApp(config);

  const database = firebase.database();
  
  $("button").click( function(event) {
    event.preventDefault();
    var mensaje= $("#mensaje").val() ;
    var data= {usuario: 'juan', mensaje:mensaje };
    database.ref("chat/").push(data, function(error){
      if(error){ throw error; }
      else {
        console.info('guardamos la informacion'); 
        ponerMensaje(data);
        $('#mensaje').val('')
      }
    });
  });

  function ponerMensaje(pepito){
    $('#caja').append('<p>' + pepito.usuario+ ': ' + pepito.mensaje + '<p>');
  }

  function iterar(data){
    for (var chiguiro in data ){
      if(data.hasOwnProperty(chiguiro) ) {
        var element = data[chiguiro];
        var gato = {
        usuario: element.usuario,
        mensaje: element.mensaje

        };
      }
    }
  }

  var traerMensajes = new Promise(function(res,rej){
    var mensajes = database.ref('/chat/').once('value').then(function(snapshot){
      return res(snapshot.val() );
    });
    if(!mensajes){return rej(); }

  });

  traerMensajes.then(function(data){
    iterar(data);
  });