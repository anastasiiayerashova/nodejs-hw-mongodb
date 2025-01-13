export const serverErrorMiddleware = (e, req, res, next) => {
    res.status(500).json({ message: 'Internal Server Error', error: e.message
    })
}