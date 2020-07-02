import PostsModel from '../model/posts'

const postRoute = (app) => {

    app.route('/posts/:id?')
        .get(async (req, res) => {
            const { id } = req.params
            const query = {}

            if(id) {
                query._id = id
            }

            try {
                
                const posts = await PostsModel.find(query)
                res.send({ posts })
            
            } catch(error) {

                res.status(400).send({ error: 'Failed finding post' })
            }
        })
        .post(async (req, res) => {

            try {

                const post = new PostsModel(req.body)
                await post.save()

                res.status(201).send('Created')

            } catch(error) {
                res.send(error)
            }
        })
        .put(async (req, res) => {
            
            const { id } = req.params

            if(!id) {
                return res.status(400).send({ error: 'Post id is missing' })
            }

            try {

                const updatePost = await PostsModel.findOneAndUpdate({ _id:id }, req.body, {
                    new: true
                })

                console.log(updatePost)

                if(updatePost) {
                    return res.status(200).send('Updated')
                }

                res.status(400).send({ error: 'Post not updated' })

            } catch(error) {
                res.send(error)
            }
        })
        .delete(async (req, res) => {

            const { id } = req.params

            if(!id) {
                return res.status(400).send('Post Id not found')
            }

            try {

                const deletePost = await PostsModel.deleteOne({ _id:id })

                if(deletePost.deletedCount) {
                    return res.send('Deleted')
                }

                res.status(400).send({ error: 'Post not deleted '})

            } catch(error) {
                res.send(error)
            }
        })
}

module.exports = postRoute

