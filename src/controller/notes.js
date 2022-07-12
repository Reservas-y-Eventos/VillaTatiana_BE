const Notes = require('../models/notes');

const createaNotes = async (req,res)=>{
    const {title,desciption}  = req.body;

    try {
    const newNote = new Notes({
        title,
        desciption
    });
    newNote.save();
    return res.status(200).json({
        succes:true,
        newNote
    });
    } catch (error) {
        return res.status(500).json({
            succes:false,
            error: error.message
        });
        
    }
}
const getnote = async(req,res)=>{
    const {noteId} = req.params;
    try {
        const note = await Notes.findById({_id:noteId});
        return res.status(200).json({
            succes:true,
            note
        })
    } catch (error) {
        return res.status(500).json({
            succes:false,
            error: error.message
        });
    }

}

const getNotes =async(req,res)=>{
    try {
        const notes = await Notes.find();
        return res.status(200).json({
            succes:true,
            notes
        })
    } catch (error) {
        return res.status(500).json({
            succes:false,
            error: error.message
        });
    }
    
}
const updateNote = async(req,res) =>{
    const {noteId} = req.params;
    try {
        const notesUpdate = await Notes.findByIdAndUpdate(
            {_id:noteId},
            req.body,
            {
                new:true,
            }
            );
            return res.status(200).json({
                succes:true,
                notesUpdate
            });
    } catch (error) {
        return res.status(500).json({
            succes:false,
            error: error.message
        });
        
    }
    
}

const deleteNotes = async(req,res)=>{
    const {noteId} = req.params;
    console.log(noteId);
    try {
        const variable = await Notes.findByIdAndDelete({_id:noteId});
        return res.status(200).json({
        succes:true,
        variable
    });
    } catch (error) {
        return res.status(500).json({
            succes:false,
            error: error.message
        });
    }
}

module.exports= {
    createaNotes,
    getnote,
    getNotes,
    updateNote,
    deleteNotes

}