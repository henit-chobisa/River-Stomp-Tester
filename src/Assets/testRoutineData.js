
const testRoutineData = {
    title : "Test Routine",
    lastModified : "16th June 2022",
    description: "This routine is made in order to test the routine functionality of River Stomp Tester",
    lastUpdated: "20th June",
    author : "Henit Chobisa",
    executed : 0, // Number of times executed by the program
    routines : [
        {
            title : "Routine 1",
            operation : "PUBLISH", // Operations PUBLISH || SUBSCRIBE,
            route : "/hello",
            description : "This Routine Component is Made for testing purposes for River Tester, Thank You!",
            data : "{\n \"hii\" : \"River Routine\" \n \"pack\" : \"routine[1].data.hii\" \n}", // NULL or Last time Data
            executionTime : 200,
            dataBytes : 300,
        },
        {
            title: "Routine 1",
            operation : "SUBSCRIBE",
            description : "This Routine Component is Made for testing purposes for River Tester, Thank You!",
            data : "{\n  \"Bye\" : \"Bye River Routine\"  \n}",
            route : "/hello",
            executionTime : 400,
            dataBytes: 200
        },
        {
            title: "Routine 3",
            operation : "PUBLISH",
            description : "This Routine Component is Made for testing purposes for River Tester, Thank You!",
            data : "{\n  \"Bye\" : \"Bye River Routine\"  \n}",
            route : "/hello",
            executionTime : 700,
            dataBytes: 1000
        },
        {
            title: "Routine 4",
            operation : "PUBLISH",
            description : "This Routine Component is Made for testing purposes for River Tester, Thank You!",
            data : "{\n  \"Bye\" : \"Bye River Routine\"  \n}",
            route : "/hello",
            executionTime : 250,
            dataBytes: 400
        },
        {
            title: "Routine 4",
            operation : "SUBSCRIBE",
            description : "This Routine Component is Made for testing purposes for River Tester, Thank You!",
            data : "{\n  \"Bye\" : \"Bye River Routine\"  \n}",
            executionTime : 450,
            route : "/hello",
            dataBytes: 800
        },
        {
            title: "Routine 5",
            operation : "PUBLISH",
            description : "This Routine Component is Made for testing purposes for River Tester, Thank You!",
            data : "{\n  \"Bye\" : \"Bye River Routine\"  \n}",
            executionTime : 200,
            route : "/hello",
            dataBytes: 100
        },
        {
            title: "Routine 5",
            operation : "SUBSCRIBE",
            description : "This Routine Component is Made for testing purposes for River Tester, Thank You!",
            data : "{\n  \"Bye\" : \"Bye River Routine\"  \n}",
            executionTime : 100,
            route : "/hello",
            dataBytes: 50
        },
        {
            title: "Routine 6",
            operation : "SUBSCRIBE",
            description : "This Routine Component is Made for testing purposes for River Tester, Thank You!",
            data : "{\n  \"Bye\" : \"Bye River Routine\"  \n}",
            executionTime : 80,
            route : "/hello",
            dataBytes: 200
        }
    ]
}

export default testRoutineData;