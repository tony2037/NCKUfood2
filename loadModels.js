const loadModels = function(){
    files.forEach((v,k)=>{
        if(/model.js$/.test(v)){
            require(path.resolve(v));
        }
    });
}

module.export = loadModels

