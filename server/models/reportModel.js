import mongoose from 'mongoose'



const ReportSchema = mongoose.Schema(
  {
    cmdtyName: { type: String, required: true },
    cmdtyID: { type: String, required: true },
   marketID: { type: String, required: true },
   marketName: { type: String, required: true },
    users: [String],
    priceUnit: { type: String, required: true },
    price: { type: Number, required: true },
    
  },
  {
    timestamps: true,
  }
)

const Report= mongoose.model('Report', ReportSchema)

export default Report
