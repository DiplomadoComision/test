import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true },
    lastname: { type: String, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
    tipodocumento: { type: String },
    estado: { type: String  },
    tarjeta: { type: String  },
    uegresados: { type: String  },
    uniegre: { type: String  },
    semestre: { type: String  },
    uniEstu: { type: String  },
    uniestu: { type: String  },
    pais: { type: String },
    ciudad: { type: String },
  },
  {
    versionKey: false,
  }
);

UserSchema.methods.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

UserSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

export default mongoose.model("User", UserSchema);
