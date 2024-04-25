module.exports = class{
    onTestResult(){
        console.log(arguments)
    }
    onRunComplete(){
        console.log("Hurry");
    }
}