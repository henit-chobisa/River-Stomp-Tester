
const testRoutineData = {
    name : "Test Routine",
    lastModified : "16th June 2022",
    author : "Henit Chobisa",
    executed : 0, // Number of times executed by the program
    routine : [
        {
            title : "sayHii",
            operation : "PUBLISH", // Operations PUBLISH || SUBSCRIBE 
            data : "{\n \"hii\" : \"River Routine\" \n \"pack\" : \"routine[1].data.hii\" \n}", // NULL or Last time Data
            executionTime : 200,
            dataBytes : 300,
        },
        {
            title: "sayBye",
            operation : "SUBSCRIBE",
            data : "{\n  \"Bye\" : \"Bye River Routine\"  \n}",
            executionTime : 400,
            dataBytes: 200
        }
    ]
}

export default testRoutineData;