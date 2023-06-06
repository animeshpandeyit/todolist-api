// import { Plant } from "../models/plant.js";

// export const getplantData = async (req, res) => {
//   try {
//     const { _id } = req.plant;
//     const plant = await Plant.findById(_id);

//     if (!plant) {
//       return res.status(404).json({
//         success: false,
//         message: "Plant not found",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       message: "Plant successfully found",
//       plant,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       success: false,
//       message: "Server error",
//     });
//   }
// };
