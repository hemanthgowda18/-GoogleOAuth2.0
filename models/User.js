const {Schema,model}=require("mongoose")

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  googleId: {
    type: String,
    required: true,
  },
},{
    timestamps:true
});

module.exports=model("user",userSchema)