import asyncHandler from "../../middleware/asyncHandler";
import { Category, Portfolio } from "../../models/models";


const createPortfolio = asyncHandler (async(req, res)=>{
    try {
        const { title, subtitle, url, category } = req.body;
        const image = req.cloudinaryUrl;
    
        // Find the category or create a new one if it doesn't exist
        let categoryDocument = await Category.findOne({ name: category });
        if (!categoryDocument) {
          categoryDocument = new Category({ name: category });
          await categoryDocument.save();
        }
    
        // Create a new portfolio
        const portfolio = new Portfolio({
          title,
          subtitle,
          url,
          image,
          category: categoryDocument._id,
        });
    
        await portfolio.save();
    
        // Update the category to reference this portfolio
        if (!categoryDocument.portfolios.includes(portfolio._id)) {
          categoryDocument.portfolios.push(portfolio._id);
          await categoryDocument.save();
        }
    
        res.status(201).json({
          message: "Portfolio and category created successfully",
          portfolio,
          category: categoryDocument,
        });
      } catch (error:any) {
        console.error("Error creating portfolio or category", error);
        res.status(500).json({
          message: "Error creating portfolio or category",
          error: error.message,
        });
      }
    
})
export default createPortfolio;