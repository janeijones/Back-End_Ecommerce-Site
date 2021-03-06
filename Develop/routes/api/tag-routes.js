const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const findTags = await Tag.findAll({
      include: {
        model: Product,
      },
      attributes: [
        'id',
        'tag_name',
      ]
    })

    if (!findTags){
      res.status(404).json({
        message: 'Tags not found'
      })
      return;
    } else {
        //tags found
      res.status(200).json(findTags)
    }
  } catch (err) {
   //error on getting tags
    res.status(500).json(err)
  }

});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const getTag = await Tag.findByPk(req.params.id, {
      include: {
        model: Product,
      },
    })

    //if single tag not found
    if (!getTag){
      res.status(404).json({
        message: 'Tag not found!'
      })
      return;
    } else {
      res.status(200).json(getTag)
    }
  } catch (err) {
    
    //error handling
    res.status(500).json(err)
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const createTag = await Tag.create({
      tag_name: req.body.tag_name
    })

    //  tag created 
    res.status(200).json(createTag)
  } catch (err) {

    // show error
    res.status(500).json(err)
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const updateTag = await Tag.update(req.body, {
      where: {
        id: req.params.id
      }
    })

    if (!updateTag){ //if tag not found
      res.status(404).json({
        message: 'Unable to update: Tag not found!'
      })
      return;
    } else {
        //update tag
      res.status(200).json(updateTag)
    }
  } catch (err) {

    // Error response
    res.status(500).json(err)
  }
});

router.delete('/:id', async (req, res) => {
  try {
    // delete on tag by its `id` value
    const deleteTag = await Tag.destroy({
      where: {
        id: req.params.id,
      }
    })

    if (!deleteTag){
      res.status(404).json({
        message: 'Unable to delete: no tag found!'
      })
      return;
    } else {
      res.status(200).json(deleteTag)
    }
  } catch (err) {
    // error handling
    res.status(500).json(err)
  }
});

module.exports = router;
