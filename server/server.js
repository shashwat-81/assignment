const cors=require('cors')
const express=require('express')
const app=express()
app.use(express.json())
app.use(cors())
const PORT=8080

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}...`)
})


//connection to mongodb
const mongoose=require('mongoose')
const DB='mongodb+srv://user01:user01@cluster0.bqy0ezo.mongodb.net/MyDb'
mongoose.connect(DB,{
    useNewUrlParser:true,
    
}).then(() =>{
    console.log('Database connected..')
})

const PhoneBook=require('./model/PhoneBook.js')
app.post('/add-phone',async(req,res)=>{
    const phoneNumber=new PhoneBook(req.body)
    try{
        await phoneNumber.save()
        res.status(201).json({
            status:'Success',
            headers: {
                'Authorization': '',
                'Content-Type': '',
              },
            data:{
                phoneNumber
            }
        })
    }catch(err){
        res.status(500).json({
            status: 'Failed',
            message: err
        })
    }
})
app.get('/get-phone',async(req,res)=>{
    const phoneNumbers=await PhoneBook.find({})
    try{
        res.status(200).json({
            status:'Sucess',
            data:{
                phoneNumbers
            }
        })
    }catch(err){
        res.status(500).json({
            status: 'Failed',
            message: err
        })
    }
})
app.put('/update-phone/:id', async (req,res) => {
    const {name,phone}=req.body;
    try{
    const updatedPhone = await PhoneBook.findByIdAndUpdate(req.params.id,req.body,{
        new : true,
        runValidators : true
      });
    
        res.status(200).json({
            status : 'Success',
            data : {
              updatedPhone
            }
          })
    }catch(err){
        console.log(err)
    }
})
app.delete('/delete-phone/:id', async(req,res) => {
    await PhoneBook.findByIdAndDelete(req.params.id)
    
    try{
      res.status(204).json({
          status : 'Success',
          data : {}
      })
    }catch(err){
        res.status(500).json({
            status: 'Failed',
            message : err
        })
    }
})