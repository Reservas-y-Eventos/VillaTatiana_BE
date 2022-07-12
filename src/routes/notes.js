const {Router} = require('express');
const { getnote, getNotes, createaNotes, updateNote, deleteNotes } = require('../controller/notes');

const router = Router();

router.get('/all', getNotes );
router.get('/note/:noteId',getnote);
router.post('/create',createaNotes);
router.put('/update/:noteId',updateNote);
router.delete('/delete/:noteId',deleteNotes);

module.exports = router;