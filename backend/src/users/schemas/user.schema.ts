import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AuthProvider } from 'src/enums/authProvider.enum';

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
}

export const userSchema = SchemaFactory.createForClass(User);
