import asyncHandler from "../../middleware/asyncHandler";
import { Category, Portfolio } from "../../models/models";

export const getPortfolio  = asyncHandler (async(req,res)=> {
    try {
        const portfolio = await Portfolio.find().populate('category', 'name').sort({
          createdAt:1
        });
       return res.status(200).json({
        msg: "Portfolio found",
        data: portfolio,
       })
    } catch (error) {
        console.error(error);
       return res.status(500).json({ message: 'Server Error' });
    }

});

export const getCategory = asyncHandler(async(req,res)=>{
    try {
        const category = await Category.find();
       return res.status(200).json({
        msg: "Category found",
        data: category,
       })
    } catch (error) {
        console.error(error);
       return res.status(500).json({ message: 'Server Error' });
    }
})


export const getPortfolioByCategory = asyncHandler(async(req,res)=> {
     try {
        const {category} = req.query;
        console.log(category)

        let portfolios;

        if (category) {
          // Find category by name
          const categoryObj = await Category.findOne({ name: category });
          
          if (!categoryObj) {
            return res.status(404).json({ message: 'Category not found' });
          }
    
          // Find portfolios by category ID
          portfolios = await Portfolio.find({ category: categoryObj._id }).populate('category', 'name').sort({
            createdAt:1
          });
        } else {
          // No category query parameter, fetch all portfolios
          portfolios = await Portfolio.find().populate('category', 'name').sort({
            createdAt:1
          });
        }
        
        return res.status(200).json({
          msg: "Portfolios found by category",
          data: portfolios,
        });
        
     } catch (error:any) {
        console.error("Error fetching portfolios by category", error);
    res.status(500).json({
      message: "Error fetching portfolios by category",
      error: error.message,
    });
        
     }

});



