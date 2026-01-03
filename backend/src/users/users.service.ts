import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { isValidObjectId, Model } from 'mongoose';
import { NotesService } from 'src/notes/notes.service';
import { Note } from 'src/notes/schemas/note.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @Inject(forwardRef(() => NotesService))
    private notesSrvice: NotesService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.userModel.findOne({
      email: createUserDto.email,
    });
    if (existingUser) throw new BadRequestException('user already exists');
    const user = await this.userModel.create(createUserDto);
    return user;
  }

  async findAll() {
    return await this.userModel.find().populate('notes');
  }

  async findByEmail(email: string) {
    const user = await this.userModel.findOne({ email: email });
    return user;
  }

  async findOne(id: string) {
    if (!isValidObjectId(id)) throw new BadRequestException();
    const user = await this.userModel.findById(id).populate('notes');
    if (!user) throw new NotFoundException('user not found');
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    if (!isValidObjectId(id)) throw new BadRequestException();
    const user = await this.userModel.findByIdAndUpdate(id, updateUserDto, {
      new: true,
    });
    return user;
  }

  async remove(id: string) {
    if (!isValidObjectId(id)) throw new BadRequestException();
    const user = await this.userModel.findByIdAndDelete(id);
    if (!user) throw new NotFoundException('user not found');
    await this.notesSrvice.removeNoteByUserId(user._id);
    return user;
  }

  async addNote(userId, noteId) {
    const updatedUser = await this.userModel.findByIdAndUpdate(
      userId,
      {
        $push: { notes: noteId },
      },
      { new: true },
    );
    return updatedUser;
  }
}
