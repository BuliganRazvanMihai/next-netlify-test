exports.handler = async () => {
    console.log('function ran')

    const data = { name: 'razvan', age: 23, job: 'programmer'}

    //return response to browser
    return {
        statusCode: 200,
        body: JSON.stringify(data)
    }
}