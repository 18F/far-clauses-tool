if(process.argv.length === 3) {
  if(process.argv[2].toLowerCase() === 'build-mapping') {
    require('./build-mapping');
  }
}
