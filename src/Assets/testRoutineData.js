
const testRoutineData = {
    name : "Test Routine",
    lastModified : "16th June 2022",
    author : "Henit Chobisa",
    executed : 0, // Number of times executed by the program
    routine : [
        {
            title : "Routine 1",
            operation : "PUBLISH", // Operations PUBLISH || SUBSCRIBE 
            data : "{\n \"hii\" : \"River Routine\" \n \"pack\" : \"routine[1].data.hii\" \n}", // NULL or Last time Data
            executionTime : 200,
            dataBytes : 300,
        },
        {
            title: "Routine 1",
            operation : "SUBSCRIBE",
            data : "{\n  \"Bye\" : \"Bye River Routine\"  \n}",
            executionTime : 400,
            dataBytes: 200
        },
        {
            title: "Routine 3",
            operation : "PUBLISH",
            data : "{\n  \"Bye\" : \"Bye River Routine\"  \n}",
            executionTime : 700,
            dataBytes: 1000
        },
        {
            title: "Routine 4",
            operation : "PUBLISH",
            data : "{\n  \"Bye\" : \"Bye River Routine\"  \n}",
            executionTime : 250,
            dataBytes: 400
        },
        {
            title: "Routine 4",
            operation : "SUBSCRIBE",
            data : "{\n  \"Bye\" : \"Bye River Routine\"  \n}",
            executionTime : 450,
            dataBytes: 800
        },
        {
            title: "Routine 5",
            operation : "PUBLISH",
            data : "{\n  \"Bye\" : \"Bye River Routine\"  \n}",
            executionTime : 200,
            dataBytes: 100
        },
        {
            title: "Routine 5",
            operation : "SUBSCRIBE",
            data : "{\n  \"Bye\" : \"Bye River Routine\"  \n}",
            executionTime : 100,
            dataBytes: 50
        }
    ]
}

export default testRoutineData;