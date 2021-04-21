import AsyncHandler from 'express-async-handler'
import Report from '../models/reportModel.js'
import url from 'url'
import querystring from 'querystring'

export{getReport,createReport}

// @desc    Fetch report
// @route   GET /reports/reportID
// @access  Public
const getReport = AsyncHandler(async (req, res) => {
  var id = req.params.reportID
    const report = await Report.findById(req.query.reportID)
    if(report)
    res.json({"_id":report._id,"cmdtyName":report.cmdtyName,"cmdtyID":report.cmdtyID,
    "marketID":report.marketID,"marketName":report.marketName,
    "users" : report.users, "timestamp" : report.createdAt,
    "priceUnit" : "Kg",
    "price" : report.price
  })
    else{
        res.json("error occured")
}
})


// @desc    Create a report
// @route   POST /reports
// @access  Public
const createReport = AsyncHandler(async (req, res) => {
    const {
        userID,
        marketID,
        marketName,
        cmdtyID,
        cmdtyName,
        priceUnit,
        convFctr,
        price 
      } = req.body.reportDetails

    const  repor = await Report.findOne({"marketID":marketID,"cmdtyID":cmdtyID})
      if (repor) {
           const Totalprice = repor.users.length*repor.price + price/convFctr
          const  avgPrice = Totalprice/(repor.users.length+1)
               
            repor.price = avgPrice
            repor.users.push(userID)
        const report = await repor.save()
        res.json({"status": "success","reportID" :report._id})
      } else {

      let reportt =new Report ({  
           cmdtyName,
           cmdtyID,
            marketID, 
        marketName,
        users:[],
        "priceUnit": "kg",
        "price": price/convFctr
        })
        reportt.users.push(userID)
        const newReport = await reportt.save()
        res.json({"status": success,"reportID" :newReport._id})
      }
    })