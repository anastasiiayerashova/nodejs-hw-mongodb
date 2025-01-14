export const serverErrorMiddleware = (e, req, res, next) => {
    res.status(500).json({ message: 'Something went wrong', error: e.message
    })
}