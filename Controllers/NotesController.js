const users = require('../Models/UserModel');
const notes = require('../Models/NotesModel');


const createNote = async(req,res,next) => {
    try{
      const userId = req.body.user._id;
      const {title,description} = req.body;
      const user = await  users.findById(userId);
      if(user){
          const note = await notes.create({
              
              title,
              description,
              user: {
                _id: user._id,
                name: user.name
            },
          })
          
          res.json({
              message : 'note created successfully',
              noteId : note._id
          })
      }
      else{
          const error = new Error("user not exists")
          next(error);
      }
    }catch(err){
      next(err);
    }
  }
  
  const deleteNote = async(req,res,next) => {
    try{
      const noteId = req.params.id;
       const deleted = await  notes.findByIdAndDelete(noteId)
        console.log(deleted);
       // update user notes
       const noteDeleted = await users.findByIdAndUpdate(deleted.user._id,{$pull :{notes : noteId}});

       console.log(noteDeleted);
           if(deleted){
              res.json({
                  message : "note deleted successfully"
              })
          }else{
              const err = new Error("note not exists");
              next(err);
          } 
    }catch(err){
      next(err);
    }
  }
  
  const updateNote =  async(req,res,next) =>{
      try{
          const noteId = req.params.id;
          const newNote = req.body;
          
          const note = await notes.findById(noteId)    
          note.title = newNote.title || note.title;
          note.description = newNote.description || note.description;
          note.time = date();
  
          await note.save();
  
          res.json({
              message : "updated Successfully",
              updated : note
          })
  
  
      }catch(err){
          next(err);
      }
  
  }

  const getNotes = async(req,res,next) => {
   try{
        const Notes = await notes.find()
        if(Notes){
            res.json({
                message : 'Notes fetched successfully',
                data : Notes
            })
        }else{
            const err = new Error('Notes not exists')
            next(err);
        }
   }catch(err){
        next(err);
   }
  }

  const getnotesById = async(req,res,next) => {
    try {
        const userId = req.params.id;
        if(!userId){
            const err = new Error('Login first to fetch notes')
            next(err);
        }else{
            const Notes = await notes.find({'user._id' : userId})
            if(Notes){
                res.json({
                    message : "fetched successfully",
                    Notes : Notes 
                })
            }else{
                res.json({
                    message : "fetched successfully",
                    Notes : "No notes found"
                })
            }
        }
    }catch(err){
        next(err);
    }
  }

  module.exports = {updateNote,createNote,deleteNote,getNotes,getnotesById}