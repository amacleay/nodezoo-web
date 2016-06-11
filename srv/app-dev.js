
require('..')(
  {
    hapi: { port: 8000 },
    folder: __dirname+'/..',
    seneca: {}
  },
  fail,
  function(server){
    "use strict";
    server.seneca
      .repl(43000)
      .listen(44000)

      .add('role:search,cmd:search',function(msg,done){
        done(null,{items:[{
          name:'foo',
          version:'0.0.0'
        }]})
      })

      .add('role:info,cmd:get',function(msg,done){
        done(null,{npm:{
          name:'foo',
          version:'0.0.0'
        }})
      })

	  .add('role:web,cmd:ping', (msg, done) => {
		  done(null, {timestamp: Date.now()});
	  })

    .ready(function(){
      server.seneca.log.info('hapi',server.info)
      server.start(fail)
    })
  })


function fail(err) {
  if( err ) {
    console.log( err )
    process.exit(1)
  }
}
