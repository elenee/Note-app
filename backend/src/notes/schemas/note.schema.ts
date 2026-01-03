import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from 'src/decorators/user.decorator';

@Schema({ timestamps: true })
export class Note {
  @Prop({ type: String, required: true })
  title: string;
  @Prop({ type: [String] })
  tags: string[];
  @Prop({ type: String, required: true })
  content: string;
  @Prop({ type: String, default: 'active', required: false })
  status: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  user: mongoose.Schema.Types.ObjectId;
}

export const noteSchema = SchemaFactory.createForClass(Note);
