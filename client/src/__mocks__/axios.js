const mockResponse = {
    _id: "62a48da7d4bc59a6a9e4b218",
    user:"62a3e29355b141644ea07f31",
    author:"test author",
    subject:"test subject",
    title:"test title",
    likes:6,
    published:true,
    cards:[
        {question:"TEST QUESTION",answer:"TEST ANSWER"},
        {question:"SECOND QUESTION",answer:"SECOND ANSWER"}
    ],
    createdAt:{"$date":{"$numberLong":"1654951335406"}},
    updatedAt:{"$date":{"$numberLong":"1655066831282"}},
    __v:{"$numberInt":"0"}
}


export default jest.fn().mockResolvedValue(mockResponse)
