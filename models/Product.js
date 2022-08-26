import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Please provide product name"],
      maxlength: [100, "Name can not be more than 100 characters"],
    },
    price: {
      type: Number,
      required: [true, "Please provide price product"],
      default: 0,
    },
    description: {
      type: String,
      required: [true, "Please provide product description"],
      maxlength: [1000, "Description can not be more than 1000 characters"],
    },
    um: {
      type: String,
      enum: ["t", "lb", "oz", "kg", "g"],
      default: "kg",
    },
    createBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "PLease provide user"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Product", ProductSchema);
