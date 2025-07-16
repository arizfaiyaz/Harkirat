const thenable = {
    then: function(onFulfilled){
        setTimeout(() => 
            onFulfilled(42), 1000
        );
    }
}
// const p = new Promise(function(){

// })
console.log(thenable);

async function main() {
    const v = await thenable.then(function(){
        console.log("thenable resolved");
    });
    console.log("hello world");
    
}

main();

// every promise is a thenable
// every thenable is not a promise