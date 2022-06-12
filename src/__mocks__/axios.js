export default {
    get: jest.fn().mockRejectedValueOnce({
        data:[]
    })
}