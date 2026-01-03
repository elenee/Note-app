import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { AuthProvider } from 'src/enums/authProvider.enum';
import { Note } from 'src/notes/schemas/note.schema';

@Schema({ timestamps: true })
export class User {
  @Prop({ type: String, required: true, unique: true })
  email: string;
  @Prop({
    type: String,
    required: function (this: User) {
      return this.authProvider === AuthProvider.LOCAL;
    },
  })
  password?: string;

  @Prop({ type: String, enum: AuthProvider, default: AuthProvider.LOCAL })
  authProvider: AuthProvider;

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: Note.name, default: [] })
  notes: [mongoose.Schema.Types.ObjectId];
}

export const userSchema = SchemaFactory.createForClass(User);
