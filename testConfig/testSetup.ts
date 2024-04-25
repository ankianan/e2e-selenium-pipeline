jest.setTimeout(30000);


process.on('exit', function (){
    console.log('Goodbye!');
});