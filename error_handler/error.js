// db.on('error', (error) => console.error(error))

// app.use(express.json())

// app.use('/api/students', studentRouter)
// app.use('/api', studentRouter)
// // app.use('/', studentRouter)
// app.use ('/', coursesRouter)
// app.use('/api/courses', coursesRouter)
// app.use('/api', coursesRouter)

// app.use('*', (req,res) => {
//     const err = new Error(`Requested URL ${req.path} not found!`)
//     res.status(404).json({
//         success: 0,
//         message: err.message,
//         stack: err.stack
//     })
// })